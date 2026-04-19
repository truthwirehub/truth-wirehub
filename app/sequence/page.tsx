'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SequencePage() {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeBox, setActiveBox] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        if (!url || !key) {
          setError('Environment variables missing. Please check SUPABASE_URL and SUPABASE_ANON_KEY.')
          return
        }
        const res = await fetch(`${url}/rest/v1/crypto_data?select=*&order=id.desc&limit=1`, {
          headers: { 'apikey': key!, 'Authorization': `Bearer ${key}` }
        })
        if (!res.ok) {
          setError(`Failed to fetch data: ${res.status} ${res.statusText}`)
          return
        }
        const result = await res.json()
        setData(result[0])
      } catch (e) {
        setError('Network error: Unable to connect to the server.')
        console.error(e)
      }
    }
    fetchLatest()
  }, [])

  if (error) return <div style={{background:'#04040c', color:'#ff4444', height:'100vh', display:'flex', justifyContent:'center', alignItems:'center', fontFamily:'monospace', letterSpacing:'2px', flexDirection:'column'}}><div>ERROR: {error}</div><Link href="/" style={{color:'#00ffb4', marginTop:'20px'}}>← BACK_TO_TERMINAL</Link></div>

  if (!data) return <div style={{background:'#04040c', color:'#00ffb4', height:'100vh', display:'flex', justifyContent:'center', alignItems:'center', fontFamily:'monospace', letterSpacing:'10px'}}>SYNCHRONIZING_SEQUENCE...</div>

  // Helper function to clean HTML and get first few words for the title
  const getPreview = (html: string, defaultTitle: string) => {
    if (!html) return defaultTitle;
    const plainText = html.replace(/<[^>]*>/g, ''); // Remove HTML tags
    return plainText.length > 40 ? plainText.substring(0, 40) + '...' : plainText;
  }

  const sections = [
    { 
      id: 1, 
      title: `[01] ${getPreview(data.report_main, 'DETAILED_REPORT')}`, 
      content: data.report_main, 
      color: '#00ffb4', 
      align: 'left' 
    },
    { 
      id: 2, 
      title: `[02] ${getPreview(data.article_text, 'ANALYST_ARTICLE')}`, 
      content: data.article_text, 
      color: '#ffffff', 
      align: 'right' 
    },
    { 
      id: 3, 
      title: `[03] ${getPreview(data.funny_fact, 'FUNNY_DATA')}`, 
      content: data.funny_fact, 
      color: '#ff00ff', 
      align: 'left' 
    },
    { 
      id: 4, 
      title: `[04] ${getPreview(data.unique_patterns, 'UNIQUE_PATTERNS')}`, 
      content: data.unique_patterns, 
      color: '#00b4ff', 
      align: 'right' 
    }
  ]

  return (
    <div style={{ background: '#04040c', minHeight: '100vh', color: '#fff', padding: '60px 5vw', fontFamily: 'monospace' }}>
      <Link href="/" style={{ color: '#00ffb4', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '2px', borderBottom:'1px solid #00ffb4' }}>← BACK_TO_TERMINAL</Link>
      
      <h1 style={{ fontSize: 'clamp(2rem, 8vw, 5rem)', fontWeight: '900', margin: '40px 0', textTransform: 'uppercase' }}>
        INTELLIGENCE <span style={{ color: 'rgba(255,255,255,0.05)' }}>SEQUENCE</span>
      </h1>

      <div style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto', padding: '40px 0' }}>
        {/* Timeline Center Line */}
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(to bottom, transparent, #00ffb4, transparent)', transform: 'translateX(-50%)', opacity: 0.3 }}></div>

        {sections.map((sec) => (
          <div key={sec.id} onClick={() => sec.id === 2 ? router.push(`/article/${data.id}`) : setActiveBox(activeBox === sec.id ? null : sec.id)}
               style={{ display: 'flex', justifyContent: sec.align === 'left' ? 'flex-start' : 'flex-end', marginBottom: '60px', width: '100%', cursor: 'pointer' }}>
            <div style={{ 
              width: '45%', padding: '30px', 
              background: activeBox === sec.id ? 'rgba(255,255,255,0.03)' : 'transparent', 
              border: `1px solid ${activeBox === sec.id ? sec.color : 'rgba(255,255,255,0.1)'}`, 
              borderRadius: '2px', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              boxShadow: activeBox === sec.id ? `0 0 30px ${sec.color}11` : 'none',
              transform: activeBox === sec.id ? 'scale(1.03)' : 'scale(1)'
            }}>
              <h3 style={{ color: sec.color, marginTop: 0, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                {sec.title} 
                <span style={{ float: 'right', opacity: 0.5 }}>{activeBox === sec.id ? '[-]' : '[+]'}</span>
              </h3>
              
              <div style={{ 
                marginTop: '20px', 
                fontSize: '0.9rem', 
                lineHeight: '1.8', 
                opacity: activeBox === sec.id ? 1 : 0.5, 
                display: activeBox === sec.id ? 'block' : 'none',
                color: 'rgba(255,255,255,0.8)'
              }} 
              dangerouslySetInnerHTML={{ __html: sec.content || "DATA_STREAM_EMPTY // CHECK_N8N_MAPPING" }} />
              
              {!activeBox && <div style={{marginTop:'15px', color:sec.color, fontSize:'0.6rem', opacity:0.4}}>DECRYPTING_STREAM_...</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}