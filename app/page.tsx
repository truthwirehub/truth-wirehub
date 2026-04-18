'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// --- Background Component ---
function BgCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let animId: number
    let scrollY = 0
    let targetScroll = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', () => { targetScroll = window.scrollY })

    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.5,
      vx: (Math.random() - 0.5) * 0.0005, vy: (Math.random() - 0.5) * 0.0005, alpha: Math.random() * 0.5
    }))

    const animate = () => {
      ctx.fillStyle = '#04040c'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      scrollY += (targetScroll - scrollY) * 0.05
      
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
  return <canvas ref={canvasRef} />
}

export default function Home() {
  const subRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    // Reveal everything immediately then animate
    gsap.set(".content-node", { opacity: 1, visibility: "visible" })

    // Scene Reveal
    document.querySelectorAll('.scene').forEach((scene) => {
      gsap.from(scene.querySelectorAll('.content-node'), {
        opacity: 0, y: 30, duration: 1,
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
      setTimeout(type, 1000)
    }
  }, [])

  return (
    <main className="relative bg-[#04040c]">
      <BgCanvas />

      {/* SECTION 1 */}
      <section className="scene text-center px-6">
        <p className="content-node text-green-500 tracking-[10px] uppercase text-[10px] mb-8 font-bold">Intelligence Redefined</p>
        <h1 className="content-node text-6xl md:text-[10rem] font-black leading-[0.9] tracking-tighter italic text-white">
          TRUTH <br /> <span className="text-green-400">WIREHUB</span>
        </h1>
        <p ref={subRef} className="content-node mt-10 text-xl text-gray-400 max-w-2xl mx-auto font-light h-20" />
      </section>

      {/* SECTION 2 */}
      <section className="scene px-10 md:px-32 flex !items-start !text-left">
        <p className="content-node text-green-400 tracking-widest text-xs mb-4 uppercase font-bold italic">The Vision</p>
        <h2 className="content-node text-5xl md:text-8xl font-black mb-8 italic text-white">THE WORLD'S <br /> <span className="text-gray-700">INTELLIGENCE</span></h2>
        <p className="content-node text-xl md:text-3xl text-gray-400 max-w-3xl leading-relaxed">
          We scan the horizon so you don't have to. Markets, technology, and culture analyzed and delivered as <strong>clean insight</strong>. No noise. Just truth.
        </p>
      </section>

      {/* SECTION 3 */}
      <section className="scene px-6 text-center">
        <h2 className="content-node text-6xl md:text-[10rem] font-black italic tracking-tighter text-white">
          SOMETHING <br /> BIG IS <br /> <span className="text-green-500">COMING</span>
        </h2>
        <p className="content-node mt-12 text-green-400 font-bold tracking-[1em] text-[10px] uppercase animate-pulse">Wait for it</p>
      </section>

      <footer className="py-20 text-center text-[10px] tracking-[2em] text-gray-800 uppercase">
        Truth Wirehub &copy; 2026
      </footer>
    </main>
  )
}