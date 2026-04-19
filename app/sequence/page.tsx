'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

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
    <div style={{color:'#00ffb4', height:'100vh', display:'flex', justifyContent:'center', alignItems:'center', fontFamily:'"JetBrains Mono", monospace', letterSpacing:'10px', textShadow:'0 0 10px #00ffb4'}}>
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
    <div style={{ position: 'relative', minHeight: '100vh', color: '#fff', overflowX: 'hidden', fontFamily: '"JetBrains Mono", monospace' }}>
      
      {/* 🌟 FOREGROUND LAYER (Terminal UI) 🌟 */}
      {/* Background ab layout.tsx se automatically peeche chal raha hoga */}
      <div style={{ position: 'relative', zIndex: 10, padding: '60px 5vw' }}>
        <Link href="/" style={{ color: '#00ffb4', textDecoration: 'none', fontSize: '0.7rem', letterSpacing: '3px', border: '1px solid #00ffb4', padding: '5px 15px', textShadow: '0 0 5px #00ffb4', backgroundColor: 'rgba(0,0,0,0.5)' }}>← RET_TERMINAL</Link>
        
        <h1 style={{ fontFamily: '"Orbitron", sans-serif', fontSize: 'clamp(2rem, 10vw, 6rem)', fontWeight: '900', margin: '40px 0', textTransform: 'uppercase', letterSpacing: '-2px', lineHeight: '0.9', color: