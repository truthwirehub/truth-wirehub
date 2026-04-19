'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Spline from '@splinetool/react-spline'

export default function SequencePage() {
  const [data, setData] = useState<any>(null)
  const [activeBox, setActiveBox] = useState<number | null>(null)

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        const res = await fetch(`${url}/rest/v1/crypto_data?report_main=not.is.null&order=id.desc&limit=1`, {
          headers: { 'apikey': key!, 'Authorization': `Bearer ${key}` }
        })
        const result = await res.json()
        if (result && result.length > 0) setData(result[0])
      } catch (e) { console.error(e) }
    }
    fetchLatest()
  }, [])

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;900&family=JetBrains+Mono:wght@300;500&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  if (!data) return (
    <div style={{background:'#020205', color:'#00ffb4', height:'100vh', display:'flex', justifyContent:'center', alignItems:'center', fontFamily:'"JetBrains Mono", monospace', letterSpacing:'10px', textShadow:'0 0 10px #00ffb4'}}>
      INITIALIZING_NEURAL_LINK_...
    </div>
  )

  const getPreview = (html: string, def: string) => {
    if (!html) return def;
    const text = html.replace(/<[^>]*>/g, '');
    return text.length > 50 ? text.substring(0, 50).toUpperCase() + '...' : text.toUpperCase();
  }

  const sections = [
    { id: 1, title: `[01] ${getPreview(data.report_main, 'CORE_INTEL')}`, content: data.report_main, color: '#00ffb4', align: 'left' },
    { id: 2, title: `[02] ${getPreview(data.article_text, 'MARKET_ANALYSIS')}`, content: data.article_text, color: '#ffffff', align: 'right' },
    { id: 3, title: `[03] ${getPreview(data.funny_fact, 'ANOMALY_DETECTED')}`, content: data.funny_fact, color: '#ff00ff', align: 'left' },
    { id: 4, title: `[04] ${getPreview(data.unique_patterns, 'PATTERN_RECOGNITION')}`, content: data.unique_patterns, color: '#00b4ff', align: 'right' }
  ]

  return (
    <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#020205', color: '#fff', overflowX: 'hidden', fontFamily: '"JetBrains Mono", monospace' }}>
      
      {/* 🌟 3D SPLINE BACKGROUND LAYER 🌟 */}
      {/* Agar screen black ho, to niche wali line mein apna .splinecode wala link paste kar dena */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0 }}>
        <Spline scene="https://prod.spline.design/53quz3hlIk7klVEdAfdY3RgZ/scene.splinecode" />
      </div>
      {/* Dark overlay taake text clearly nazar aaye */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 1, background: 'radial-gradient(circle at center, transparent 0%, #020205 100%)', pointerEvents: 'none', opacity: 0.8 }}></div>

      {/* 🌟 FOREGROUND LAYER (Terminal UI) 🌟 */}
      <div style={{ position: 'relative', zIndex: 10, padding: '60px 5vw' }}>
        <Link href="/" style={{ color: '#00ffb4', textDecoration: 'none', fontSize: '0.7rem', letterSpacing: '3px', border: '1px solid #00ffb4', padding: '5px 15px', textShadow: '0 0 5px #00ffb4', backgroundColor: 'rgba(0,0,0,0.5)' }}>← RET_TERMINAL</Link>
        
        <h1 style={{ fontFamily: '"Orbitron", sans-serif', fontSize: 'clamp(2rem, 10vw, 6rem)', fontWeight: '900', margin: '40px 0', textTransform: 'uppercase', letterSpacing: '-2px', lineHeight: '0.9', color: '#fff', textShadow: '0 0 20px rgba(255,255,255,0.3)' }}>
          INTEL <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>SEQUENCE</span>
        </h1>

        <div style={{ position: 'relative', maxWidth: '1100px', margin: '0 auto', padding: '40px 0' }}>
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(to bottom, transparent, #00ffb4, transparent)', transform: 'translateX(-50%)', opacity: 0.3, boxShadow: '0 0 10px #00ffb4' }}></div>

          {sections.map((sec) => (
            <div key={sec.id} onClick={() => setActiveBox(activeBox === sec.id ? null : sec.id)} style={{ display: 'flex', justifyContent: sec.align === 'left' ? 'flex-start' : 'flex-end', marginBottom: '80px', width: '100%', cursor: 'pointer' }}>
              <div style={{ width: '48%', padding: '35px', background: activeBox === sec.id ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.4)', border: `1px solid ${activeBox === sec.id ? sec.color : 'rgba(255,255,255,0.1)'}`, transition: 'all 0.5s ease', boxShadow: activeBox === sec.id ? `0 0 30px ${sec.color}33` : 'none', backdropFilter: 'blur(5px)', position: 'relative' }}>
                
                <h3 style={{ fontFamily: '"Orbitron", sans-serif', color: sec.color, fontSize: '0.75rem', letterSpacing: '2px', margin: 0, textShadow: activeBox === sec.id ? `0 0 10px ${sec.color}` : 'none' }}>
                  {sec.title} 
                </h3>
                
                <div style={{ marginTop: '25px', display: activeBox === sec.id ? 'block' : 'none' }}>
                  <div style={{ fontSize: '0.85rem', lineHeight: '2', color: 'rgba(255,255,255,0.9)', marginBottom: '30px', textAlign: 'justify', borderLeft: `2px solid ${sec.color}`, paddingLeft: '15px' }} dangerouslySetInnerHTML={{ __html: sec.content || "NO_DATA_POCKET_FOUND" }} />
                  
                  <Link href={`/article/${data.id}`} style={{ display: 'block', textAlign: 'center', background: sec.color, color: '#000', padding: '12px', textDecoration: 'none', fontSize: '0.7rem', letterSpacing: '4px', fontWeight: '900', fontFamily: '"Orbitron", sans-serif', clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)' }}>
                    ACCESS_DOSSIER_ →
                  </Link>
                </div>
                {!activeBox && <div style={{marginTop:'20px', color:sec.color, fontSize:'0.55rem', opacity:0.6, letterSpacing:'3px'}}>STATUS: ENCRYPTED_STREAMS</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}