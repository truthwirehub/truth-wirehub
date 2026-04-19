'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function ArticleDetail() {
  const { id } = useParams()
  const [article, setArticle] = useState<any>(null)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        // Specific ID se data fetch kar rahe hain
        const res = await fetch(`${url}/rest/v1/crypto_data?id=eq.${id}&select=*`, {
          headers: { 'apikey': key!, 'Authorization': `Bearer ${key}` }
        })
        const result = await res.json()
        if (result && result.length > 0) {
          setArticle(result[0])
        }
      } catch (e) {
        console.error("Error fetching article:", e)
      }
    }
    if (id) fetchArticle()
  }, [id])

  if (!article) return (
    <div style={{background:'#04040c', color:'#00ffb4', height:'100vh', display:'flex', justifyContent:'center', alignItems:'center', fontFamily:'monospace', letterSpacing:'5px'}}>
      DECRYPTING_DATA_PACKET_{id}...
    </div>
  )

  return (
    <div style={{ background: '#04040c', minHeight: '100vh', color: '#fff', padding: '80px 10vw', fontFamily: 'Inter, sans-serif' }}>
      {/* Navigation */}
      <Link href="/sequence" style={{ color: '#00ffb4', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '2px', borderBottom:'1px solid rgba(0,255,180,0.3)', paddingBottom:'5px' }}>
        ← RETURN_TO_SEQUENCE
      </Link>
      
      {/* Header Section */}
      <header style={{ marginTop: '80px', borderLeft: '4px solid #00ffb4', paddingLeft: '30px' }}>
        <p style={{ color: '#00ffb4', fontSize: '0.7rem', letterSpacing: '5px', textTransform: 'uppercase', opacity: 0.6 }}>
          Intelligence_Stream // ID_{article.id}
        </p>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: '900', marginTop: '20px', lineHeight: '1.1', letterSpacing: '-2px' }}>
            {article.article_text ? article.article_text.replace(/<[^>]*>/g, '').substring(0, 70) + '...' : 'Classified Dossier'}
        </h1>
        <div style={{ display: 'flex', gap: '30px', marginTop: '30px', color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', letterSpacing: '2px' }}>
            <span>DATE: {new Date(article.date_recorded).toLocaleDateString()}</span>
            <span>STATUS: ENCRYPTED_STORY_VERIFIED</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ marginTop: '80px', maxWidth: '850px' }}>
        <div 
          style={{ 
            fontSize: '1.25rem', 
            lineHeight: '1.8', 
            color: 'rgba(255,255,255,0.8)',
            fontWeight: '300'
          }} 
          dangerouslySetInnerHTML={{ __html: article.article_text || article.ai_analysis }} 
        />
        
        {/* Futuristic Footer Note */}
        <div style={{ 
          marginTop: '100px', 
          padding: '40px', 
          background: 'rgba(0, 255, 180, 0.02)', 
          border: '1px solid rgba(0, 255, 180, 0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '2px', height: '100%', background: '#00ffb4' }}></div>
            <h4 style={{ color: '#00ffb4', marginBottom: '15px', fontSize: '0.8rem', letterSpacing: '3px' }}>[!] TERMINAL_CONFIRMATION</h4>
            <p style={{ fontSize: '0.95rem', opacity: 0.6, lineHeight: '1.6' }}>
              This intelligence packet was autonomously generated and verified by the TruthWireHub engine. Any unauthorized distribution of this decrypted sequence is logged.
            </p>
        </div>
      </main>

      {/* Background Decor */}
      <div style={{ position: 'fixed', top: '10%', right: '5%', fontSize: '20rem', fontWeight: 900, color: 'rgba(255,255,255,0.02)', zIndex: -1, pointerEvents: 'none' }}>
        {article.id}
      </div>
    </div>
  )
}