'use client'
import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'

const Spline = dynamic(() => import('@splinetool/react-spline'), { 
  ssr: false 
})

export default function SplineBackground() {
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh', 
      zIndex: -1, // Bilkul peeche
      backgroundColor: '#020205' 
    }}>
      <Suspense fallback={<div style={{ background: '#020205', width: '100%', height: '100%' }} />}>
        <Spline scene="https://prod.spline.design/53quz3hlIk7klVEdAfdY3RgZ/scene.splinecode" />
      </Suspense>
    </div>
  )
}