import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          backgroundColor: '#05070d',
          backgroundImage:
            'radial-gradient(circle at 15% 0%, rgba(76,124,255,0.35), transparent 55%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              border: '2px solid #4c7cff',
              display: 'flex',
            }}
          />
          <span style={{ fontSize: 40, fontWeight: 700, color: '#e7eaf3' }}>FaniLab</span>
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 44,
            fontSize: 56,
            fontWeight: 600,
            color: '#e7eaf3',
            lineHeight: 1.15,
            maxWidth: 900,
          }}
        >
          On-chain infrastructure for trusted logistics.
        </div>
        <div style={{ display: 'flex', marginTop: 28, fontSize: 26, color: '#9aa4bd' }}>
          Stellar &middot; Soroban &middot; Blockchain Escrow Logistics
        </div>
      </div>
    ),
    { ...size }
  );
}
