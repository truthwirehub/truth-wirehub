'use client'
import React from 'react'

export default function Home() {
  return (
    <main className="bg-[#04040c] text-white min-h-screen font-sans relative">
      
      {/* 1. BACKGROUND (Pure CSS - No JS) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Sitaray / Particles */}
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#00ffb4_1px,transparent_1px)] [background-size:32px_32px]" />
        {/* Glow Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/10 blur-[120px] rounded-full" />
      </div>

      {/* 2. CONTENT LAYER */}
      <div className="relative z-10 w-full">
        
        {/* SCENE 1: WELCOME */}
        <section className="h-screen flex flex-col justify-center items-center text-center px-6">
          <p className="text-green-500 tracking-[10px] uppercase text-[10px] mb-8 font-bold">
            Intelligence Redefined
          </p>
          <h1 className="text-6xl md:text-[10rem] font-black leading-[0.9] tracking-tighter italic text-white">
            TRUTH <br /> <span className="text-green-400">WIREHUB</span>
          </h1>
          <p className="mt-10 text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
            Every trend. Every story. Every deal — surfaced from the world's pulse, in real-time, for you.
          </p>
        </section>

        {/* SCENE 2: VISION */}
        <section className="min-h-screen py-32 px-10 md:px-32 flex flex-col justify-center bg-black/40">
          <p className="text-green-400 tracking-widest text-xs mb-4 uppercase font-bold italic">The Vision</p>
          <h2 className="text-5xl md:text-8xl font-black mb-8 italic text-white">
            THE WORLD'S <br /> <span className="text-gray-800">INTELLIGENCE</span>
          </h2>
          <p className="text-xl md:text-4xl text-gray-300 max-w-4xl leading-tight font-light">
            We scan the horizon so you don't have to. Markets, technology, and culture analyzed and delivered as <span className="text-white font-bold">clean insight</span>.
          </p>
        </section>

        {/* SCENE 3: SOMETHING BIG */}
        <section className="h-screen flex flex-col justify-center items-center text-center px-6">
          <h2 className="text-6xl md:text-[9rem] font-black italic tracking-tighter leading-none text-white">
            SOMETHING <br /> BIG IS <br /> <span className="text-green-500">COMING</span>
          </h2>
          <p className="mt-12 text-green-400 font-bold tracking-[1em] text-[10px] uppercase animate-bounce">Wait for it</p>
        </section>

        <footer className="py-20 text-center text-[10px] tracking-[2em] text-gray-800 uppercase border-t border-white/5">
          Truth Wirehub &copy; 2026
        </footer>

      </div>
    </main>
  )
}