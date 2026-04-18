"use client";
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';

function Scene() {
  return (
    <>
      {/* 3D Stars in Background */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* Floating 3D Morphing Shape */}
      <Float speed={2} rotationIntensity={2} floatIntensity={2}>
        <Sphere args={[1, 100, 200]} scale={1.5}>
          <MeshDistortMaterial
            color="#00ff41"
            attach="material"
            distort={0.5}
            speed={2}
            wireframe
          />
        </Sphere>
      </Float>
    </>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden font-mono">
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* UI Overlay */}
      <div className="relative z-10 p-8 md:p-12 flex flex-col min-h-screen">
        <header className="flex justify-between items-start mb-20">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-white to-green-500">
              TRUTH WIREHUB
            </h1>
            <p className="text-gray-500 text-[10px] tracking-[0.3em]">AUTOMATED DATA ECOSYSTEM</p>
          </div>
          <div className="flex items-center gap-3 border border-green-900 bg-green-950/20 px-4 py-2 rounded-full">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-green-400 text-[10px]">ENGINE: RUNNING</span>
          </div>
        </header>

        <section className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-2xl border border-gray-800 rounded-2xl bg-black/40 backdrop-blur-xl overflow-hidden shadow-[0_0_50px_rgba(0,255,65,0.1)]">
            <div className="bg-[#1a1a1a]/80 px-4 py-2 border-b border-gray-800 flex gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
            </div>
            <div className="p-8 text-center">
              <h2 className="text-xl md:text-2xl text-gray-200 mb-6 tracking-widest uppercase font-bold">
                Terminal Initializing...
              </h2>
              <p className="text-gray-500 text-[10px] mb-10 leading-relaxed italic">
                SYSTEM_MANIFEST.V1 : CORE ENGINE IS PROCESSING DATA VIA LOCAL DOCKER NODES. PUBLIC UI RESTRICTED.
              </p>
              
              <div className="flex flex-col gap-3">
                <div className="px-4 py-3 border border-green-900/40 rounded bg-green-950/5 text-green-500 text-[10px] font-bold">
                  [OK] BACKEND ENGINE ONLINE
                </div>
                <div className="px-4 py-3 border border-gray-800 rounded bg-[#0a0a0a]/50 text-gray-500 text-[10px] animate-pulse">
                  [WAIT] DASHBOARD COMING SOON...
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-auto pt-10 flex justify-center gap-10 text-[10px] text-gray-600 tracking-widest">
          <span>STACK: NEXT.JS • THREE.JS • DOCKER • N8N</span>
        </footer>
      </div>
    </main>
  );
}