import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

export default function AppleIcon() {
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
          border: '8px solid #d8b25e',
        }}
      >
        <div
          style={{
            width: 116,
            height: 116,
            borderRadius: '50%',
            border: '2px solid rgba(241,217,155,0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f1d99b',
            fontSize: 48,
            fontWeight: 700,
            letterSpacing: '-5px',
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