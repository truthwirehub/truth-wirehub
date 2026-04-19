'use client'
import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// SSR: false ka matlab hai server isay touch bhi na kare
const Spline = dynamic(() => import('@splinetool/react-spline'), { 
  ssr: false,
  loading: () => <div style={{ background: '#020205', width: '100vw', height: '100vh' }} />
})

export default function SplineBackground() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div style={{ background: '#020205', width: '100vw', height: '100vh' }} />
  }

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh', 
      zIndex: -1, 
      backgroundColor: '#020205',
      pointerEvents: 'none' // Taake 3D background aapke buttons ko block na kare
    }}>
      <Spline scene="https://prod.spline.design/53quz3hlIk7klVEdAfdY3RgZ/scene.splinecode" />
    </div>
  )
}