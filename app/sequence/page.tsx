// app/sequence/page.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import { useAdvancedAnimations } from '@/hooks/useAdvancedAnimations';

export default function SequencePage() {
  const sequenceText = "Decrypting live signals... Processing global chatter... Correlation matrix built. Ready.";
  useAdvancedAnimations(sequenceText); // typewriter effect chalega

  return (
    <>
      <canvas id="bg-canvas" />
      <div className="noise" />
      <div id="cursor" />
      <div id="cursor-ring" />

      <section className="scene" style={{ textAlign: 'center' }}>
        <div className="glow-orb" style={{ width: '500px', height: '500px', background: 'var(--p)', top: '30%', left: '50%', transform: 'translateX(-50%)' }} />
        <p className="scene-label">SEQUENCE // ACTIVE</p>
        <h1 className="scene-heading">
          Decoding <span className="muted">the Wire</span>
        </h1>
        <p id="typewriter-target" className="scene-body" style={{ fontSize: '1.4rem', maxWidth: '800px', color: 'rgba(255,255,255,0.7)' }} />
        <div style={{ marginTop: '60px', display: 'flex', gap: '30px', justifyContent: 'center' }}>
          <Link href="/" style={{ border: '1px solid var(--g)', padding: '12px 28px', color: '#fff', textDecoration: 'none' }}>HOME</Link>
          <Link href="/archive" style={{ border: '1px solid var(--g)', padding: '12px 28px', color: '#fff', textDecoration: 'none' }}>ARCHIVE</Link>
        </div>
        <div className="scene-rule" style={{ bottom: '20px' }} />
      </section>

      <section className="scene" style={{ justifyContent: 'flex-start', paddingTop: '120px' }}>
        <h2 className="scene-heading" style={{ fontSize: 'clamp(2rem,5vw,4rem)' }}>
          Live <span className="muted">Sequence</span>
        </h2>
        <div style={{ display: 'grid', gap: '30px', maxWidth: '700px', marginTop: '40px' }}>
          {['Signal Acquisition', 'Noise Filtering', 'Pattern Recognition', 'Insight Generation'].map((step, i) => (
            <div key={i} style={{ borderLeft: `3px solid var(--g)`, paddingLeft: '25px', opacity: 0.8 }}>
              <p style={{ color: 'var(--g)', fontSize: '0.8rem', letterSpacing: '2px' }}>STEP 0{i+1}</p>
              <h3 style={{ fontSize: '1.8rem', fontWeight: '500' }}>{step}</h3>
              <p style={{ color: 'rgba(255,255,255,0.4)' }}>Real‑time processing • sub‑second latency</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}