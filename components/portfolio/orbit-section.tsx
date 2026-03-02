"use client"

import { useEffect, useRef, useState } from "react"

const OR1 = [
  { l: "React.js", c: "bg-[#e63946] shadow-[0_0_8px_rgba(230,57,70,0.5)]", a: 0 },
  { l: "Node.js", c: "bg-[#0ff0fc] shadow-[0_0_8px_rgba(15,240,252,0.5)]", a: 90 },
  { l: "Python", c: "bg-[#f0b429] shadow-[0_0_8px_rgba(240,180,41,0.5)]", a: 180 },
  { l: "SQL", c: "bg-[#e63946] shadow-[0_0_8px_rgba(230,57,70,0.5)]", a: 270 },
]
const OR2 = [
  { l: "LangChain", c: "bg-[#f0b429] shadow-[0_0_8px_rgba(240,180,41,0.5)]", a: 30 },
  { l: "Kali Linux", c: "bg-[#e63946] shadow-[0_0_8px_rgba(230,57,70,0.5)]", a: 102 },
  { l: "Docker", c: "bg-[#0ff0fc] shadow-[0_0_8px_rgba(15,240,252,0.5)]", a: 174 },
  { l: "PyTorch", c: "bg-[#f0b429] shadow-[0_0_8px_rgba(240,180,41,0.5)]", a: 246 },
  { l: "n8n", c: "bg-[#e63946] shadow-[0_0_8px_rgba(230,57,70,0.5)]", a: 318 },
]
const OR3 = [
  { l: "PostgreSQL", c: "bg-[#0ff0fc] shadow-[0_0_8px_rgba(15,240,252,0.5)]", a: 15 },
  { l: "Next.js", c: "bg-[#0ff0fc] shadow-[0_0_8px_rgba(15,240,252,0.5)]", a: 67 },
  { l: "Grafana", c: "bg-[#f0b429] shadow-[0_0_8px_rgba(240,180,41,0.5)]", a: 119 },
  { l: "Burp Suite", c: "bg-[#e63946] shadow-[0_0_8px_rgba(230,57,70,0.5)]", a: 171 },
  { l: "OSINT", c: "bg-[#f0b429] shadow-[0_0_8px_rgba(240,180,41,0.5)]", a: 223 },
  { l: "TypeScript", c: "bg-[#0ff0fc] shadow-[0_0_8px_rgba(15,240,252,0.5)]", a: 275 },
  { l: "Metasploit", c: "bg-[#e63946] shadow-[0_0_8px_rgba(230,57,70,0.5)]", a: 327 },
]

function npos(angle: number, r: number) {
  const rad = ((angle - 90) * Math.PI) / 180
  return {
    left: `calc(50% + ${Math.cos(rad) * r}px)`,
    top: `calc(50% + ${Math.sin(rad) * r}px)`,
  }
}

function OrbitNodes({ orb }: { orb: { r1: number; r2: number; r3: number } }) {
  return (
    <>
      {OR1.map((n, i) => {
        const a = (n.a + orb.r1) % 360
        return (
          <div
            key={`o1-${i}`}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 group"
            style={npos(a, 88)}
          >
            <div className={`w-2 h-2 rounded-full transition-transform duration-300 group-hover:scale-[2] ${n.c}`} />
            <span className="font-[var(--font-jetbrains)] text-[0.52rem] tracking-wider whitespace-nowrap text-white/85 bg-white/[0.08] border border-white/10 px-2 py-0.5 rounded">
              {n.l}
            </span>
          </div>
        )
      })}
      {OR2.map((n, i) => {
        const a = (n.a + orb.r2) % 360
        return (
          <div
            key={`o2-${i}`}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 group"
            style={npos(a, 143)}
          >
            <div className={`w-2 h-2 rounded-full transition-transform duration-300 group-hover:scale-[2] ${n.c}`} />
            <span className="font-[var(--font-jetbrains)] text-[0.52rem] tracking-wider whitespace-nowrap text-white/85 bg-white/[0.08] border border-white/10 px-2 py-0.5 rounded">
              {n.l}
            </span>
          </div>
        )
      })}
      {OR3.map((n, i) => {
        const a = (n.a + orb.r3) % 360
        return (
          <div
            key={`o3-${i}`}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 group"
            style={npos(a, 198)}
          >
            <div className={`w-2 h-2 rounded-full transition-transform duration-300 group-hover:scale-[2] ${n.c}`} />
            <span className="font-[var(--font-jetbrains)] text-[0.52rem] tracking-wider whitespace-nowrap text-white/85 bg-white/[0.08] border border-white/10 px-2 py-0.5 rounded">
              {n.l}
            </span>
          </div>
        )
      })}
    </>
  )
}

export function OrbitSection() {
  const [orb, setOrb] = useState({ r1: 0, r2: 0, r3: 0 })
  const [mounted, setMounted] = useState(false)
  const animRef = useRef<number>(0)
  const prevRef = useRef<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!mounted) return
    const animate = (t: number) => {
      if (prevRef.current != null) {
        const d = (t - prevRef.current) / 1000
        setOrb((p) => ({
          r1: (p.r1 + d * 14) % 360,
          r2: (p.r2 - d * 10) % 360,
          r3: (p.r3 + d * 6) % 360,
        }))
      }
      prevRef.current = t
      animRef.current = requestAnimationFrame(animate)
    }
    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [mounted])

  return (
    <section
      ref={ref}
      id="orbit"
      className="relative z-10 py-24 px-[5%] md:px-[7%] bg-[#1a1a2e] overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(15,240,252,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-[1280px] mx-auto">
        <div className={`transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-5 h-[1.5px] bg-white/20" />
            <span className="font-[var(--font-jetbrains)] text-[0.65rem] text-white/35 tracking-[2.5px] uppercase">
              02 -- Skills Visual
            </span>
          </div>
          <h2 className="font-[var(--font-syne)] font-extrabold text-[clamp(2rem,4.5vw,3.2rem)] text-white tracking-tight leading-tight mb-3 text-balance">
            My <span className="text-[#e63946]">Stack</span>
          </h2>
          <p className="font-[var(--font-inter)] text-[0.95rem] text-white/45 max-w-[460px] leading-relaxed">
            Technologies I work with daily across frontend, backend, data, and security.
          </p>
        </div>

        <div className="flex flex-col items-center mt-12">
          <div
            className={`relative transition-all duration-1000 delay-300 ${vis ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
            style={{ width: "clamp(280px,50vw,490px)", height: "clamp(280px,50vw,490px)" }}
          >
            {/* Rings */}
            <div className="absolute top-1/2 left-1/2 w-[175px] h-[175px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#e63946]/30" />
            <div className="absolute top-1/2 left-1/2 w-[285px] h-[285px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
            <div className="absolute top-1/2 left-1/2 w-[395px] h-[395px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]" />

            {/* Core */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[#e63946] flex items-center justify-center z-10"
              style={{
                boxShadow: "0 0 0 12px rgba(230,57,70,0.12), 0 0 40px rgba(230,57,70,0.3), 0 0 80px rgba(230,57,70,0.15)",
              }}
            >
              <span className="font-[var(--font-syne)] font-extrabold text-[0.6rem] text-white tracking-wider text-center leading-tight">
                FULL<br />STACK
              </span>
            </div>

            {/* Only render orbit nodes on client to avoid hydration mismatch from trig calculations */}
            {mounted && <OrbitNodes orb={orb} />}
          </div>
        </div>
      </div>
    </section>
  )
}
