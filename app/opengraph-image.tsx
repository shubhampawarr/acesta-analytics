import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';
export const alt = 'Acesta Analytics — digital intelligence for brands that need clarity';

export default async function OpenGraphImage() {
  const switzer = await readFile(
    join(process.cwd(), 'assets/fonts/Switzer-Regular.ttf')
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          // §9: the void is the design. No gradient, no border, no seal.
          background: '#000000',
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 96,
          fontFamily: 'Switzer',
        }}
      >
        <div
          style={{
            color: '#C9A961',
            fontSize: 22,
            letterSpacing: 1.76,
            textTransform: 'uppercase',
          }}
        >
          Acesta Analytics
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 92,
            lineHeight: 1.05,
            letterSpacing: -3.68,
            maxWidth: 940,
          }}
        >
          Digital intelligence for brands that need clarity.
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            color: '#BDBDBD',
            fontSize: 24,
          }}
        >
          <div style={{ display: 'flex', maxWidth: 640 }}>
            Data intelligence, premium web development, search visibility and
            growth systems.
          </div>

          <div style={{ display: 'flex', color: '#9A9A9A' }}>Mumbai</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Switzer',
          data: switzer,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  );
}
