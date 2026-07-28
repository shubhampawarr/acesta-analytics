import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const size = {
  width: 512,
  height: 512,
};

export const contentType = 'image/png';

export default async function Icon() {
  const switzer = await readFile(
    join(process.cwd(), 'assets/fonts/Switzer-Regular.ttf')
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#000000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#C9A961',
          fontSize: 320,
          letterSpacing: -20,
          fontFamily: 'Switzer',
        }}
      >
        A
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Switzer', data: switzer, style: 'normal', weight: 400 },
      ],
    }
  );
}
