'use client'
import React, { useState, useEffect, Suspense } from 'react'
import dynamic from 'next/dynamic'

const Spline = dynamic(() => import('@splinetool/react-spline'), { 
  ssr: false 
})

export default function SplineBackground() {
  const [mounted, setMounted] = useState(false)

  // 🚀 Yeh ensure karega ke 3D sirf browser mein load ho
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div style={{ background: '#020205', width: '100vw', height: '100vh' }} />;

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh', 
      zIndex: -1, 
      backgroundColor: '#020205' 
    }}>
      <Suspense fallback={<div style={{ background: '#020205', width: '100%', height: '100%' }} />}>
        <Spline scene="https://prod.spline.design/53quz3hlIk7klVEdAfdY3RgZ/scene.splinecode" />
      </Suspense>
    </div>
  )
}