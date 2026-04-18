'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// --- Background Component ---
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
      r: Math.random() * 1.5,
      vx: (Math.random() - 0.5) * 0.0005, vy: (Math.random() - 0.5) * 0.0005, alpha: Math.random() * 0.5
    }))

    const animate = () => {
      if (!ctx) return
      ctx.fillStyle = '#04040c'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      scrollY += (targetScroll - scrollY) * 0.06
      t += 0.008
      
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0
        ctx.beginPath()
        ctx.arc(p.x * canvas.width, p.y * canvas.height, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,255,180,${p.alpha})`
        ctx.fill()
      })
      animId = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(animId)
  }, [])
  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
}

export default function Home() {
  const subRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    // Reveal Animations
    gsap.from('.welcome-title', { opacity: 0, y: 60, duration: 1.5, ease: 'power4.out' })
    
    // Scene Reveal
    document.querySelectorAll('.scene').forEach((scene) => {
      gsap.from(scene.querySelectorAll('h1, h2, p, .big-number'), {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: scene,
          start: "top 70%",
        }
      })
    });

    // Typewriter
    const text = "Every trend. Every story. Every deal — surfaced from the world's pulse, in real time, for you."
    if (subRef.current) {
      subRef.current.innerText = ''
      let i = 0
      const type = () => {
        if (i < text.length) { subRef.current!.innerText += text[i++]; setTimeout(type, 30) }
      }
      setTimeout(type, 1000)
    }
  }, [])

  return (
    <main className="bg-[#04040c] text-white overflow-x-hidden min-h-screen">
      <BgCanvas />

      {/* SCENE 1 */}
      <section className="scene relative z-10 h-screen flex flex-col justify-center items-center text-center px-6">
        <p className="welcome-eyebrow text-gray-500 tracking-[8px] uppercase text-[10px] mb-8">The world in one place</p>
        <h1 className="welcome-title text-7xl md:text-[10rem] font-black leading-[0.9] tracking-tighter italic text-white">
          TRUTH <br /> 
          <span className="text-green-500">WIREHUB</span>
        </h1>
        <p ref={subRef} className="welcome-sub mt-10 text-xl text-gray-400 max-w-xl font-light leading-relaxed h-20" />
      </section>

      {/* SCENE 2 */}
      <section className="scene relative z-10 h-screen flex flex-col justify-center items-start px-10 md:px-32 bg-[#02080f]">
        <div className="big-number absolute right-10 text-[20rem] font-black opacity-[0.03]">02</div>
        <p className="scene-label text-green-500 tracking-widest text-xs mb-4 uppercase font-bold">Technology</p>
        <h2 className="scene-heading text-5xl md:text-8xl font-black mb-8 italic text-white">
          THE WORLD&apos;S <br /> <span className="text-gray-700">INTELLIGENCE</span>
        </h2>
        <p className="scene-body text-xl md:text-3xl text-gray-400 max-w-3xl font-light">
          We scan the internet so you don&apos;t have to. Markets, geopolitics, and culture delivered as clean, actionable intelligence.
        </p>
      </section>

      {/* SCENE 3 */}
      <section className="scene relative z-10 h-screen flex flex-col justify-center items-end text-right px-10 md:px-32 bg-[#0a0208]">
        <div className="big-number absolute left-10 text-[20rem] font-black opacity-[0.03]">03</div>
        <p className="scene-label text-pink-500 tracking-widest text-xs mb-4 uppercase font-bold">Breaking News</p>
        <h2 className="scene-heading text-5xl md:text-8xl font-black mb-8 italic text-white">
          STORIES THAT <br /> <span className="text-gray-700">ACTUALLY MATTER</span>
        </h2>
        <p className="scene-body text-xl md:text-3xl text-gray-400 max-w-3xl font-light">
          From Pakistan to Wall Street, we find what&apos;s moving the world before it reaches your feed.
        </p>
      </section>

      <footer className="py-20 text-center text-[10px] tracking-[2em] text-gray-800 uppercase border-t border-white/5 relative z-10">
        Truth Wirehub 2026
      </footer>
    </main>
  )
}