'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BgCanvas from '@/components/BgCanvas'

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  const subRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    // Typewriter Effect
    const text = "Every trend. Every story. Every deal — surfaced from the world's pulse, in real-time, for you."
    if (subRef.current) {
      subRef.current.innerText = ""
      let i = 0
      const type = () => {
        if (i < text.length) { 
            subRef.current!.innerText += text[i++]; 
            setTimeout(type, 30) 
        }
      }
      setTimeout(type, 1000)
    }

    // Smooth Scroll Reveals
    document.querySelectorAll('.scene').forEach((scene) => {
      gsap.from(scene.querySelectorAll('h2, p, .big-num'), {
        opacity: 0, 
        y: 30, 
        duration: 1,
        scrollTrigger: { 
            trigger: scene, 
            start: "top 85%" 
        }
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <main className="bg-[#04040c] text-white min-h-screen relative">
      {/* Background Canvas (Hamesha z-index -1 par) */}
      <BgCanvas />

      {/* Hero Content */}
      <section className="scene h-screen flex flex-col justify-center items-center text-center px-6">
        <p className="welcome-eyebrow text-[10px] tracking-[10px] uppercase text-gray-500 mb-8">
            Intelligence Redefined
        </p>
        <h1 className="welcome-title text-7xl md:text-[10rem] font-black leading-[0.9] tracking-tighter italic">
          TRUTH <br /> <span className="text-[#00ffb4]">WIREHUB</span>
        </h1>
        <p ref={subRef} className="mt-10 text-lg md:text-xl text-gray-300 max-w-xl font-light h-20" />
      </section>

      {/* Scene 2 */}
      <section className="scene h-screen flex flex-col justify-center items-start px-10 md:px-32">
        <div className="big-num absolute right-10 text-[15rem] md:text-[25rem] font-black opacity-[0.05] pointer-events-none">02</div>
        <p className="text-[#00ffb4] tracking-widest text-xs mb-4 uppercase font-bold italic">Phase: Discovery</p>
        <h2 className="text-5xl md:text-8xl font-black mb-8 italic">
            THE WORLD'S <br /> <span className="text-gray-700">INTELLIGENCE</span>
        </h2>
        <p className="text-xl md:text-3xl text-gray-400 max-w-3xl leading-relaxed">
          We scan the horizon so you don't have to. Markets, technology, and culture delivered as clean, actionable insight.
        </p>
      </section>

      {/* Scene 3 */}
      <section className="scene h-screen flex flex-col justify-center items-end text-right px-10 md:px-32">
        <div className="big-num absolute left-10 text-[15rem] md:text-[25rem] font-black opacity-[0.05] pointer-events-none">03</div>
        <p className="text-[#ff00aa] tracking-widest text-xs mb-4 uppercase font-bold italic">Phase: Insight</p>
        <h2 className="text-5xl md:text-8xl font-black mb-8 italic">
            STORIES THAT <br /> <span className="text-gray-700">MATTER</span>
        </h2>
        <p className="text-xl md:text-3xl text-gray-400 max-w-3xl leading-relaxed">
          From Pakistan to Wall Street, we capture the movements that shape our world before they reach the mainstream.
        </p>
      </section>

      {/* Final Scene */}
      <section className="scene h-screen flex flex-col justify-center items-center text-center">
        <h2 className="text-6xl md:text-[10rem] font-black italic tracking-tighter text-white">
            SOMETHING <br /> BIG IS <br /> COMING
        </h2>
        <p className="mt-12 text-[#00ffb4] font-bold tracking-[1em] text-[10px] uppercase">Wait for it</p>
      </section>

      <footer className="py-20 text-center text-[8px] tracking-[2.5em] text-gray-800 uppercase">
        Truth Wirehub &copy; 2026
      </footer>
    </main>
  )
}