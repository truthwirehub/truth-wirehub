'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

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
    return () => {
        cancelAnimationFrame(animId)
        window.removeEventListener('resize', resize)
    }
  }, [])
  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
}

export default function Home() {
  const subRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    // Reveal Animations with Force Visibility
    gsap.to('.welcome-title', { opacity: 1, y: 0, duration: 1.5, delay: 0.5, ease: 'power4.out' })
    gsap.to('.welcome-eyebrow', { opacity: 0.5, y: 0, duration: 1.2, delay: 0.2 })

    document.querySelectorAll('.scene').forEach((scene) => {
      gsap.from(scene.querySelectorAll('h2, p, .big-num'), {
        opacity: 0, y: 50, stagger: 0.2, duration: 1,
        scrollTrigger: { trigger: scene, start: "top 80%" }
      })
    })

    const text = "Every trend. Every story. Every deal — surfaced from the world's pulse, in real-time, for you."
    if (subRef.current) {
      subRef.current.innerText = ""
      let i = 0
      const type = () => {
        if (i < text.length) { subRef.current!.innerText += text[i++]; setTimeout(type, 30) }
      }
      setTimeout(type, 1500)
    }
  }, [])

  return (
    <main className="bg-[#04040c] text-white min-h-screen overflow-x-hidden">
      <BgCanvas />

      {/* SCENE 1 */}
      <section className="scene relative z-10 h-screen flex flex-col justify-center items-center text-center px-6">
        <p className="welcome-eyebrow opacity-0 translate-y-4 text-[10px] tracking-[10px] uppercase text-gray-500 mb-8">Intelligence Redefined</p>
        <h1 className="welcome-title opacity-0 translate-y-12 text-7xl md:text-[10rem] font-black leading-[0.9] tracking-tighter italic text-white">
          TRUTH <br /> <span className="text-green-500">WIREHUB</span>
        </h1>
        <p ref={subRef} className="mt-10 text-lg md:text-xl text-gray-400 max-w-xl font-light h-20" />
      </section>

      {/* SCENE 2 */}
      <section className="scene relative z-10 h-screen flex flex-col justify-center items-start px-10 md:px-32 bg-[#02080f]/40">
        <div className="big-num absolute right-20 text-[20rem] font-black opacity-[0.03] pointer-events-none">02</div>
        <p className="text-green-500 tracking-widest text-xs mb-4 uppercase font-bold italic">Phase: Discovery</p>
        <h2 className="text-5xl md:text-8xl font-black mb-8 italic text-white">THE WORLD'S <br /> <span className="text-gray-800">INTELLIGENCE</span></h2>
        <p className="text-xl md:text-3xl text-gray-400 max-w-3xl leading-relaxed">
          We scan the horizon so you don't have to. Markets, tech, and culture delivered as clean insight.
        </p>
      </section>

      {/* SCENE 5 - SOMETHING BIG */}
      <section className="scene relative z-10 h-screen flex flex-col justify-center items-center text-center px-6">
        <h2 className="text-6xl md:text-[11rem] font-black italic tracking-tighter text-white opacity-80 leading-none">
          SOMETHING <br /> BIG IS <br /> COMING
        </h2>
        <p className="mt-12 text-green-500 font-bold tracking-[1em] text-[10px] uppercase animate-pulse">Wait for it</p>
      </section>

      <footer className="py-20 text-center text-[8px] tracking-[2.5em] text-gray-700 uppercase relative z-10">
        Truth Wirehub © 2026
      </footer>
    </main>
  )
}