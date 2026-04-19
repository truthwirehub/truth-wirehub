import './globals.css'
import dynamic from 'next/dynamic'

// 🚀 Fix: Spline ko dynamically load kar rahe hain taake poori site crash na ho
const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: '#020205' }}>
        
        {/* 🌟 GLOBAL 3D BACKGROUND (Har Page ke peeche chalega) 🌟 */}
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zindex: 0 }}>
          <Spline scene="https://prod.spline.design/53quz3hlIk7klVEdAfdY3RgZ/scene.splinecode" />
        </div>

        {/* 🌟 DARK OVERLAY (Text readability ke liye) 🌟 */}
        <div style={{ 
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', 
          zIndex: 1, pointerEvents: 'none',
          background: 'radial-gradient(circle at center, transparent 0%, #020205 90%)',
          opacity: 0.7 
        }}></div>

        {/* 🌟 ACTUAL CONTENT (Aapke pages yahan load honge) 🌟 */}
        <main style={{ position: 'relative', zIndex: 10 }}>
          {children}
        </main>

      </body>
    </html>
  )
}