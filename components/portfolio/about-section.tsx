"use client"

import { useEffect, useRef, useState } from "react"
const VENTURES = ["Techacon Solutions", "Khaww", "BECS", "JM Biotech", "Indiserve", "BazaarBot"]
const CHIPS = ["Howrah, West Bengal", "tathagata456@gmail.com", "+91 8167014019", "tathagatasengupta.in"]

export function AboutSection({ scrollY }: { scrollY: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} id="about" className="relative z-10 py-24 px-[5%] md:px-[7%]">
      <div className="max-w-[1280px] mx-auto">
        <div className={`transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-5 h-[1.5px] bg-[#e63946]" />
            <span className="font-[var(--font-jetbrains)] text-[0.65rem] text-[#e63946] tracking-[2.5px] uppercase">
              01 — About Me
            </span>
          </div>
          <h2 className="font-[var(--font-syne)] font-extrabold text-[clamp(2rem,4.5vw,3.2rem)] text-[#1a1a2e] tracking-tight leading-tight mb-3 text-balance">
            Who I <span className="text-[#e63946]">Am</span>
          </h2>
        </div>
       
        <div className="grid grid-cols-1 md:grid-cols-[360px_1fr] gap-10 md:gap-16 mt-12 items-start">
          {/* Portrait */}
          <div
            className={`transition-all duration-800 delay-200 ${vis ? "opacity-100 translate-y-0 rotate-0" : "opacity-0 translate-y-10 -rotate-3"}`}
          >
            <div
              className="relative rounded-2xl h-[360px] flex items-center justify-center overflow-hidden border border-[#1a1a2e]/10"
              style={{
                background: "linear-gradient(145deg, #e4e0d8, #d0ccc4)",
                transform: `translateY(${(scrollY - 600) * 0.03}px)`,
                transition: "transform 0.1s linear",
              }}
            >
              <span><img
      src="portrait.jpg"   // path to your image
      alt="Portrait"
      className="w-full h-auto rounded-2xl shadow-xl object-cover"
    />
              </span>
              {/* Holographic shimmer */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: "linear-gradient(135deg, transparent 30%, rgba(15,240,252,0.1) 50%, transparent 70%)",
                  backgroundSize: "200% 200%",
                  animation: "shimmer 3s ease-in-out infinite",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1a1a2e]/5" />
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {VENTURES.map((v) => (
                <span
                  key={v}
                  className="font-[var(--font-jetbrains)] text-[0.6rem] px-3 py-1.5 rounded-full bg-[#e63946]/5 border border-[#e63946]/15 text-[#e63946] tracking-wider transition-all duration-200 hover:bg-[#e63946] hover:text-white cursor-default"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>

          {/* Text */}
          <div className={`transition-all duration-700 delay-300 ${vis ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
            <div className="space-y-5">
              <p className="font-[var(--font-inter)] text-[0.98rem] text-[#374151] leading-relaxed">
                {"I'm a "}
                <strong className="text-[#1a1a2e] font-semibold">B.Tech Computer Science student</strong>
                {" (3rd year, Techno International Newtown) with strong hands-on experience in full-stack development, data engineering, and systems design. I've been building real software for clients and teams since my first year \u2014 not just academic projects."}
              </p>
              <p className="font-[var(--font-inter)] text-[0.98rem] text-[#374151] leading-relaxed">
                {"As a "}
                <strong className="text-[#1a1a2e] font-semibold">SIH 2025 Grand Finalist</strong>
                {", I designed and shipped a working IoT + web solution under competitive pressure. I currently run multiple ventures: "}
                <strong className="text-[#1a1a2e] font-semibold">Techacon Solutions</strong>
                {" (IT consulting, 20+ tech stacks) and "}
                <strong className="text-[#1a1a2e] font-semibold">Khaww</strong>
                {" (digitizing Kolkata's dabbawala food delivery network)."}
              </p>
              <p className="font-[var(--font-inter)] text-[0.98rem] text-[#374151] leading-relaxed">
                {"I'm actively looking for "}
                <strong className="text-[#1a1a2e] font-semibold">{"React.js, full-stack, or AI/ML engineering roles"}</strong>
                {" \u2014 remote or Kolkata-based. I bring both technical depth and product-thinking to every engagement."}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-7">
              {CHIPS.map((c) => (
                <span
                  key={c}
                  className="font-[var(--font-jetbrains)] text-[0.62rem] px-3 py-1.5 rounded-lg bg-[#eaeaf2] border border-[#1a1a2e]/10 text-[#374151] tracking-wider"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% -200%; }
          50% { background-position: 200% 200%; }
          100% { background-position: -200% -200%; }
        }
      `}</style>
    </section>
  )
}
