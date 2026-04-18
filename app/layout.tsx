import './globals.css'

export const metadata = {
  title: 'Truth WireHub',
  description: 'Intelligence Nexus',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#04040c] m-0 p-0">
        {children}
      </body>
    </html>
  )
}