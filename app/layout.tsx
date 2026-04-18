import './globals.css'

export const metadata = {
  title: 'Truth WireHub',
  description: 'Intelligence Engine',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#04040c' }}>
        {children}
      </body>
    </html>
  )
}