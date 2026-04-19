'use client'
import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const Spline = dynamic(() => import('@splinetool/react-spline'), { 
  ssr: false 
})

export default function SplineBackground() {
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Agar browser ready nahi ya error hai to khali dark background dikhao
  if (!mounted || error) {
    return <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#020205', zIndex: -1 }} />
  }

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, left: 0, width: '100vw', height: '100vh', 
      zIndex: -1, backgroundColor: '#020205',
      pointerEvents: 'none' 
    }}>
      <Spline 
        scene="https://prod.spline.design/53quz3hlIk7klVEdAfdY3RgZ/scene.splinecode" 
        onError={() => setError(true)} 
      />
    </div>
  )
}