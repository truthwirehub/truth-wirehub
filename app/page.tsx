'use client'
import React, { useEffect, useRef, useState } from 'react'

// Floating sticker component
function FloatingSticker({ emoji, style, visible }) {
  return (
    <span
      className={`absolute text-4xl md:text-6xl select-none pointer-events-none transition-all duration-700 ${
        visible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-8'
      }`}
      style={style}
    >
      {emoji}
    </span>
  )
}

// Scroll-reveal section hook
function useScrollReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return [ref, visible]
}

export default function Home() {
  const [ref1, vis1] = useScrollReveal()
  const [ref2, vis2] = useScrollReveal()
  const [ref3, vis3] = useScrollReveal()
  const [ref4, vis4] = useScrollReveal()

  const stickers1 = [
    { emoji: '🛰️', style: { top: '10%', left: '5%' } },
    { emoji: '⚡', style: { top: '20%', right: '8%' } },
    { emoji: '🌐', style: { bottom: '15%', left: '10%' } },
    { emoji: '🔮', style: { bottom: '25%', right: '6%' } },
    { emoji: '✦',  style: { top: '40%', left: '3%', fontSize: '3rem', color: '#00ffb4' } },
    { emoji: '✦',  style: { top: '60%', right: '4%', fontSize: '2rem', color: '#3b82f6' } },
  ]

  const stickers2 = [
    { emoji: '📡', style: { top: '10%', left: '8%' } },
    { emoji: '🧠', style: { top: '15%', right: '10%' } },
    { emoji: '💹', style: { bottom: '20%', left: '6%' } },
    { emoji: '🔬', style: { bottom: '10%', right: '8%' } },
    { emoji: '⬡',  style: { top: '50%', left: '2%', fontSize: '3rem', color: '#00ffb4' } },
  ]

  const stickers3 = [
    { emoji: '💎', style: { top: '10%', left: '7%' } },
    { emoji: '🚀', style: { top: '20%', right: '9%' } },
    { emoji: '🌊', style: { bottom: '15%', left: '5%' } },
    { emoji: '🎯', style: { bottom: '20%', right: '7%' } },
    { emoji: '★',  style: { top: '45%', right: '3%', fontSize: '2.5rem', color: '#60a5fa' } },
  ]

  const stickers4 = [
    { emoji: '⚠️', style: { top: '12%', left: '6%' } },
    { emoji: '🔐', style: { top: '18%', right: '8%' } },
    { emoji: '📶', style: { bottom: '18%', left: '9%' } },
    { emoji: '🛡️', style: { bottom: '12%', right: '6%' } },
    { emoji: '◈',  style: { top: '55%', left: '3%', fontSize: '2.5rem', color: '#22c55e' } },
  ]

  return (
    <main className="bg-[#04040c] text-white min-h-screen font-sans selection:bg-green-500/30 overflow-x-hidden scroll-smooth">

      {/* ATMOSPHERIC BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#00ffb4_1px,transparent_1px)] [background-size:40px_40px] opacity-10" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-green-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full animate-pulse [animation-delay:2s]" />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-purple-500/5 blur-[100px] rounded-full animate-pulse [animation-delay:4s]" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 w-full">

        {/* SECTION 1: THE NEXUS */}
        <section
          ref={ref1}
          className="h-screen flex flex-col justify-center items-center text-center px-6 relative"
        >
          {stickers1.map((s, i) => (
            <FloatingSticker key={i} emoji={s.emoji} style={s.style} visible={vis1} />
          ))}

          <div className="mb-12">
            <p className="text-[10px] tracking-[15px] uppercase text-green-500 font-bold animate-pulse">
              System Online // 2026
            </p>
          </div>

          <h1
            className={`text-7xl md:text-[10rem] font-black leading-none tracking-tighter italic text-white drop-shadow-[0_0_50px_rgba(0,255,180,0.15)] transition-all duration-1000 ${
              vis1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
            }`}
          >
            TRUTH <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              WIREHUB
            </span>
          </h1>

          <p
            className={`mt-12 text-gray-500 tracking-[0.5em] uppercase text-[10px] font-medium transition-all duration-1000 delay-300 ${
              vis1 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Intelligence Nexus // Global Data Flow
          </p>

          <div className="mt-20 animate-bounce text-green-500/30 text-4xl">↓</div>
        </section>

        {/* SECTION 2: THE ENGINE */}
        <section
          ref={ref2}
          className="min-h-screen flex flex-col justify-center items-center px-6 bg-black/40 backdrop-blur-sm border-y border-white/5 relative"
        >
          {stickers2.map((s, i) => (
            <FloatingSticker key={i} emoji={s.emoji} style={s.style} visible={vis2} />
          ))}

          <div
            className={`mb-16 text-9xl text-green-500/20 animate-spin [animation-duration:15s] transition-all duration-1000 ${
              vis2 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
          >
            ⌬
          </div>

          <h2
            className={`text-5xl md:text-8xl font-black italic text-center mb-8 transition-all duration-1000 delay-200 ${
              vis2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'
            }`}
          >
            QUANTUM <br />
            <span className="text-gray-700">INTELLIGENCE</span>
          </h2>

          <p
            className={`text-xl md:text-2xl text-gray-400 max-w-4xl text-center font-light leading-relaxed transition-all duration-1000 delay-400 ${
              vis2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Scanning the internet&apos;s pulse. We distill raw data into{' '}
            <span className="text-white font-semibold underline decoration-green-500">
              Pure Intelligence
            </span>
            . Markets, Culture, and Power—unfiltered.
          </p>
        </section>

        {/* SECTION 3: OPPORTUNITY */}
        <section
          ref={ref3}
          className="min-h-screen flex flex-col justify-center items-center px-6 relative"
        >
          {stickers3.map((s, i) => (
            <FloatingSticker key={i} emoji={s.emoji} style={s.style} visible={vis3} />
          ))}

          <div
            className={`mb-16 text-9xl text-blue-500/20 animate-pulse transition-all duration-1000 ${
              vis3 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
          >
            ⨳
          </div>

          <h2
            className={`text-5xl md:text-8xl font-black italic text-center mb-8 text-blue-400 transition-all duration-1000 delay-200 ${
              vis3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'
            }`}
          >
            ELITE <br /> DISCOVERY
          </h2>

          <p
            className={`text-xl md:text-2xl text-gray-400 max-w-4xl text-center font-light transition-all duration-1000 delay-400 ${
              vis3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            When the world moves, we find the{' '}
            <span className="text-white">Value</span>. Real-time trends matched
            with premium opportunities.
          </p>
        </section>

        {/* SECTION 4: THE BIG REVEAL */}
        <section
          ref={ref4}
          className="h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-b from-transparent to-green-950/20 relative"
        >
          {stickers4.map((s, i) => (
            <FloatingSticker key={i} emoji={s.emoji} style={s.style} visible={vis4} />
          ))}

          <h2
            className={`text-7xl md:text-[9rem] font-black italic tracking-tighter leading-none text-white transition-all duration-1000 ${
              vis4 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            SOMETHING <br /> BIG IS <br />
            <span className="text-green-500">COMING</span>
          </h2>

          <div
            className={`mt-16 space-y-4 transition-all duration-1000 delay-500 ${
              vis4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-green-500 font-bold tracking-[1.5em] text-[10px] uppercase animate-pulse">
              Wait for the signal
            </p>
            <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-green-500 to-transparent mx-auto" />
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-20 text-center border-t border-white/5">
          <p className="text-[10px] tracking-[2em] text-gray-800 uppercase">
            Truth Wirehub &copy; 2026 // Authorized Access Only
          </p>
        </footer>

      </div>
    </main>
  )
}
