'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Archive() {
  const [reports, setReports] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const itemsPerPage = 6 // Aik page par 6 reports

  useEffect(() => {
    const fetchArchive = async () => {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      
      // Pagination ki logic: offset calculation
      const from = (page - 1) * itemsPerPage
      const to = from + itemsPerPage - 1

      const res = await fetch(`${url}/rest/v1/crypto_data?select=*&order=id.desc&offset=${from}&limit=${itemsPerPage}`, {
        headers: { 'apikey': key!, 'Authorization': `Bearer ${key}` }
      })
      const data = await res.json()
      setReports(data)
    }
    fetchArchive()
  }, [page])

  return (
    <div style={{ background: '#04040c', minHeight: '100vh', color: '#fff', padding: '50px 10vw' }}>
      <Link href="/" style={{ color: '#00ffb4', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '2px' }}>
        ← BACK TO TERMINAL
      </Link>
      
      <h1 style={{ fontSize: '4rem', marginTop: '20px', fontWeight: '900' }}>DATA <span style={{ color: 'rgba(255,255,255,0.2)' }}>ARCHIVE</span></h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px', marginTop: '50px' }}>
        {reports.map((rep, i) => (
          <div key={i} style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '20px', borderRadius: '15px', background: 'rgba(255,255,255,0.02)' }}>
             <p style={{ color: '#00ffb4', fontSize: '0.7rem' }}>{new Date(rep.date_recorded).toLocaleDateString()}</p>
             <div style={{ maxHeight: '200px', overflow: 'hidden', marginTop: '15px', fontSize: '0.9rem', opacity: 0.7 }} 
                  dangerouslySetInnerHTML={{ __html: rep.ai_analysis }} />
             <button style={{ background: 'none', border: '1px solid #00ffb4', color: '#00ffb4', marginTop: '20px', padding: '5px 15px', cursor: 'pointer' }}>
               Read Full
             </button>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div style={{ marginTop: '50px', display: 'flex', gap: '20px', alignItems: 'center' }}>
        <button onClick={() => setPage(p => Math.max(1, p - 1))} style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: 'none', cursor: 'pointer' }}>Previous</button>
        <span>Page {page}</span>
        <button onClick={() => setPage(p => p + 1)} style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: 'none', cursor: 'pointer' }}>Next</button>
      </div>
    </div>
  )
}