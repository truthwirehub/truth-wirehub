export default function Home() {
  return (
    <main style={{ 
      backgroundColor: '#04040c', 
      color: 'white', 
      height: '100vh', 
      width: '100vw', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      margin: 0,
      fontFamily: 'sans-serif',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '10vw', fontWeight: '900', margin: 0, letterSpacing: '-2px' }}>
        TRUTH <span style={{ color: '#00ffb4' }}>WIREHUB</span>
      </h1>
      <p style={{ color: '#555', marginTop: '20px', fontSize: '1.2rem', letterSpacing: '5px', textTransform: 'uppercase' }}>
        Something Big is Coming
      </p>
      <div style={{ marginTop: '40px', width: '40px', height: '2px', backgroundColor: '#00ffb4' }}></div>
    </main>
  )
}