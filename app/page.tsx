'use client'
import React from 'react'

export default function Home() {
  return (
    <main className="bg-[#04040c] text-white min-h-screen font-sans selection:bg-green-500/30 overflow-x-hidden scroll-smooth">
      
      {/* 1. ATMOSPHERIC BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#00ffb4_1px,transparent_1px)] [background-size:40px_40px] opacity-10" />
        {/* Moving Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-green-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full animate-pulse [animation-delay:2s]" />
      </div>

      {/* 2. CINEMATIC CONTENT */}
      <div className="relative z-10 w-full">
        
        {/* SECTION 1: THE NEXUS */}
        <section className="h-screen flex flex-col justify-center items-center text-center px-6">
          <div className="mb-12 space-y-4">
            <p className="text-[10px] tracking-[15px] uppercase text-green-500 font-bold animate-pulse">
              System Online // 2026
            </p>
          </div>
          <h1 className="text-7xl md:text-[12rem] font-black leading-none tracking-tighter italic text-white drop-shadow-[0_0_50px_rgba(0,255,180,0.15)]">
            TRUTH <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">WIREHUB</span>
          </h1>
          <p className="mt-12 text-gray-500 tracking-[0.5em] uppercase text-[10px] font-medium">
            Intelligence Nexus // Global Data Flow
          </p>
          <div className="mt-20 animate-bounce text-green-500/30 text-4xl">↓</div>
        </section>

        {/* SECTION 2: THE ENGINE (Floating Icon) */}
        <section className="min-h-screen flex flex-col justify-center items-center px-6 bg-black/40 backdrop-blur-sm border-y border-white/5">
          <div className="mb-16 text-9xl text-green-500/10 animate-spin [animation-duration:15s]">⌬</div>
          <h2 className="text-5xl md:text-8xl font-black italic text-center mb-8">
            QUANTUM <br /> <span className="text-gray-800">INTELLIGENCE</span>
          </h2>
          <p className="text-xl md:text-3xl text-gray-400 max-w-4xl text-center font-light leading-relaxed">
            Scanning the internet's pulse. We distill raw data into <span className="text-white font-semibold underline decoration-green-500">Pure Intelligence</span>. Markets, Culture, and Power—unfiltered.
          </p>
        </section>

        {/* SECTION 3: OPPORTUNITY */}
        <section className="min-h-screen flex flex-col justify-center items-center px-6">
          <div className="mb-16 text-9xl text-blue-500/10 animate-pulse">⨳</div>
          <h2 className="text-5xl md:text-8xl font-black italic text-center mb-8 text-blue-400">
            ELITE <br /> DISCOVERY
          </h2>
          <p className="text-xl md:text-3xl text-gray-400 max-w-4xl text-center font-light">
            When the world moves, we find the <span className="text-white">Value</span>. Real-time trends matched with premium opportunities.
          </p>
        </section>

        {/* SECTION 4: THE BIG REVEAL */}
        <section className="h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-b from-transparent to-green-950/20">
          <h2 className="text-7xl md:text-[11rem] font-black italic tracking-tighter leading-none text-white">
            SOMETHING <br /> BIG IS <br /> <span className="text-green-500">COMING</span>
          </h2>
          <div className="mt-16 space-y-4">
            <p className="text-green-500 font-bold tracking-[1.5em] text-[10px] uppercase">Wait for the signal</p>
            <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-green-500 to-transparent mx-auto" />
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-20 text-center border-t border-white/5">
          <p className="text-[10px] tracking-[2em] text-gray-800 uppercase">
            Truth Wirehub &copy; 202