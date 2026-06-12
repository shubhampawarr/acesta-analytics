import { ImageResponse } from 'next/og';

export const size = {
  width: 512,
  height: 512,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background:
            'radial-gradient(circle at 30% 20%, #1a1308 0%, #030303 58%, #000000 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '18px solid #d8b25e',
        }}
      >
        <div
          style={{
            width: 330,
            height: 330,
            borderRadius: '50%',
            border: '3px solid rgba(241,217,155,0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f1d99b',
            fontSize: 138,
            fontWeight: 700,
            letterSpacing: '-14px',
            fontFamily: 'Georgia, serif',
          }}
        >
          AA
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}