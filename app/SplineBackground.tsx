'use client'
import dynamic from 'next/dynamic'

// 3D ko browser ke liye safe banaya
const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false })

export default function SplineBackground() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0 }}>
      <Spline scene="https://prod.spline.design/53quz3hlIk7klVEdAfdY3RgZ/scene.splinecode" />
    </div>
  )
}