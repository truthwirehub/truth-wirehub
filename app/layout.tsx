import './globals.css'
import SplineBackground from './SplineBackground'

export const metadata = {
  title: 'Truth WireHub',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#020205' }}>
        <SplineBackground />
        <main style={{ position: 'relative', zIndex: 10 }}>
          {children}
        </main>
      </body>
    </html>
  )
}