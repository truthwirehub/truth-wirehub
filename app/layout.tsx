import './globals.css'
import SplineBackground from './SplineBackground'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: '#020205' }}>
        
        {/* Alag component se 3D background bulaya */}
        <SplineBackground />

        {/* DARK OVERLAY */}
        <div style={{ 
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', 
          zIndex: 1, pointerEvents: 'none',
          background: 'radial-gradient(circle at center, transparent 0%, #020205 90%)',
          opacity: 0.7 
        }}></div>

        {/* MAIN CONTENT */}
        <main style={{ position: 'relative', zIndex: 10 }}>
          {children}
        </main>

      </body>
    </html>
  )
}