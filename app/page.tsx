export default function Home() {
  return (
    <div style={{ 
      backgroundColor: '#04040c', 
      color: 'white', 
      height: '100vh', 
      width: '100vw', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      margin: 0,
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ fontSize: '10vw', fontWeight: '900', margin: 0, letterSpacing: '-2px' }}>
        TRUTH <span style={{ color: '#00ffb4' }}>WIREHUB</span>
      </h1>
      <p style={{ color: '#555', marginTop: '20px', fontSize: '1.5rem', letterSpacing: '5px', textTransform: 'uppercase' }}>
        Something Big is Coming
      </p>
      <div style={{ 
        marginTop: '50px', 
        width: '50px', 
        height: '2px', 
        backgroundColor: '#00ffb4' 
      }}></div>
    </div>
  )
}