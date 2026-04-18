'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  const containerRef = useRef(null)

  useEffect(() => {
    // 1. Icons Floating Animation
    const icons = document.querySelectorAll('.float-icon')
    icons.forEach((icon, i) => {
      gsap.to(icon, {
        y: -100,
        opacity: 0,
        scale: 1.5,
        scrollTrigger: {
          trigger: icon,
          start: "top 80%",
          end: "top 20%",
          scrub: 1.5,
        }
      })
    })

    // 2. Heading Parallax
    gsap.to('.hero-title', {
      y: -50,
      opacity: 0.3,
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <main ref={containerRef} className="bg-[#04040c] text-white overflow-x-hidden selection:bg-green-500/30">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#00ffb4_1px,transparent_1px)] [background-size:40px_40px] opacity-10" />
      </div>

      {/* SCENE 1: HERO */}
      <section className="hero-section h-screen flex flex-col justify-center items-center text-center relative z-10 px-6">
        <p className="text-[10px] tracking-[12px] uppercase text-gray-500 mb-8 animate-pulse">Initializing System</p>
        <h1 className="hero-title text-6xl md:text-[10rem] font-black leading-none tracking-tighter italic">
          TRUTH <span className="text-[#00ffb4]">WIREHUB</span>
        </h1>
        <div className="mt-20 float-icon text-3xl text-green-500/20">◈</div>
      </section>

      {/* SCENE 2: TECH (Scroll reveal icon) */}
      <section className="h-screen flex flex-col justify-center items-center relative z-10 px-6 bg-black/20">
        <div className="float-icon text-8xl mb-10 text-blue-500/10">⌬</div>
        <h2 className="text-4xl md:text-7xl font-bold italic mb-6">GLOBAL INTELLIGENCE</h2>
        <p className="text-gray-500 max-w-xl text-center tracking-widest uppercase text-xs">Scanning Markets // Geopolitics // Trends</p>
        <div className="mt-20 float-icon text-4xl text-blue-400/20">⟁</div>
      </section>

      {/* SCENE 3: DEALS */}
      <section className="h-screen flex flex-col justify-center items-center relative z-10 px-6">
        <div className="float-icon text-9xl mb-10 text-pink-500/10">⨳</div>
        <h2 className="text-4xl md:text-7xl font-bold italic mb-6 text-pink-500">PRIME DEALS</h2>
        <p className="text-gray-500 max-w-xl text-center tracking-widest uppercase text-xs">Uncovering Value In Real-Time</p>
      </section>

      {/* SCENE 4: FINAL REVEAL */}
      <section className="h-screen flex flex-col justify-center items-center text-center relative z-10 px-6">
        <div className="absolute w-[500px] h-[500px] bg-green-500/5 blur-[120px] rounded-full" />
        <h2 className="text-5xl md:text-[8rem] font-black italic tracking-tighter leading-none">
          SOMETHING <br /> BIG IS <br /> <span className="text-[#00ffb4]">COMING</span>
        </h2>
        <p className="mt-12 text-green-500 font-bold tracking-[1em] text-[10px] uppercase">Stay Connected</p>
      </section>

      <footer className="py-20 text-center text-[8px] tracking-[2em] text-gray-800 uppercase relative z-10 border-t border-white/5">
        Truth Wirehub &copy; 2026 // Air Control
      </footer>

    </main>
  )