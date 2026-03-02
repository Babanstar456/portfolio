"use client"

import { useEffect, useState } from "react"

const TYPING = [
  "Full-Stack Web Developer",
  "React.js & Node.js Engineer",
  "Product Builder & Startup Founder",
  "SIH 2025 Grand Finalist",
  "Data Scientist & AI/ML Engineer",
  "Linux & Security Engineer",
]

export function HeroSection({ scrollY }: { scrollY: number }) {
  const [typing, setTyping] = useState("")
  const [ti, setTi] = useState(0)
  const [ci, setCi] = useState(0)
  const [del, setDel] = useState(false)

  useEffect(() => {
    const phrase = TYPING[ti]
    const speed = del ? 36 : 70
    const t = setTimeout(() => {
      if (!del) {
        if (ci < phrase.length) {
          setTyping(phrase.slice(0, ci + 1))
          setCi((c) => c + 1)
        } else {
          setTimeout(() => setDel(true), 2200)
        }
      } else {
        if (ci > 0) {
          setTyping(phrase.slice(0, ci - 1))
          setCi((c) => c - 1)
        } else {
          setDel(false)
          setTi((i) => (i + 1) % TYPING.length)
        }
      }
    }, speed)
    return () => clearTimeout(t)
  }, [ci, del, ti])

  const parallaxY = scrollY * -0.15
  const heroOpacity = Math.max(0, 1 - scrollY / 800)

  return (
    <section className="relative min-h-screen flex flex-col items-start justify-center px-[5%] md:px-[7%] pt-[100px] pb-[80px] overflow-hidden">
      {/* Futuristic background elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(230,57,70,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(230,57,70,0.3) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        {/* Diagonal stripe */}
        <div
          className="absolute -top-[20%] -right-[5%] w-[500px] h-[140%] opacity-40"
          style={{
            background: "linear-gradient(160deg, rgba(230,57,70,0.06), rgba(15,240,252,0.04))",
            transform: "skewX(-8deg)",
          }}
        />
        {/* Floating ring */}
        <div
          className="absolute top-[15%] right-[10%] w-[300px] h-[300px] rounded-full border border-[#e63946]/10 hidden lg:block"
          style={{
            transform: `translateY(${scrollY * 0.08}px) rotate(${scrollY * 0.02}deg)`,
            transition: "transform 0.05s linear",
          }}
        />
        <div
          className="absolute top-[20%] right-[12%] w-[200px] h-[200px] rounded-full border border-[#0ff0fc]/8 hidden lg:block"
          style={{
            transform: `translateY(${scrollY * 0.05}px) rotate(${scrollY * -0.03}deg)`,
            transition: "transform 0.05s linear",
          }}
        />
      </div>

      <div
        className="relative z-10 w-full max-w-[1280px]"
        style={{
          transform: `translateY(${parallaxY}px)`,
          opacity: heroOpacity,
          transition: "transform 0.05s linear",
        }}
      >
        {/* Eyebrow */}
        <div
          className="flex items-center gap-3 mb-6"
          style={{ animation: "heroSlideUp 0.6s 0.1s ease both" }}
        >
          <span className="w-7 h-[2px] bg-[#e63946]" />
          <span className="font-[var(--font-jetbrains)] text-[0.7rem] text-[#e63946] tracking-[2.5px] uppercase">
            {"B.Tech CSE \u00B7 3rd Year \u00B7 Techno International Newtown, Kolkata"}
          </span>
        </div>

        {/* Name */}
        <h1 className="font-[var(--font-syne)] font-extrabold text-[clamp(3.2rem,9vw,7.5rem)] leading-[0.92] tracking-tight text-[#1a1a2e] mb-6">
          <span className="block overflow-hidden">
            <span className="block" style={{ animation: "heroSlideUp 0.85s 0.05s cubic-bezier(0.76,0,0.24,1) both" }}>
              Tathagata
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="block text-[#e63946]" style={{ animation: "heroSlideUp 0.85s 0.18s cubic-bezier(0.76,0,0.24,1) both" }}>
              Sengupta
            </span>
          </span>
        </h1>

        {/* Tagline */}
        <div className="overflow-hidden mb-2">
          <p
            className="font-[var(--font-inter)] font-light text-[clamp(1rem,2vw,1.25rem)] text-[#374151] tracking-wider"
            style={{ animation: "heroSlideUp 0.85s 0.3s cubic-bezier(0.76,0,0.24,1) both" }}
          >
            {"Developer \u00B7 Founder \u00B7 Builder"}
          </p>
        </div>

        {/* Typer */}
        <div className="overflow-hidden mb-7">
          <div
            className="font-[var(--font-jetbrains)] text-[clamp(0.82rem,1.5vw,0.98rem)] text-[#1a1a2e] font-medium min-h-[1.5em]"
            style={{ animation: "heroSlideUp 0.85s 0.42s cubic-bezier(0.76,0,0.24,1) both" }}
          >
            {typing}
            <span className="text-[#e63946] animate-pulse">|</span>
          </div>
        </div>

        {/* Description */}
        <div className="overflow-hidden mb-9">
          <p
            className="font-[var(--font-inter)] text-[clamp(0.9rem,1.3vw,1rem)] text-[#6b6b8d] max-w-[520px] leading-relaxed"
            style={{ animation: "heroSlideUp 0.85s 0.54s cubic-bezier(0.76,0,0.24,1) both" }}
          >
            I build full-stack web applications, data pipelines, and automated systems.
            Currently a 3rd-year B.Tech CSE student, SIH 2025 Grand Finalist, and founder of
            multiple tech ventures — actively seeking React.js and full-stack engineering roles.
          </p>
        </div>

        {/* Buttons */}
        <div
          className="flex flex-wrap gap-3 mb-10"
          style={{ animation: "heroSlideUp 0.85s 0.64s cubic-bezier(0.76,0,0.24,1) both" }}
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-lg font-[var(--font-inter)] font-semibold text-[0.8rem] tracking-wider text-white bg-[#e63946] shadow-[0_4px_20px_rgba(230,57,70,0.35)] transition-all duration-300 hover:bg-[#c42e3a] hover:shadow-[0_8px_30px_rgba(230,57,70,0.5)] hover:-translate-y-[2px]"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-lg font-[var(--font-inter)] font-semibold text-[0.8rem] tracking-wider text-white bg-[#1a1a2e] shadow-[0_4px_14px_rgba(26,26,46,0.22)] transition-all duration-300 hover:bg-[#2a2a4e] hover:-translate-y-[2px]"
          >
            Get in Touch
          </a>
          <a
            href="https://tathagatasengupta.in"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-lg font-[var(--font-inter)] font-semibold text-[0.8rem] tracking-wider text-[#1a1a2e] bg-transparent border-[1.5px] border-[#1a1a2e]/15 transition-all duration-300 hover:bg-[#1a1a2e] hover:text-white hover:border-[#1a1a2e]"
          >
            {"Download CV \u2193"}
          </a>
        </div>

        {/* Available badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-[var(--font-jetbrains)] text-[0.64rem] text-[#15803d] tracking-wider border border-[#15803d]/20 bg-[#15803d]/5"
          style={{ animation: "heroSlideUp 0.85s 0.74s cubic-bezier(0.76,0,0.24,1) both" }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16a34a] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16a34a]" />
          </span>
          {"Available for React.js & Full-Stack Roles \u2014 Kolkata / Remote"}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-[5%] md:left-[7%] flex items-center gap-3"
        style={{
          animation: "heroSlideUp 1s 1s ease both",
          opacity: heroOpacity,
        }}
      >
        <div className="w-10 h-[1px] bg-gradient-to-r from-[#e63946] to-transparent" />
        <span className="font-[var(--font-jetbrains)] text-[0.58rem] text-[#6b6b8d] tracking-[2px] uppercase">
          Scroll to explore
        </span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-[#e63946] to-transparent animate-bounce" />
      </div>

      <style>{`
        @keyframes heroSlideUp {
          from { opacity: 0; transform: translateY(105%); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  )
}
