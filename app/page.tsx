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
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.section').forEach((section: any) => {
        gsap.from(section, {
          opacity: 0, y: 100, duration: 1,
          scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none reverse" }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-black text-white min-h-screen font-mono overflow-x-hidden">
      {/* Slide 1 */}
      <section className="section h-screen flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter italic text-green-500">TRUTH WIREHUB</h1>
        <p className="text-gray-500 tracking-[0.5em] text-xs mt-4 uppercase">Automated Data Ecosystem</p>
      </section>

      {/* Slide 2 */}
      <section className="section min-h-screen py-20 flex flex-col items-center justify-center bg-[#050505]">
        <h2 className="text-4xl font-bold mb-12 text-white border-b border-green-500">OUR VISION</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl px-6">
          <div className="p-10 border border-white/5 bg-white/5 rounded-2xl hover:border-green-500/40 transition-all">
            <h3 className="text-xl font-bold text-green-400 mb-2">TECH & AI</h3>
            <p className="text-gray-500 text-sm">Intelligence at the speed of light.</p>
          </div>
          <div className="p-10 border border-white/5 bg-white/5 rounded-2xl hover:border-blue-500/40 transition-all">
            <h3 className="text-xl font-bold text-blue-400 mb-2">CRYPTO & FINANCE</h3>
            <p className="text-gray-500 text-sm">Global markets, unfiltered.</p>
          </div>
        </div>
      </section>

      {/* Slide 3 */}
      <section className="section h-screen flex flex-col justify-center items-center">
        <div className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-800 animate-pulse italic">
          SOMETHING BIG <br /> IS COMING
        </div>
        <p className="mt-8 text-green-500 font-bold tracking-[1em] text-[10px] uppercase">Wait For Initialization</p>
      </section>

      <footer className="py-10 text-center text-[8px] text-gray-800 tracking-[1em] uppercase">
        TRUTH WIREHUB &copy; 2026
      </footer>
    </main>
  );
}