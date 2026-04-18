'use client'
import React, { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    // Dynamically loading GSAP to bypass Vercel build errors
    const loadScript = (src: string) => {
      return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = src
        script.async = true
        script.onload = resolve
        document.body.appendChild(script)
      })
    }

    const initAnimations = async () => {
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js')
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js')

      const gsap = (window as any).gsap
      const ScrollTrigger = (window as any).ScrollTrigger

      if (gsap && ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger)

        // CURSOR
        const cur = document.getElementById('cursor')
        const ring = document.getElementById('cursor-ring')
        let mx = 0, my = 0

        document.addEventListener('mousemove', e => {
          mx = e.clientX; my = e.clientY
          gsap.to(cur, { x: mx, y: my, duration: 0.08, ease: 'power2.out' })
          gsap.to(ring, { x: mx, y: my, duration: 0.25, ease: 'power2.out' })
        })

        document.querySelectorAll('a, button, h1, h2').forEach(el => {
          el.addEventListener('mouseenter', () => {
            gsap.to(cur, { width: 6, height: 6, duration: 0.2 })
            gsap.to(ring, { width: 60, height: 60, borderColor: 'rgba(0,255,180,0.7)', duration: 0.3 })
          })
          el.addEventListener('mouseleave', () => {
            gsap.to(cur, { width: 12, height: 12, duration: 0.2 })
            gsap.to(ring, { width: 36, height: 36, borderColor: 'rgba(0,255,180,0.4)', duration: 0.3 })
          })
        })

        // BACKGROUND CANVAS
        const canvas = document.getElementById('bg-canvas') as HTMLCanvasElement
        if (canvas) {
          const ctx = canvas.getContext('2d')
          if (ctx) {
            let w = canvas.width = window.innerWidth
            let h = canvas.height = window.innerHeight
            window.addEventListener('resize', () => {
              w = canvas.width = window.innerWidth
              h = canvas.height = window.innerHeight
            })

            let scrollY = 0
            let targetScrollY = 0
            window.addEventListener('scroll', () => { targetScrollY = window.scrollY })

            const pts = Array.from({ length: 80 }, () => ({
              x: Math.random(), y: Math.random(),
              r: Math.random() * 1.2 + 0.3,
              vx: (Math.random() - 0.5) * 0.0003, vy: (Math.random() - 0.5) * 0.0003,
              alpha: Math.random() * 0.4 + 0.05
            }))

            const orbs = [
              { x: 0.5, y: 0.3, r: 0.4, color: [0, 255, 180], phase: 0 },
              { x: 0.15, y: 0.6, r: 0.35, color: [0, 170, 255], phase: 2 },
              { x: 0.85, y: 0.7, r: 0.38, color: [255, 0, 170], phase: 4 },
              { x: 0.5, y: 1.0, r: 0.4, color: [255, 200, 0], phase: 6 },
            ]

            let t = 0
            const draw = () => {
              scrollY += (targetScrollY - scrollY) * 0.06
              t += 0.008
              ctx.clearRect(0, 0, w, h)
              ctx.fillStyle = '#04040c'
              ctx.fillRect(0, 0, w, h)

              const scrollProgress = scrollY / (document.body.scrollHeight - window.innerHeight || 1)

              orbs.forEach((orb, i) => {
                const ox = orb.x * w + Math.sin(t + orb.phase) * w * 0.08
                const oy = (orb.y + scrollProgress * 0.3 * (i % 2 === 0 ? -1 : 1)) * h + Math.cos(t * 0.7 + orb.phase) * h * 0.05
                const gr = ctx.createRadialGradient(ox, oy, 0, ox, oy, orb.r * w)
                gr.addColorStop(0, `rgba(${orb.color.join(',')},0.08)`)
                gr.addColorStop(1, `rgba(${orb.color.join(',')},0)`)
                ctx.fillStyle = gr
                ctx.fillRect(0, 0, w, h)
              })

              const gridOffset = (scrollY * 0.15) % 80
              ctx.strokeStyle = 'rgba(255,255,255,0.02)'
              ctx.lineWidth = 1
              for (let x = 0; x < w + 80; x += 80) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke() }
              for (let y = -80 + (gridOffset % 80); y < h + 80; y += 80) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke() }

              pts.forEach(p => {
                p.x += p.vx; p.y += p.vy
                if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0
                if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0
                ctx.beginPath()
                ctx.arc(p.x * w, p.y * h - (scrollY * 0.02), p.r, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(0,255,180,${p.alpha})`
                ctx.fill()
              })
              requestAnimationFrame(draw)
            }
            draw()
          }
        }

        // HERO TYPEWRITER
        const sub = document.getElementById('welcome-sub')
        if (sub) {
          const subText = sub.innerText
          sub.innerText = ''
          let si = 0
          const typeIt = () => {
            if (si < subText.length) {
              sub.innerText += subText[si++]
              setTimeout(typeIt, 28)
            }
          }
          setTimeout(typeIt, 1200)
        }

        // GSAP REVEALS
        gsap.from('#eyebrow', { opacity: 0, y: 20, duration: 1.4, delay: 0.3, ease: 'power3.out' })
        gsap.from('.welcome-title', { opacity: 0, y: 60, duration: 1.2, delay: 0.5, ease: 'power4.out' })

        const scenes = document.querySelectorAll('.scene')
        scenes.forEach((scene, i) => {
          if (i === 0) return
          const heading = scene.querySelector('.scene-heading, .deals-tagline')
          const body = scene.querySelector('.scene-body')
          const label = scene.querySelector('.scene-label')
          const bigNum = scene.querySelector('.big-number')

          if (label) gsap.from(label, { opacity: 0, x: -30, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: scene, start: 'top 75%' } })
          if (heading) gsap.from(heading, { opacity: 0, y: 80, duration: 1.2, ease: 'power4.out', scrollTrigger: { trigger: scene, start: 'top 70%' } })
          if (body) gsap.from(body, { opacity: 0, y: 40, duration: 1.2, delay: 0.2, ease: 'power3.out', scrollTrigger: { trigger: scene, start: 'top 68%' } })
          if (bigNum) gsap.from(bigNum, { opacity: 0, scale: 0.8, duration: 1.5, ease: 'power2.out', scrollTrigger: { trigger: scene, start: 'top 80%' } })
        })

        // PARALLAX
        scenes.forEach((scene) => {
          const heading = scene.querySelector('.scene-heading, .deals-tagline, .welcome-title')
          if (heading) gsap.to(heading, { y: -60, ease: 'none', scrollTrigger: { trigger: scene, start: 'top bottom', end: 'bottom top', scrub: 1.5 } })
        })

        document.querySelectorAll('.glow-orb').forEach((orb, i) => {
          gsap.to(orb, { y: i % 2 === 0 ? -120 : 120, ease: 'none', scrollTrigger: { trigger: orb.closest('.scene'), start: 'top bottom', end: 'bottom top', scrub: 2 } })
        })

        document.querySelectorAll('.float-word').forEach((el, i) => {
          gsap.to(el, { y: (i % 2 === 0 ? -80 : 80), ease: 'none', scrollTrigger: { trigger: '#scene-welcome', start: 'top top', end: 'bottom top', scrub: 1 + i * 0.3 } })
        })

        const bgColors = ['#04040c', '#02080f', '#0a0208', '#07060a', '#04040c']
        scenes.forEach((scene, i) => {
          ScrollTrigger.create({
            trigger: scene,
            start: 'top 50%',
            onEnter: () => gsap.to('body', { backgroundColor: bgColors[i % bgColors.length], duration: 1.2 }),
            onLeaveBack: () => gsap.to('body', { backgroundColor: bgColors[Math.max(0, i - 1) % bgColors.length], duration: 1.2 })
          })
        })
      }
    }

    initAnimations()
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        * { margin: 0; padding: 0; box-sizing: border-box; }
        :root { --g: #00ffb4; --p: #ff00aa; --b: #00aaff; }
        html { scroll-behavior: auto; }
        body { background: #04040c; color: #fff; font-family: 'Segoe UI', 'Helvetica Neue', sans-serif; overflow-x: hidden; cursor: none; }
        #cursor { position: fixed; width: 12px; height: 12px; background: var(--g); border-radius: 50%; pointer-events: none; z-index: 9999; transform: translate(-50%,-50%); mix-blend-mode: difference; transition: width .2s, height .2s, background .3s; }
        #cursor-ring { position: fixed; width: 36px; height: 36px; border: 1px solid rgba(0,255,180,0.4); border-radius: 50%; pointer-events: none; z-index: 9998; transform: translate(-50%,-50%); }
        #bg-canvas { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none; }
        .noise { position: fixed; inset: 0; z-index: 1; pointer-events: none; opacity: 0.025; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"); background-size: 200px; }
        .scene { position: relative; z-index: 10; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px 60px; overflow: hidden; }
        #scene-welcome { text-align: center; }
        .welcome-eyebrow { font-size: clamp(0.55rem, 1.2vw, 0.75rem); letter-spacing: 8px; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 32px; }
        .welcome-title { font-size: clamp(4rem, 10vw, 10rem); font-weight: 900; line-height: 0.92; letter-spacing: -4px; background: linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.5) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .welcome-title .line-green { background: linear-gradient(90deg, var(--g), var(--b)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; display: block; }
        .welcome-sub { margin-top: 40px; font-size: clamp(1rem, 2vw, 1.3rem); color: rgba(255,255,255,0.28); letter-spacing: 1px; line-height: 1.7; max-width: 600px; margin-left: auto; margin-right: auto; font-weight: 300; }
        .scroll-indicator { position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 10px; color: rgba(255,255,255,0.18); font-size: 0.6rem; letter-spacing: 4px; text-transform: uppercase; }
        .scroll-line { width: 1px; height: 50px; background: linear-gradient(to bottom, rgba(0,255,180,0.6), transparent); animation: scrollPulse 2s ease-in-out infinite; }
        @keyframes scrollPulse { 0%,100% { opacity: 0.4; transform: scaleY(1); } 50% { opacity: 1; transform: scaleY(1.2); } }
        #scene-tech { text-align: left; padding-left: max(60px, 10vw); }
        .scene-label { font-size: 0.65rem; letter-spacing: 6px; text-transform: uppercase; color: var(--g); margin-bottom: 24px; opacity: 0.7; }
        .scene-heading { font-size: clamp(3rem, 7vw, 7rem); font-weight: 900; line-height: 0.95; letter-spacing: -3px; margin-bottom: 40px; }
        .scene-heading .muted { color: rgba(255,255,255,0.12); display: block; }
        .scene-body { font-size: clamp(1rem, 1.8vw, 1.25rem); color: rgba(255,255,255,0.35); line-height: 1.8; max-width: 560px; font-weight: 300; }
        .scene-body strong { color: rgba(255,255,255,0.75); font-weight: 600; }
        .big-number { position: absolute; right: 8vw; font-size: clamp(8rem, 18vw, 18rem); font-weight: 900; color: rgba(255,255,255,0.025); letter-spacing: -10px; pointer-events: none; line-height: 1; top: 50%; transform: translateY(-50%); }
        #scene-news { text-align: right; align-items: flex-end; padding-right: max(60px, 10vw); }
        #scene-deals { text-align: center; }
        .deals-tagline { font-size: clamp(3rem, 7vw, 7rem); font-weight: 900; letter-spacing: -3px; line-height: 0.95; margin-bottom: 40px; }
        .deals-tagline em { font-style: normal; background: linear-gradient(90deg, #ffcc00, #ff6400); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .scene-rule { position: absolute; bottom: 0; left: 10vw; right: 10vw; height: 1px; background: linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent); }
        .glow-orb { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; opacity: 0.12; }
        .float-word { position: absolute; font-size: clamp(0.55rem, 1vw, 0.7rem); letter-spacing: 3px; text-transform: uppercase; color: rgba(255,255,255,0.08); font-weight: 700; pointer-events: none; }
      `}} />

      <canvas id="bg-canvas"></canvas>
      <div className="noise"></div>
      <div id="cursor"></div>
      <div id="cursor-ring"></div>

      {/* SCENE 1 — WELCOME */}
      <section className="scene" id="scene-welcome">
        <div className="glow-orb" style={{ width: '600px', height: '600px', background: 'var(--g)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}></div>
        <div className="float-word" style={{ top: '18%', left: '6%' }}>Intelligence</div>
        <div className="float-word" style={{ top: '22%', right: '8%' }}>Realtime</div>
        <div className="float-word" style={{ bottom: '28%', left: '10%' }}>Trends</div>
        <div className="float-word" style={{ bottom: '22%', right: '6%' }}>Global</div>

        <p className="welcome-eyebrow" id="eyebrow">The world in one place</p>

        <h1 className="welcome-title">
          TRUTH
          <span className="line-green">WIREHUB</span>
        </h1>

        <p className="welcome-sub" id="welcome-sub">
          Every trend. Every story. Every deal — extracted from the global pulse, in real time, just for you.
        </p>

        <div className="scroll-indicator">
          <div className="scroll-line"></div>
          scroll
        </div>
        <div className="scene-rule"></div>
      </section>

      {/* SCENE 2 — TECH */}
      <section className="scene" id="scene-tech">
        <div className="glow-orb" style={{ width: '500px', height: '500px', background: 'var(--b)', top: '30%', left: '-100px' }}></div>
        <div className="big-number">02</div>
        <p className="scene-label">Technology</p>
        <h2 className="scene-heading">
          The World's
          <span className="muted">Intelligence</span>
          Engine
        </h2>
        <p className="scene-body">
          We scan the internet so you don't have to. <strong>Markets, geopolitics, sports, science, culture</strong> — all analyzed, filtered and delivered as clean, actionable intelligence. No noise. No delay.
        </p>
        <div className="scene-rule"></div>
      </section>

      {/* SCENE 3 — NEWS */}
      <section className="scene" id="scene-news">
        <div className="glow-orb" style={{ width: '500px', height: '500px', background: 'var(--p)', bottom: '10%', right: '-80px' }}></div>
        <div className="big-number" style={{ left: '8vw', right: 'auto' }}>03</div>
        <p className="scene-label" style={{ color: 'var(--p)' }}>Breaking News</p>
        <h2 className="scene-heading" style={{ textAlign: 'right' }}>
          Stories That
          <span className="muted" style={{ textAlign: 'right' }}>Truly</span>
          Matter
        </h2>
        <p className="scene-body" style={{ textAlign: 'right', marginLeft: 'auto' }}>
          From <strong>Pakistan to Wall Street</strong>, from underground tech labs to viral culture shifts — we find what's moving the world before it reaches your feed.
        </p>
        <div className="scene-rule"></div>
      </section>

      {/* SCENE 4 — DEALS */}
      <section className="scene" id="scene-deals">
        <div className="glow-orb" style={{ width: '600px', height: '400px', background: '#ffcc00', top: '20%', left: '50%', transform: 'translateX(-50%)' }}></div>
        <div className="big-number" style={{ opacity: 0.02 }}>04</div>
        <p className="scene-label" style={{ color: '#ffcc00' }}>Best Deals</p>
        <h2 className="deals-tagline">
          When Trends
          <br />Move, <em>So Do Prices</em>
        </h2>
        <p className="scene-body" style={{ textAlign: 'center', margin: '0 auto' }}>
          The moment a product, app, or service enters the world's conversation, we surface the best offer for it. <strong>Trend-matched deals</strong>, curated in real time.
        </p>
        <div className="scene-rule"></div>
      </section>

      {/* SCENE 5 — FINALE (NEW) */}
      <section className="scene" id="scene-finale" style={{ textAlign: 'center', minHeight: '100vh', justifyContent: 'center' }}>
        <div className="glow-orb" style={{ width: '600px', height: '600px', background: 'var(--g)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.08 }}></div>
        <h2 className="scene-heading" style={{ fontSize: 'clamp(4rem, 12vw, 12rem)', lineHeight: '0.85', margin: '0' }}>
          SOMETHING
          <span className="muted" style={{ display: 'block', fontSize: 'clamp(3rem, 8vw, 8rem)', marginTop: '20px' }}>BIG IS</span>
          <span style={{ color: 'var(--g)' }}>COMING</span>
        </h2>
        <p className="scene-body" style={{ color: 'var(--g)', letterSpacing: '12px', textTransform: 'uppercase', fontSize: '0.75rem', marginTop: '40px', fontWeight: 'bold' }}>
          Stay on the wire // 2026
        </p>
      </section>

    </>
  )
}
// END OF FILE