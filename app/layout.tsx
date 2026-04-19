import './globals.css'
import SplineBackground from './SplineBackground'

export const metadata = {
  title: 'Truth WireHub',
  description: 'AI Automation Engine',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ margin: 0, backgroundColor: '#020205', overflowX: 'hidden' }}>
        
        {/* 🌟 3D Background Component */}
        <SplineBackground />

        {/* 🌟 Dark Overlay for readability */}
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100vh', 
          zIndex: 1, 
          pointerEvents: 'none',
          background: 'radial-gradient(circle at center, transparent 0%, #020205 90%)',
          opacity: 0.7 
        }}></div>

        {/* 🌟 Main Content Layer */}
        <main style={{ position: 'relative', zIndex: 10 }}>
          {children}
        </main>

      </body>
    </html>
  )
}