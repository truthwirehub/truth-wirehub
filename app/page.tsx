"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Glow Cursor Logic
    const cursor = document.createElement('div');
    cursor.style.cssText = `position:fixed; width:20px; height:20px; border-radius:50%; background:radial-gradient(circle, rgba(0,255,180,0.8), transparent); pointer-events:none; z-index:9999; mix-blend-mode:screen;`;
    document.body.appendChild(cursor);

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
    };
    window.addEventListener('mousemove', moveCursor);

    // Reveal Animations
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.section').forEach((section: any) => {
        gsap.from(section, {
          opacity: 0, y: 100, duration: 1.2,
          scrollTrigger: { trigger: section, start: "top 85%" }
        });
      });
    }, containerRef);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.body.removeChild(cursor);
      ctx.revert();
    };
  }, []);

  return (
    <main ref={containerRef} className="bg-[#05050f] text-white min-h-screen font-sans selection:bg-green-500/30 overflow-x-hidden">
      
      {/* 1. TICKER BAR */}
      <div className="fixed top-0 w-full bg-green-500/10 py-2 border-b border-green-500/20 z-50 overflow-hidden backdrop-blur-md">
        <div className="flex animate-pulse whitespace-nowrap text-[10px] tracking-widest text-green-400 px-4">
          🚀 BTC $67,420 (+4.2%) • 📈 ETH $3,210 (+2.1%) • 🔥 PAKISTAN CRYPTO TREND RISING • ⚡ AI TOOLS LIVE • 💰 BINANCE VOLUME: $28B
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <section className="section h-screen flex flex-col justify-center items-center text-center px-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900/10 via-transparent to-transparent"></div>
        <p className="text-green-500 font-mono tracking-[0.5em] mb-4 text-xs uppercase">Powered by 60 Live APIs</p>
        <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter italic italic">
          TRUTH <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">WIREHUB</span>
        </h1>
        <div className="flex gap-10 mt-10">
          <div className="text-center"><div className="text-3xl font-bold text-green-400">60+</div><div className="text-[10px] text-gray-500 uppercase">Live APIs</div></div>
          <div className="text-center"><div className="text-3xl font-bold text-green-400">847</div><div className="text-[10px] text-gray-500 uppercase">Stories/Day</div></div>
          <div className="text-center"><div className="text-3xl font-bold text-green-400">24h</div><div className="text-[10px] text-gray-500 uppercase">Data Flow</div></div>
        </div>
      </section>

      {/* 3. MEGA DATA HUB GRID */}
      <section className="section min-h-screen py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-green-500 text-xs tracking-widest uppercase mb-2">Live Market Data</p>
          <h2 className="text-4xl md:text-6xl font-black">MEGA <span className="text-gray-700">DATA</span> HUB</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { t: "BITCOIN", v: "$67,420", c: "+4.2%", icon: "₿" },
            { t: "ETHEREUM", v: "$3,210", c: "+2.1%", icon: "Ξ" },
            { t: "SOLANA", v: "$145", c: "+6.8%", icon: "◎" },
            { t: "GOOGLE TRENDS", v: "#1 AI", c: "HOT", icon: "📈" },
            { t: "WEATHER API", v: "32°C", c: "LIVE", icon: "🌤️" },
            { t: "SPORTS FEED", v: "PSL LIVE", c: "NEW", icon: "⚽" }
          ].map((card, i) => (
            <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-green-500/40 transition-all group relative overflow-hidden">
              <div className="text-4xl mb-4">{card.icon}</div>
              <div className="absolute top-6 right-6 text-[10px] font-bold bg-green-500/20 text-green-400 px-2 py-1 rounded-full">{card.c}</div>
              <h3 className="text-gray-400 text-xs font-bold tracking-widest">{card.t}</h3>
              <div className="text-3xl font-black mt-2 group-hover:text-green-400 transition-colors">{card.v}</div>
              <div className="mt-6 h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-2/3 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PLATFORMS SECTION */}
      <section className="section py-20 bg-black/40">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12">MULTI-PLATFORM <span className="text-gray-600">PUBLISHING</span></h2>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-bold uppercase tracking-[0.3em]">
            <span className="px-6 py-3 border border-white/10 rounded-full bg-white/5">𝕏 Twitter</span>
            <span className="px-6 py-3 border border-white/10 rounded-full bg-white/5">📸 Instagram</span>
            <span className="px-6 py-3 border border-white/10 rounded-full bg-white/5">▶️ YouTube</span>
            <span className="px-6 py-3 border border-white/10 rounded-full bg-white/5">🤖 n8n Automation</span>
          </div>
        </div>
      </section>

      {/* 5. FOOTER & FINAL CALL */}
      <section className="section h-screen flex flex-col justify-center items-center text-center">
        <h2 className="text-5xl md:text-8xl font-black italic text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-900 animate-pulse">
          SOMETHING BIG <br /> IS COMING
        </h2>
        <p className="mt-10 text-green-500 font-mono tracking-[1em] text-[10px]">Truth Wirehub © 2025</p>
      </section>

    </main>
  );
}