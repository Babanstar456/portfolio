"use client"

import { useEffect, useRef, useState } from "react"

const STATS = [
  { n: "5+", l: "Active Roles" },
  { n: "SIH", l: "2025 Finalist" },
  { n: "4+", l: "Ventures" },
  { n: "8+", l: "Tech Domains" },
  { n: "3+", l: "Years Building" },
]

export function StatsBar() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="relative z-10 bg-[#1a1a2e] overflow-hidden"
    >
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,240,252,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(15,240,252,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="max-w-[1280px] mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 relative z-10">
        {STATS.map((s, i) => (
          <div
            key={s.l}
            className={`py-8 px-5 text-center border-r border-white/[0.05] last:border-r-0 transition-all duration-500 hover:bg-white/[0.03] ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <div className="font-[var(--font-syne)] font-extrabold text-2xl md:text-3xl leading-none mb-1 text-[#e63946]">
              {s.n}
            </div>
            <div className="font-[var(--font-inter)] text-[0.68rem] font-normal text-white/40 tracking-wider uppercase">
              {s.l}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
