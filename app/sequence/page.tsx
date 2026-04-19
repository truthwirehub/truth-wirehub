'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export default function SequencePage() {
  const [data, setData] = useState<any>(null)
  const [activeBox, setActiveBox] = useState<number | null>(null)

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

  if (!data) return <div style={{background:'#04040c', color:'#00ffb4', height:'100vh', display:'flex', justifyContent:'center', alignItems:'center', fontFamily:'monospace'}}>SYNCHRONIZING_DATA_STREAM...</div>

  const sections = [
    { id: 1, title: '[01] DETAILED_REPORT', content: data.report_main, color: '#00ffb4', align: 'left' },
    { id: 2, title: '[02] ANALYST_ARTICLE', content: data.article_text, color: '#ffffff', align: 'right' },
    { id: 3, title: '[03] FUNNY_DATA', content: data.funny_fact, color: '#ff00ff', align: 'left' },
    { id: 4, title: '[04] UNIQUE_PATTERNS', content: data.unique_patterns, color: '#00b4ff', align: 'right' }
  ]

  return (
    <div style={{ background: '#04040c', minHeight: '100vh', color: '#fff', padding: '60px 5vw', fontFamily: 'monospace', overflowX: 'hidden' }}>
      <Link href="/" style={{ color: '#00ffb4', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '2px', borderBottom:'1px solid transparent' }} onMouseEnter={(e)=> e.currentTarget.style.borderBottom='1px solid #00ffb4'} onMouseLeave={(e)=> e.currentTarget.style.borderBottom='1px solid transparent'}>← TERMINAL_HOME</Link>
      
      <h1 style={{ fontSize: 'clamp(2rem, 8vw, 5rem)', fontWeight: '900', margin: '40px 0', textTransform: 'uppercase' }}>
        INTELLIGENCE <span style={{ color: 'rgba(255,255,255,0.1)' }}>SEQUENCE</span>
      </h1>

      <div style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto', padding: '40px 0' }}>
        {/* Glowing Center Line */}
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(to bottom, transparent, #00ffb4, transparent)', transform: 'translateX(-50%)', opacity: 0.5 }}></div>

        {sections.map((sec) => (
          <div key={sec.id} 
               onClick={() => setActiveBox(activeBox === sec.id ? null : sec.id)}
               style={{ 
                 display: 'flex', 
                 justifyContent: sec.align === 'left' ? 'flex-start' : 'flex-end', 
                 marginBottom: '60px', 
                 width: '100%',
                 cursor: 'pointer'
               }}>
            <div style={{ 
              width: '45%', 
              padding: '25px', 
              background: activeBox === sec.id ? 'rgba(255,255,255,0.05)' : 'transparent', 
              border: `1px solid ${activeBox === sec.id ? sec.color : 'rgba(255,255,255,0.1)'}`, 
              borderRadius: '4px',
              transition: 'all 0.3s ease',
              boxShadow: activeBox === sec.id ? `0 0 30px ${sec.color}22` : 'none',
              position: 'relative'
            }}>
              <h3 style={{ color: sec.color, marginTop: 0, fontSize: '0.9rem', letterSpacing: '1px' }}>{sec.title}</h3>
              
              {/* Content area: Yeh tabhi dikhega jab click hoga ya content maujood hoga */}
              <div style={{ 
                marginTop: '15px', 
                fontSize: '0.85rem', 
                lineHeight: '1.7', 
                opacity: activeBox === sec.id ? 1 : 0.6,
                maxHeight: activeBox === sec.id ? '1000px' : '50px',
                overflow: 'hidden',
                transition: 'all 0.5s ease'
              }} 
              dangerouslySetInnerHTML={{ __html: sec.content || "DATA_NOT_FOUND // EXECUTE_N8N_WORKFLOW" }} 
              />
              
              {!activeBox && <div style={{fontSize:'0.6rem', marginTop:'10px', color:sec.color, opacity:0.5}}>[ CLICK TO EXPAND ]</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}