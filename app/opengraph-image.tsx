import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background:
            'radial-gradient(circle at 18% 18%, rgba(216,178,94,0.32), transparent 32%), radial-gradient(circle at 82% 24%, rgba(167,123,50,0.22), transparent 34%), linear-gradient(135deg, #030303 0%, #080705 52%, #030303 100%)',
          color: '#f8f4ea',
          display: 'flex',
          padding: 72,
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 32,
            border: '1px solid rgba(216,178,94,0.28)',
            borderRadius: 36,
          }}
        />

        <div
          style={{
            position: 'absolute',
            right: 76,
            top: 76,
            width: 150,
            height: 150,
            borderRadius: '50%',
            border: '2px solid rgba(216,178,94,0.48)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f1d99b',
            fontSize: 54,
            fontWeight: 700,
            letterSpacing: '-5px',
          }}
        >
          AA
        </div>

        <div
          style={{
            maxWidth: 830,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              color: '#d8b25e',
              fontSize: 24,
              letterSpacing: 8,
              textTransform: 'uppercase',
              marginBottom: 30,
              fontFamily: 'Arial, sans-serif',
              fontWeight: 700,
            }}
          >
            Acesta Analytics
          </div>

          <div
            style={{
              fontSize: 84,
              lineHeight: 0.92,
              letterSpacing: -4,
              fontWeight: 600,
            }}
          >
            Premium systems for clarity, presence, and growth.
          </div>

          <div
            style={{
              marginTop: 34,
              color: '#b8b0a3',
              fontSize: 27,
              lineHeight: 1.35,
              fontFamily: 'Arial, sans-serif',
              maxWidth: 760,
            }}
          >
            Data intelligence, premium web experiences, and search-led growth
            architecture for modern businesses.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}