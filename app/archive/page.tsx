'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export default function ArchivePage() {
  const [reports, setReports] = useState<any[]>([])

  useEffect(() => {
    const fetchArchive = async () => {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      const res = await fetch(`${url}/rest/v1/crypto_data?select=*&order=id.desc`, {
        headers: { 'apikey': key!, 'Authorization': `Bearer ${key}` }
      })
      const data = await res.json()
      setReports(data)
    }
    fetchArchive()
  }, [])

  return (
    <div style={{ background: '#04040c', minHeight: '100vh', padding: '60px 5vw', fontFamily: 'monospace' }}>
      <Link href="/" style={{ color: '#00ffb4', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '2px' }}>← TERMINAL_EXIT</Link>
      <h1 style={{ fontSize: '5rem', fontWeight: 900, margin: '40px 0', color: 'rgba(255,255,255,0.05)' }}>DATA_ARCHIVE</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
        {reports.map((rep, i) => (
          <div key={i} style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '25px', background: 'rgba(255,255,255,0.02)' }}>
            <p style={{ color: '#00ffb4', fontSize: '0.7rem' }}>{new Date(rep.date_recorded).toLocaleDateString()}</p>
            <h3 style={{ margin: '15px 0', fontSize: '1rem' }}>INTEL_LOG #{rep.id}</h3>
            <p style={{ fontSize: '0.8rem', opacity: 0.5, lineHeight: 1.6 }}>{rep.report_main?.substring(0, 100)}...</p>
            <Link href="/sequence" style={{ display: 'block', marginTop: '20px', color: '#fff', fontSize: '0.7rem' }}>RE-RUN_ANALYSIS →</Link>
          </div>
        ))}
      </div>
    </div>
  )
}