'use client'
import React, { useEffect, useState } from 'react'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="bg-[#04040c] min-h-screen" />

  return (
    <main className="bg-[#04040c] text-white min-h-screen font-sans selection:bg-green-500/30">
      
      {/* SECTION 1: HERO */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-6 border-b border-white/5">
        <p className="text-green-500 tracking-[10px] uppercase text-[10px] mb-8 font-bold animate-pulse">
          Intelligence Redefined
        </p>
        <h1 className="text-6xl md:text-[10rem] font-black leading-[0.9] tracking-tighter italic">
          TRUTH <br /> <span className="text-green-400">WIREHUB</span>
        </h1>
        <p className="mt-10 text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
          Every trend. Every story. Every deal — surfaced from the world's pulse, in real-time, for you.
        </p>
      </section>

      {/* SECTION 2: VISION */}
      <section className="min-h-screen py-32 px-10 md:px-32 flex flex-col justify-center border-b border-white/5 bg-black/20">
        <p className="text-green-400 tracking-widest text-xs mb-4 uppercase font-bold italic">The Vision</p>
        <h2 className="text-5xl md:text-8xl font-black mb-8 italic">THE WORLD'S <br /> <span className="text-gray-800">INTELLIGENCE</span></h2>
        <p className="text-xl md:text-4xl text-gray-400 max-w-4xl leading-tight font-light">
          We scan the horizon so you don't have to. Markets, technology, and culture analyzed and delivered as <span className="text-white font-bold">clean insight</span>. No noise. Just truth.
        </p>
      </section>

      {/* SECTION 3: REVEAL */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-b from-transparent to-green-900/10">
        <h2 className="text-6xl md:text-[10rem] font-black italic tracking-tighter leading-none text-white">
          SOMETHING <br /> BIG IS <br /> <span className="text-green-500">COMING</span>
        </h2>
        <p className="mt-12 text-green-400 font-bold tracking-[1em] text-[10px] uppercase animate-bounce">Wait for it</p>
      </section>

      <footer className="py-20 text-center text-[10px] tracking-[2em] text-gray-800 uppercase">
        Truth Wirehub &copy; 2026
      </footer>

      {/* Background Particles (CSS Only for Safety) */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#00ffb4_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>
    </main>
  )
}