'use client'
import React, { useEffect, useRef, useState } from 'react'

interface FloatingStickerProps {
  emoji: string;
  style: React.CSSProperties;
  visible: boolean;
}

function FloatingSticker({ emoji, style, visible }: FloatingStickerProps) {
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

function useScrollReveal() {
  const ref = useRef<any>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return [ref, visible] as [any, boolean]
}

export default function Home() {
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
    <main className="bg-[#04040c] text-white min-h-screen font-sans selection:bg-[#00ffb4]/30 overflow-x-hidden scroll-smooth">

      {/* ATMOSPHERIC BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#00ffb4_1px,transparent_1px)] [background-size:40px_40px] opacity-10" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00ffb4]/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full animate-pulse [animation-delay:2s]" />
      </div>

      <div className="relative z-10 w-full">

        {/* SECTION 1: THE NEXUS (No Animation on Text - Always Visible) */}
        <section className="h-screen flex flex-col justify-center items-center text-center px-6 relative">
          {stickers1.map((s, i) => (
            <FloatingSticker key={i} emoji={s.emoji} style={s.style} visible={true} />
          ))}

          <div className="mb-12">
            <p className="text-[10px] tracking-[15px] uppercase text-[#00ffb4] font-bold animate-pulse">
              System Online // 2026
            </p>
          </div>

          <h1 className="text-7xl md:text-[10rem] font-black leading-none tracking-tighter italic text-white drop-shadow-[0_0_30px_rgba(0,255,180,0.3)]">
            TRUTH <br />
            <span className="text-[#00ffb4]">
              WIREHUB
            </span>
          </h1>

          <p className="mt-12 text-gray-300 tracking-[0.5em] uppercase text-[10px] font-medium">
            Intelligence Nexus // Global Data Flow
          </p>

          <div className="mt-20 animate-bounce text-[#00ffb4] text-4xl">↓</div>
        </section>

        {/* SECTION 2: THE ENGINE */}
        <section ref={ref2} className="min-h-screen flex flex-col justify-center items-center px-6 bg-black/40 backdrop-blur-sm border-y border-white/5 relative">
          {stickers2.map((s, i) => (
            <FloatingSticker key={i} emoji={s.emoji} style={s.style} visible={vis2} />
          ))}
          <div className={`mb-16 text-9xl text-[#00ffb4]/20 animate-spin [animation-duration:15s] transition-all duration-1000 ${vis2 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>⌬</div>
          <h2 className={`text-5xl md:text-8xl font-black italic text-center mb-8 text-white transition-all duration-1000 delay-200 ${vis2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}>
            QUANTUM <br /><span className="text-gray-500">INTELLIGENCE</span>
          </h2>
          <p className={