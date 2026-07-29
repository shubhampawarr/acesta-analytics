'use client';

import { useEffect, useRef } from 'react';
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from 'three';

import {
  FORMATIONS,
  generators,
  offsets,
  offsetsYMobile,
  type FormationName,
} from './formations';
import { MORPH_MS, easeMorph, resolveController } from './controller';

/**
 * Raw three.js rather than react-three-fiber: the scene is one Points object
 * that never changes shape, so a reconciler buys nothing and costs a chunk of
 * parse time on the critical path. Owning the loop directly also makes the
 * offscreen pause and the reduced-motion single-frame path explicit.
 */

/** §7 rendering constants. */
const COUNT_DESKTOP = 4000;
const COUNT_MOBILE = 1200;

const ROTATION_SPEED = 0.1;

const VERTEX = /* glsl */ `
  attribute vec3 aLattice;
  attribute vec3 aGrid;
  attribute vec3 aChart;
  attribute vec3 aRadial;
  attribute vec3 aFlow;
  attribute float aSeed;

  uniform float uW[6];
  uniform float uTime;
  uniform float uRot;
  uniform float uActivity;
  uniform float uScale;
  uniform float uOffsetX;
  uniform float uOffsetY;
  uniform float uDpr;

  varying float vSeed;
  varying float vTwinkle;

  void main() {
    vSeed = aSeed;

    vec3 p = position * uW[0]
      + aLattice * uW[1]
      + aGrid    * uW[2]
      + aChart   * uW[3]
      + aRadial  * uW[4]
      + aFlow    * uW[5];

    // Drift: always breathing a little; loud in chaos; swarming mid-morph.
    float amp = 0.02 + 0.33 * uW[0] + 0.22 * uActivity;
    p += amp * vec3(
      sin(uTime * 0.7 + aSeed * 61.0),
      cos(uTime * 0.9 + aSeed * 47.0),
      sin(uTime * 0.8 + aSeed * 83.0)
    );

    // Rotation earned only by the unstructured states (chaos + lattice);
    // a spinning bar chart is not an instrument.
    float g = uW[0] + uW[1];
    float c = cos(uRot * g);
    float s = sin(uRot * g);
    p = vec3(c * p.x + s * p.z, p.y, -s * p.x + c * p.z);

    p *= uScale;
    p.x += uOffsetX * uScale;
    p.y += uOffsetY * uScale;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    // 1–2px, sharp (§7), scaled for DPR and mild perspective.
    float px = mix(1.0, 2.0, fract(aSeed * 7.31));
    gl_PointSize = px * uDpr * (9.0 / -mv.z);

    vTwinkle = 0.82 + 0.18 * sin(uTime * 1.6 + aSeed * 151.0);
  }
`;

const FRAGMENT = /* glsl */ `
  precision mediump float;

  uniform vec3 uGoldDeep;
  uniform vec3 uGold;
  uniform vec3 uGoldBright;

  varying float vSeed;
  varying float vTwinkle;

  void main() {
    // Hard-edged disc — sharp, never a soft bloom sprite.
    vec2 d = gl_PointCoord - 0.5;
    if (dot(d, d) > 0.25) discard;

    // Gold ramp: deep -> gold -> bright (§7), keyed per particle. Biased
    // toward the luminous end — an even spread puts a third of the field at
    // gold-deep, which at 1px on void reads as grime rather than depth.
    float t = pow(fract(vSeed * 3.7), 0.45);
    vec3 color = t < 0.5
      ? mix(uGoldDeep, uGold, t * 2.0)
      : mix(uGold, uGoldBright, (t - 0.5) * 2.0);

    gl_FragColor = vec4(color * vTwinkle, 1.0);
  }
`;

function buildGeometry(count: number) {
  const geometry = new BufferGeometry();

  geometry.setAttribute(
    'position',
    new BufferAttribute(generators.chaos(count), 3)
  );
  geometry.setAttribute(
    'aLattice',
    new BufferAttribute(generators.lattice(count), 3)
  );
  geometry.setAttribute('aGrid', new BufferAttribute(generators.grid(count), 3));
  geometry.setAttribute(
    'aChart',
    new BufferAttribute(generators.chart(count), 3)
  );
  geometry.setAttribute(
    'aRadial',
    new BufferAttribute(generators.radial(count), 3)
  );
  geometry.setAttribute('aFlow', new BufferAttribute(generators.flow(count), 3));

  const seeds = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    seeds[i] = ((i * 2654435761) % 4096) / 4096;
  }

  geometry.setAttribute('aSeed', new BufferAttribute(seeds, 1));

  return geometry;
}

/** QA override: `?particles=800` to profile a different field size. */
function requestedCount(fallback: number) {
  const raw = new URLSearchParams(window.location.search).get('particles');
  const parsed = Number(raw);

  return raw && Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export default function ResolveCanvas({
  mobile,
  reducedMotion,
  paused,
}: {
  mobile: boolean;
  reducedMotion: boolean;
  paused: boolean;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);

  pausedRef.current = paused;

  useEffect(() => {
    const host = hostRef.current;

    if (!host) {
      return;
    }

    const count = requestedCount(mobile ? COUNT_MOBILE : COUNT_DESKTOP);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const renderer = new WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
    });

    renderer.setPixelRatio(dpr);
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(
      45,
      host.clientWidth / host.clientHeight,
      0.1,
      100
    );

    camera.position.set(0, 0, 9);

    const geometry = buildGeometry(count);

    const material = new ShaderMaterial({
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: AdditiveBlending,
      uniforms: {
        uW: { value: new Float32Array([1, 0, 0, 0, 0, 0]) },
        uTime: { value: 0 },
        // Start a little off-axis so the lattice reads as a 3D structure
        // rather than a flat, perfectly symmetrical starburst.
        uRot: { value: 0.6 },
        uActivity: { value: 0 },
        // Desktop pulls in slightly from 1.0 so an offset formation clears the
        // copy column and still keeps its outer edge on screen at 1280px.
        uScale: { value: mobile ? 0.5 : 0.92 },
        uOffsetX: { value: 0 },
        uOffsetY: { value: 0 },
        uDpr: { value: dpr },
        uGoldDeep: { value: new Color('#6E5A28') },
        uGold: { value: new Color('#C9A961') },
        uGoldBright: { value: new Color('#F2DFA8') },
      },
    });

    const points = new Points(geometry, material);

    points.frustumCulled = false;
    scene.add(points);

    const u = material.uniforms;

    const state = {
      weights: new Float32Array([1, 0, 0, 0, 0, 0]),
      from: new Float32Array([1, 0, 0, 0, 0, 0]),
      target: 0,
      offsetFrom: 0,
      offsetTo: 0,
      offset: 0,
      offsetYFrom: 0,
      offsetYTo: 0,
      offsetY: 0,
      duration: MORPH_MS,
      t: 1,
      start: 0,
      active: false,
    };

    function draw() {
      renderer.render(scene, camera);
    }

    resolveController.register({
      morphTo(formation: FormationName, options) {
        const index = FORMATIONS.indexOf(formation);

        if (index < 0 || index === state.target) {
          return;
        }

        state.target = index;
        state.offsetFrom = state.offset;
        state.offsetTo = mobile ? 0 : offsets[formation];
        state.offsetYFrom = state.offsetY;
        state.offsetYTo = mobile ? offsetsYMobile[formation] : 0;
        state.duration = options?.durationMs ?? MORPH_MS;

        if (options?.instant || reducedMotion) {
          state.weights.fill(0);
          state.weights[index] = 1;
          state.offset = state.offsetTo;
          state.offsetY = state.offsetYTo;
          state.t = 1;
          state.active = false;

          (u.uW.value as Float32Array).set(state.weights);
          u.uOffsetX.value = state.offset;
          u.uOffsetY.value = state.offsetY;
          u.uActivity.value = 0;
          draw();

          return;
        }

        state.from.set(state.weights);
        state.t = 0;
        state.start = performance.now();
        state.active = true;
      },
    });

    let frame = 0;
    let last = performance.now();

    function tick(now: number) {
      frame = requestAnimationFrame(tick);

      // §7: pause the render loop when the canvas is offscreen. Still ticks
      // the clock so a formation mid-morph does not jump on return.
      if (pausedRef.current) {
        last = now;
        return;
      }

      const delta = Math.min((now - last) / 1000, 0.05);

      last = now;
      u.uTime.value += delta;

      if (state.active) {
        state.t = Math.min(1, (now - state.start) / state.duration);

        const e = easeMorph(state.t);

        for (let i = 0; i < 6; i++) {
          const goal = i === state.target ? 1 : 0;
          state.weights[i] = state.from[i] + (goal - state.from[i]) * e;
        }

        state.offset =
          state.offsetFrom + (state.offsetTo - state.offsetFrom) * e;
        state.offsetY =
          state.offsetYFrom + (state.offsetYTo - state.offsetYFrom) * e;

        // Swarm hardest mid-flight; settle to stillness at both ends.
        u.uActivity.value = Math.sin(Math.PI * state.t);

        if (state.t >= 1) {
          state.active = false;
          u.uActivity.value = 0;
        }

        (u.uW.value as Float32Array).set(state.weights);
        u.uOffsetX.value = state.offset;
        u.uOffsetY.value = state.offsetY;
      }

      if (!mobile) {
        // Advance only while the unstructured states hold weight, so
        // resolving into a chart never inherits a spin (see VERTEX).
        const g = state.weights[0] + state.weights[1];
        u.uRot.value += delta * ROTATION_SPEED * g;
      }

      draw();
    }

    if (reducedMotion) {
      // A single static resolved formation. No loop is ever started.
      draw();
    } else {
      frame = requestAnimationFrame(tick);
    }

    function onResize() {
      if (!host) return;

      camera.aspect = host.clientWidth / host.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(host.clientWidth, host.clientHeight);
      draw();
    }

    window.addEventListener('resize', onResize);

    if (process.env.NODE_ENV !== 'production') {
      (globalThis as { __resolveUniforms?: unknown }).__resolveUniforms = u;
    }

    return () => {
      resolveController.unregister();
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(frame);

      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [mobile, reducedMotion]);

  return <div ref={hostRef} className="h-full w-full" />;
}
