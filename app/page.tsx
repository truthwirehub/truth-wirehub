'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// --- SUB-COMPONENT: Animated Background ---
function BgCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let animId: number
    let scrollY = 0
    let targetScroll = 0
    let t = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', () => { targetScroll = window.scrollY })

    const pts = Array.from({ length: 80 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.2 + 0.3,
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0003,
      alpha: Math.random() * 0.4 + 0.05,
    }))

    const orbs = [
      { x: 0.5, y: 0.3, r: 0.4, color: [0, 255, 180], phase: 0 },
      { x: 0.15, y: 0.6, r: 0.35, color: [0, 170, 255], phase: 2 },
      { x: 0.85, y: 0.7, r: 0.38, color: [255, 0, 170], phase: 4 },
      { x: 0.5, y: 1.0, r: 0.4, color: [255, 200, 0], phase: 6 },
    ]

    const draw = () => {
      scrollY += (targetScroll - scrollY) * 0.06
      t += 0.008
      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = '#04040c'
      ctx.fillRect(0, 0, W, H)

      const sp = scrollY / (document.body.scrollHeight - window.innerHeight || 1)

      orbs.forEach((orb, i) => {
        const ox = orb.x * W + Math.sin(t + orb.phase) * W * 0.08
        const oy = (orb.y + sp * 0.3 * (i % 2 === 0 ? -1 : 1)) * H + Math.cos(t * 0.7 + orb.phase) * H * 0.05
        const gr = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.r * W)
        gr.addColorStop(0, `rgba(${orb.color.join(',')},0.09)`)
        gr.addColorStop(1, `rgba(${orb.color.join(',')},0)`)
        ctx.fillStyle = gr
        ctx.fillRect(0, 0, W, H)
      })

      const gridOffset = (scrollY * 0.15) % 80
      ctx.strokeStyle = 'rgba(255,255,255,0.02)'
      ctx.lineWidth = 1
      for (let x = 0; x < W + 80; x += 80) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
      }
      for (let y = -80 + (gridOffset % 80); y < H + 80; y += 80) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
      }

      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0
        if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x * W, p.y * H - scrollY * 0.02, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,255,180,${p.alpha})`
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
    />
  )
}

// --- MAIN HOME PAGE ---
export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const cur = cursorRef.current!
    const ring = ringRef.current!

    const onMove = (e: MouseEvent) => {
      gsap.to(cur, { x: e.clientX, y: e.clientY, duration: 0.08 })
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.25 })
    }
    document.addEventListener('mousemove', onMove)

    // Typewriter
    const el = subRef.current!
    const text = "Every trend. Every story. Every deal — surfaced from the world's pulse, in real time, for you."
    el.innerText = ''
    let i = 0
    const timeout = setTimeout(function type() {
      if (i < text.length) { el.innerText += text[i++]; setTimeout(type, 25) }
    }, 1200)

    // Animations
    gsap.from('.welcome-title', { opacity: 0, y: 60, duration: 1.2, delay: 0.4, ease: 'power4.out' })
    gsap.from('.welcome-eyebrow', { opacity: 0, y: 20, duration: 1.2, delay: 0.2, ease: 'power3.out' })

    document.querySelectorAll('.scene:not(#scene-welcome)').forEach(scene => {
      const heading = scene.querySelector('.scene-heading, .deals-tagline')
      const body = scene.querySelector('.scene-body')
      const label = scene.querySelector('.scene-label')
      if (label) gsap.from(label, { opacity: 0, x: -30, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: scene, start: 'top 75%' } })
      if (heading) gsap.from(heading, { opacity: 0, y: 80, duration: 1.2, ease: 'power4.out', scrollTrigger: { trigger: scene, start: 'top 70%' } })
      if (body) gsap.from(body, { opacity: 0, y: 40, duration: 1.2, delay: 0.2, ease: 'power3.out', scrollTrigger: { trigger: scene, start: 'top 68%' } })
    })

    // Background color shift
    const bgColors = ['#04040c', '#02080f', '#0a0208', '#07060a']
    document.querySelectorAll('.scene').forEach((scene, i) => {
      ScrollTrigger.create({
        trigger: scene, start: 'top 50%',
        onEnter: () => gsap.to('body', { backgroundColor: bgColors[i % bgColors.length], duration: 1.2 }),
        onLeaveBack: () => gsap.to('body', { backgroundColor: bgColors[Math.max(0, i - 1) % bgColors.length], duration: 1.2 }),
      })
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      clearTimeout(timeout)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <>
      <BgCanvas />
      <div id="cursor" ref={cursorRef} />
      <div id="cursor-ring" ref={ringRef} />

      {/* SCENE 1 */}
      <section className="scene" id="scene-welcome" style={{ textAlign: 'center' }}>
        <div className="glow-orb" style={{ width: 600, height: 600, background: 'var(--g)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        <div className="float-word" style={{ top: '18%', left: '6%' }}>Intelligence</div>
        <div className="float-word" style={{ top: '22%', right: '8%' }}>Realtime</div>
        <div className="float-word" style={{ bottom: '28%', left: '10%' }}>Trends</div>
        <div className="float-word" style={{ bottom: '22%', right: '6%' }}>Global</div>
        <p className="welcome-eyebrow">The world in one place</p>
        <h1 className="welcome-title" style={{ fontSize: 'clamp(4rem,10vw,10rem)', fontWeight: 900, lineHeight: 0.92, letterSpacing: -4 }}>
          <span style={{ background: 'linear-gradient(135deg,#fff,rgba(255,255,255,0.5))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>TRUTH</span>
          <br />
          <span style={{ background: 'linear-gradient(90deg,var(--g),var(--b))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'block' }}>WIREHUB</span>
        </h1>
        <p ref={subRef} style={{ marginTop: 40, fontSize: 'clamp(1rem,2vw,1.3rem)', color: 'rgba(255,255,255,0.28)', letterSpacing: 1, lineHeight: 1.7, maxWidth: 600, fontWeight: 300, position: 'relative' }} />
        <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.18)', fontSize: '0.6rem', letterSpacing: 4, textTransform: 'uppercase' }}>
          <div className="scroll-line" />
          scroll
        </div>
        <div className="scene-rule" />
      </section>

      {/* SCENE 2 */}
      <section className="scene" id="scene-tech" style={{ alignItems: 'flex-start', paddingLeft: 'max(60px,10vw)' }}>
        <div className="glow-orb" style={{ width: 500, height: 500, background: 'var(--b)', top: '30%', left: -100 }} />
        <div className="big-number">02</div>
        <p className="scene-label">Technology</p>
        <h2 className="scene-heading">The World&apos;s<span className="muted">Intelligence</span>Engine</h2>
        <p className="scene-body">We scan the internet so you don&apos;t have to. <strong>Markets, geopolitics, and culture</strong> analyzed and delivered as clean, actionable intelligence.</p>
        <div className="scene-rule" />
      </section>

      {/* SCENE 3 */}
      <section className="scene" id="scene-news" style={{ alignItems: 'flex-end', paddingRight: 'max(60px,10vw)', textAlign: 'right' }}>
        <div className="glow-orb" style={{ width: 500, height: 500, background: 'var(--p)', bottom: '10%', right: -80 }} />
        <div className="big-number" style={{ left: '8vw', right: 'auto' }}>03</div>
        <p className="scene-label" style={{ color: 'var(--p)' }}>Breaking News</p>
        <h2 className="scene-heading">Stories That<span className="muted">Actually</span>Matter</h2>
        <p className="scene-body" style={{ textAlign: 'right', marginLeft: 'auto' }}>From <strong>Pakistan to Wall Street</strong>, we find what&apos;s moving the world before it reaches your feed.</p>
        <div className="scene-rule" />
      </section>

      {/* SCENE 4 */}
      <section className="scene" id="scene-deals" style={{ textAlign: 'center' }}>
        <div className="glow-orb" style={{ width: 600, height: 400, background: '#ffcc00', top: '20%', left: '50%', transform: 'translateX(-50%)' }} />
        <p className="scene-label" style={{ color: '#ffcc00' }}>Best Deals</p>
        <h2 className="deals-tagline" style={{ fontSize: 'clamp(3rem,7vw,7rem)', fontWeight: 900, letterSpacing: -3, lineHeight: 0.95, marginBottom: 40 }}>When Trends Move, <span style={{ background: 'linear-gradient(90deg,#ffcc00,#ff6400)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>So Do Prices</span></h2>
        <p className="scene-body" style={{ textAlign: 'center', margin: '0 auto' }}>The moment a product enters conversation, we surface the best offer for it. <strong>Trend-matched deals.</strong></p>
        <div className="scene-rule" />
      </section>
    </>
  )
}