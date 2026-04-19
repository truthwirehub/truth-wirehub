'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export default function SequencePage() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const fetchLatest = async () => {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      const res = await fetch(`${url}/rest/v1/crypto_data?select=*&order=id.desc&limit=1`, {
        headers: { 'apikey': key!, 'Authorization': `Bearer ${key}` }
      })
      const result = await res.json()
      setData(result[0])
    }
    fetchLatest()
  }, [])

  if (!data) return <div style={{background:'#04040c', color:'#00ffb4', height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}>INITIALIZING SEQUENCE...</div>

  return (
    <div style={{ background: '#04040c', minHeight: '100vh', color: '#fff', padding: '60px 5vw', fontFamily: 'monospace' }}>
      <Link href="/" style={{ color: '#00ffb4', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '2px' }}>← TERMINAL_HOME</Link>
      
      <h1 style={{ fontSize: 'clamp(2rem, 8vw, 5rem)', fontWeight: '900', margin: '40px 0', borderBottom: '1px solid rgba(0,255,180,0.2)' }}>
        INTELLIGENCE <span style={{ color: 'rgba(255,255,255,0.2)' }}>SEQUENCE</span>
      </h1>

      <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
        {/* Vertical Center Line */}
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(to bottom, #00ffb4, transparent)', transform: 'translateX(-50%)', opacity: 0.3 }}></div>

        {/* SEQUENCE 01: DETAILED REPORT */}
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '80px', width: '100%' }}>
          <div style={{ width: '45%', padding: '25px', background: 'rgba(0,255,180,0.03)', border: '1px solid #00ffb4', borderRadius: '4px', position: 'relative' }}>
            <h3 style={{ color: '#00ffb4', marginTop: 0 }}>[01] DETAILED_REPORT</h3>
            <div style={{ fontSize: '0.9rem', lineHeight: '1.6', opacity: 0.8 }} dangerouslySetInnerHTML={{ __html: data.report_main }} />
          </div>
        </div>

        {/* SEQUENCE 02: ARTICLE */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '80px', width: '100%' }}>
          <div style={{ width: '45%', padding: '25px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px' }}>
            <h3 style={{ color: '#fff', marginTop: 0 }}>[02] ANALYST_ARTICLE</h3>
            <div style={{ fontSize: '0.9rem', lineHeight: '1.6', opacity: 0.8 }} dangerouslySetInnerHTML={{ __html: data.article_text }} />
          </div>
        </div>

        {/* SEQUENCE 03: FUNNY FACT */}
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '80px', width: '100%' }}>
          <div style={{ width: '45%', padding: '25px', background: 'rgba(255,0,255,0.03)', border: '1px solid #ff00ff', borderRadius: '4px' }}>
            <h3 style={{ color: '#ff00ff', marginTop: 0 }}>[03] FUNNY_DATA</h3>
            <div style={{ fontSize: '0.9rem', lineHeight: '1.6', opacity: 0.8 }} dangerouslySetInnerHTML={{ __html: data.funny_fact }} />
          </div>
        </div>

        {/* SEQUENCE 04: PATTERNS */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '80px', width: '100%' }}>
          <div style={{ width: '45%', padding: '25px', background: 'rgba(0,180,255,0.03)', border: '1px solid #00b4ff', borderRadius: '4px' }}>
            <h3 style={{ color: '#00b4ff', marginTop: 0 }}>[04] UNIQUE_PATTERNS</h3>
            <div style={{ fontSize: '0.9rem', lineHeight: '1.6', opacity: 0.8 }} dangerouslySetInnerHTML={{ __html: data.unique_patterns }} />
          </div>
        </div>
      </div>
    </div>
  )
}