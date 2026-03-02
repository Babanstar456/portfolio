"use client"

import { useState, useEffect } from "react"

interface Particle {
  id: number
  x: number
  sz: number
  dur: number
  delay: number
  col: string
}

export function Particles() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const cols = ["#e63946", "#1a1a2e", "#0ff0fc", "#f0b429"]
    setParticles(
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        sz: Math.random() * 1.5 + 0.7,
        dur: Math.random() * 20 + 14,
        delay: Math.random() * 18,
        col: cols[i % 4],
      }))
    )
  }, [])

  return (
    <>
      <div className="fixed inset-0 z-[1] pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${p.x}%`,
              width: p.sz,
              height: p.sz,
              background: p.col,
              opacity: 0.25,
              animation: `particleFloat ${p.dur}s ${p.delay}s linear infinite`,
            }}
          />
        ))}
      </div>

      {/* Grid background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(230,57,70,0.4) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <style>{`
        @keyframes particleFloat {
          0% { opacity: 0; transform: translateY(100vh); }
          8%, 88% { opacity: 0.3; }
          100% { opacity: 0; transform: translateY(-70px); }
        }
      `}</style>
    </>
  )
}

export function Footer() {
  return (
    <footer className="relative z-10 bg-[#1a1a2e] py-10 px-[7%] overflow-hidden">
      {/* Subtle gradient line */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#e63946]/30 to-transparent mb-8" />
      
      <div className="max-w-[1280px] mx-auto text-center">
        <div className="font-[var(--font-syne)] font-bold text-white/50 text-[0.75rem] tracking-[2px] mb-2">
          TATHAGATA SENGUPTA
        </div>
        <div className="font-[var(--font-jetbrains)] text-[0.6rem] text-white/25 tracking-[2px] mb-4">
          {"B.Tech CSE \u00B7 Howrah, India"}
        </div>
        <div className="font-[var(--font-jetbrains)] text-[0.55rem] text-white/15 tracking-[1.5px]">
          {"Built with Next.js & React \u00B7 2026"}
        </div>
      </div>
    </footer>
  )
}
