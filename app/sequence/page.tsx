{sections.map((sec) => (
  <div key={sec.id} onClick={() => setActiveBox(activeBox === sec.id ? null : sec.id)}
       style={{ display: 'flex', justifyContent: sec.align === 'left' ? 'flex-start' : 'flex-end', marginBottom: '60px', width: '100%', cursor: 'pointer' }}>
    <div style={{ 
      width: '45%', padding: '30px', 
      background: activeBox === sec.id ? 'rgba(255,255,255,0.03)' : 'transparent', 
      border: `1px solid ${activeBox === sec.id ? sec.color : 'rgba(255,255,255,0.1)'}`, 
      borderRadius: '2px', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      boxShadow: activeBox === sec.id ? `0 0 30px ${sec.color}11` : 'none',
      transform: activeBox === sec.id ? 'scale(1.03)' : 'scale(1)'
    }}>
      <h3 style={{ color: sec.color, marginTop: 0, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
        {sec.title} 
        <span style={{ float: 'right', opacity: 0.5 }}>{activeBox === sec.id ? '[-]' : '[+]'}</span>
      </h3>
      
      <div style={{ 
        marginTop: '20px', 
        fontSize: '0.9rem', 
        lineHeight: '1.8', 
        opacity: activeBox === sec.id ? 1 : 0.5, 
        display: activeBox === sec.id ? 'block' : 'none',
        color: 'rgba(255,255,255,0.8)'
      }}>
        {/* Content Display */}
        <div dangerouslySetInnerHTML={{ __html: sec.content || "DATA_STREAM_EMPTY" }} />
        
        {/* UNIVERSAL LINK - Ye ab har box mein nazar aayega */}
        {sec.content && (
          <Link href={`/article/${data.id}`} style={{
            display: 'inline-block',
            marginTop: '25px',
            color: sec.color,
            border: `1px solid ${sec.color}`,
            padding: '10px 20px',
            textDecoration: 'none',
            fontSize: '0.7rem',
            letterSpacing: '2px',
            fontWeight: 'bold',
            transition: 'all 0.3s ease'
          }}>
            READ_FULL_INTELLIGENCE_ // ID_{data.id} →
          </Link>
        )}
      </div>
      
      {!activeBox && <div style={{marginTop:'15px', color:sec.color, fontSize:'0.6rem', opacity:0.4}}>DECRYPTING_STREAM_...</div>}
    </div>
  </div>
))}