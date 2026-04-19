// app/archive/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAdvancedAnimations } from '@/hooks/useAdvancedAnimations';

export default function ArchivePage() {
  const [reports, setReports] = useState<any[]>([]);
  useAdvancedAnimations(); // common animations (bina typewriter ke)

  useEffect(() => {
    const fetchArchive = async () => {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (!url || !key) return;
      const res = await fetch(`${url}/rest/v1/crypto_data?select=ai_analysis,date_recorded&order=id.desc&limit=20`, {
        headers: { apikey: key, Authorization: `Bearer ${key}` },
      });
      const data = await res.json();
      if (data) setReports(data);
    };
    fetchArchive();
  }, []);

  return (
    <>
      <canvas id="bg-canvas" />
      <div className="noise" />
      <div id="cursor" />
      <div id="cursor-ring" />

      <section className="scene" style={{ textAlign: 'center', justifyContent: 'center' }}>
        <div className="glow-orb" style={{ width: '600px', height: '600px', background: 'var(--b)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.1 }} />
        <p className="scene-label">ARCHIVE // DATABASE</p>
        <h1 className="scene-heading">
          Historical <span className="muted">Intel</span>
        </h1>
        <p className="scene-body" style={{ maxWidth: '700px' }}>
          Complete record of all AI‑generated briefings. Scroll through past insights.
        </p>
        <div className="scene-rule" />
      </section>

      <section className="scene" style={{ alignItems: 'flex-start', padding: '60px 10vw' }}>
        <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
          {reports.length === 0 ? (
            <p style={{ color: 'rgba(255,255,255,0.4)' }}>Loading archive...</p>
          ) : (
            reports.map((rep, idx) => (
              <div key={idx} className="report-card" style={{ position: 'relative', marginBottom: '30px' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #00ffb4, transparent)', animation: 'scan 3s linear infinite' }} />
                <p style={{ color: 'var(--g)', fontSize: '0.7rem', letterSpacing: '2px' }}>
                  {new Date(rep.date_recorded).toLocaleString()}
                </p>
                <div className="report-content">
                  {/* Agar ai_analysis JSON hai toh use karo, warna raw text */}
                  {typeof rep.ai_analysis === 'object' ? (
                    <>
                      <h3>{rep.ai_analysis.title || 'Market Pulse'}</h3>
                      <p>{rep.ai_analysis.summary}</p>
                      <ul>{(rep.ai_analysis.key_points || []).map((pt: string, i: number) => <li key={i}>{pt}</li>)}</ul>
                    </>
                  ) : (
                    <p>{rep.ai_analysis}</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <div style={{ textAlign: 'center', paddingBottom: '100px' }}>
        <Link href="/" style={{ padding: '12px 30px', border: '1px solid var(--g)', color: '#00ffb4', textDecoration: 'none', letterSpacing: '2px' }}>
          ← BACK TO HOME
        </Link>
      </div>
    </>
  );
}