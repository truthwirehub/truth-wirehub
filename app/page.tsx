'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [reports, setReports] = useState<any[]>([])

  // 1. DATA FETCHING (Latest 3)
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        if (!url || !key) return;
        const res = await fetch(`${url}/rest/v1/crypto_data?select=ai_analysis,date_recorded&order=id.desc&limit=3`, {
          headers: { 'apikey': key, 'Authorization': `Bearer ${key}` }
        });
        const data = await res.json();
        if (data && data.length > 0) setReports(data);
      } catch (e) { console.error("Fetch Error:", e); }
    };
    fetchReports();
  }, []);

  // 2. FULL CINEMATIC ANIMATIONS (GSAP & CANVAS)
  useEffect(() => {
    const loadScript = (src: string) => new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src; script.async = true; script.onload = resolve;
      document.body.appendChild(script);
    });

    const initAll = async () => {
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js');
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js');

      const gsap = (window as any).gsap;
      const ScrollTrigger = (window as any).ScrollTrigger;
      if (!gsap) return;
      gsap.registerPlugin(ScrollTrigger);

      // --- CURSOR LOGIC ---
      const cur = document.getElementById('cursor');
      const ring = document.getElementById('cursor-ring');
      document.addEventListener('mousemove', e => {
        gsap.to(cur, { x: e.clientX, y: e.clientY, duration: 0.08 });
        gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.25 });
      });

      // --- BACKGROUND CANVAS (Floating Particles & Grids) ---
      const canvas = document.getElementById('bg-canvas') as HTMLCanvasElement;
      if (canvas) {
        const ctx = canvas.getContext('2d')!;
        let w = canvas.width = window.innerWidth;
        let h = canvas.height = window.innerHeight;
        window.addEventListener('resize', () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; });

        const pts = Array.from({ length: 80 }, () => ({
          x: Math.random(), y: Math.random(), r: Math.random() * 1.2 + 0.3,
          vx: (Math.random() - 0.5) * 0.0003, vy: (Math.random() - 0.5) * 0.0003,
          alpha: Math.random() * 0.4 + 0.05
        }));

        const draw = () => {
          ctx.clearRect(0, 0, w, h);
          ctx.fillStyle = '#04040c'; ctx.fillRect(0, 0, w, h);
          
          // Grid
          ctx.strokeStyle = 'rgba(255,255,255,0.02)';
          for (let x = 0; x < w; x += 80) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
          for (let y = 0; y < h; y += 80) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

          pts.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0;
            ctx.beginPath(); ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0,255,180,${p.alpha})`; ctx.fill();
          });
          requestAnimationFrame(draw);
        };
        draw();
      }

      // --- TYPEWRITER ---
      const sub = document.getElementById('welcome-sub');
      if (sub) {
        const text = sub.innerText; sub.innerText = '';
        let i = 0;
        const type = () => { if(i <= text.length) { sub.innerText = text.substring(0, i++); setTimeout(type, 30); } };
        setTimeout(type, 1000);
      }

      // --- SCENE ANIMATIONS ---
      gsap.from('.welcome-title', { opacity: 0, y: 100, duration: 1.5, ease: 'power4.out' });
      document.querySelectorAll('.scene').forEach(scene => {
        const head = scene.querySelector('.scene-heading, .deals-tagline');
        if(head) gsap.from(head, { opacity: 0, y: 60, scrollTrigger: { trigger: scene, start: 'top 70%' } });
      });
    };
    initAll();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        * { margin: 0; padding: 0; box-sizing: border-box; }
        :root { --g: #00ffb4; --p: #ff00aa; --b: #00aaff; }
        body { background: #04040c; color: #fff; font-family: 'Inter', sans-serif; overflow-x: hidden; cursor: none; }
        #cursor { position: fixed; width: 12px; height: 12px; background: var(--g); border-radius: 50%; pointer-events: none; z-index: 9999; mix-blend-mode: difference; }
        #cursor-ring { position: fixed; width: 36px; height: 36px; border: 1px solid rgba(0,255,180,0.4); border-radius: 50%; pointer-events: none; z-index: 9998; transform: translate(-50%,-50%); }
        #bg-canvas { position: fixed; inset: 0; z-index: 0; }
        .scene { position: relative; z-index: 10; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; padding: 100px 10vw; }
        
        .welcome-title { font-size: clamp(4rem, 10vw, 10rem); font-weight: 900; line-height: 0.9; letter-spacing: -5px; text-align: center; }
        .scene-label { font-size: 0.7rem; letter-spacing: 5px; text-transform: uppercase; color: var(--g); margin-bottom: 20px; }
        .scene-heading { font-size: clamp(3rem, 7vw, 7rem); font-weight: 900; line-height: 0.95; margin-bottom: 30px; }
        .muted { color: rgba(255,255,255,0.2); }
        .scene-body { font-size: 1.2rem; color: rgba(255,255,255,0.4); max-width: 600px; line-height: 1.6; margin-bottom: 30px; }

        .report-card { 
          background: rgba(255,255,255,0.02); border: 1px solid rgba(0,255,180,0.15); 
          padding: 40px; border-radius: 12px; transition: all 0.4s ease; 
          backdrop-filter: blur(15px); position: relative; overflow: hidden;
        }
        .report-card:hover { 
          transform: perspective(1000px) rotateX(4deg) translateY(-10px);
          border-color: var(--g); box-shadow: 0 30px 60px rgba(0,255,180,0.15);
        }
        .scan-line {
          position: absolute; top: 0; left: 0; width: 100%; height: 2px;
          background: linear-gradient(90deg, transparent, var(--g), transparent);
          animation: scan 4s linear infinite;
        }
        @keyframes scan { 0% { top: -10%; } 100% { top: 110%; } }
      `}} />

      <canvas id="bg-canvas"></canvas>
      <div id="cursor"></div>
      <div id="cursor-ring"></div>

      {/* SCENE 1 — WELCOME */}
      <section className="scene" id="scene-welcome" style={{ textAlign: 'center', alignItems: 'center' }}>
        <p className="scene-label">The world in one place</p>
        <h1 className="welcome-title">TRUTH <br/><span style={{color:'var(--g)'}}>WIREHUB</span></h1>
        <p className="scene-body" id="welcome-sub">Every trend. Every story. Every deal — extracted from the global pulse, in real time.</p>
      </section>

      {/* SCENE 2 — TECH */}
      <section className="scene" id="scene-tech">
        <div style={{ position:'absolute', right:'10vw', fontSize:'15rem', opacity:0.05, fontWeight:900 }}>02</div>
        <p className="scene-label">Technology</p>
        <h2 className="scene-heading">The World's <br/><span className="muted">Intelligence</span> Engine</h2>
        <p className="scene-body">We scan the internet so you don't have to. Markets, geopolitics, sports, and viral culture shifts — all delivered as actionable intelligence.</p>
      </section>

      {/* SCENE 3 — NEWS */}
      <section className="scene" id="scene-news" style={{ textAlign: 'right', alignItems: 'flex-end' }}>
        <div style={{ position:'absolute', left:'10vw', fontSize:'15rem', opacity:0.05, fontWeight:900 }}>03</div>
        <p className="scene-label" style={{ color: 'var(--p)' }}>Breaking News</p>
        <h2 className="scene-heading">Stories That <br/><span className="muted">Truly</span> Matter</h2>
        <p className="scene-body">From underground tech labs to viral culture shifts — we find what's moving the world before it reaches your feed.</p>
      </section>

      {/* SCENE 4.5 — ADVANCE LIVE FEED */}
      <section className="scene" id="scene-reports" style={{ background: '#020207' }}>
        <p className="scene-label">Live Feed // Intelligence</p>
        <h2 className="scene-heading">Latest <span className="muted">Briefings</span></h2>
        
        <div style={{ width: '100%', maxWidth: '900px' }}>
          {reports.length === 0 ? (
            <div className="report-card">WAITING_FOR_DATA_STREAM...</div>
          ) : (
            reports.map((rep, idx) => (
              <Link href="/sequence" key={idx} style={{ textDecoration: 'none', color: 'inherit', display: 'block', marginBottom: '30px' }}>
                <div className="report-card">
                  <div className="scan-line"></div>
                  <p style={{ color: 'var(--g)', fontSize: '0.7rem', letterSpacing: '3px', marginBottom: '10px' }}>
                    LOG_ENTRY_{idx + 1} // {rep.date_recorded ? new Date(rep.date_recorded).toLocaleTimeString() : 'LIVE'}
                  </p>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '15px' }}>ENCRYPTED_INTEL_RECEIVED</h3>
                  <div style={{ color: 'var(--g)', fontSize: '0.75rem', border: '1px solid var(--g)', display: 'inline-block', padding: '8px 20px', textTransform:'uppercase' }}>
                    Open Sequence Analysis →
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* SCENE 4 — DEALS */}
      <section className="scene" id="scene-deals" style={{ alignItems: 'center', textAlign: 'center' }}>
        <p className="scene-label" style={{ color: '#ffcc00' }}>Best Deals</p>
        <h2 className="scene-heading">When Trends Move, <br/><em>So Do Prices</em></h2>
        <p className="scene-body">The moment a product enters the conversation, we surface the best offer for it. Curated in real time.</p>
        <Link href="/archive" style={{ marginTop: '40px', color: 'var(--g)', textDecoration: 'none', border: '1px solid var(--g)', padding: '18px 50px', fontSize: '0.8rem', letterSpacing: '4px', textTransform:'uppercase', fontWeight:'bold' }}>
           Explore Full Archive
        </Link>
      </section>

      {/* SCENE 5 — FINALE */}
      <section className="scene" style={{ textAlign: 'center', alignItems: 'center' }}>
        <h2 className="scene-heading" style={{ fontSize: 'clamp(4rem, 12vw, 12rem)' }}>SOMETHING <br/><span className="muted">BIG IS</span> <br/><span style={{ color: 'var(--g)' }}>COMING</span></h2>
        <p style={{ color: 'var(--g)', letterSpacing: '15px', textTransform: 'uppercase', fontSize: '0.8rem', marginTop: '40px' }}>Stay on the wire // 2026</p>
      </section>
    </>
  )
}