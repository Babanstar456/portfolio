"use client"
import { useEffect, useState, useRef } from "react"

const TYPING = [
  "Full-Stack Web Developer",
  "React.js & Node.js Engineer",
  "Product Builder & Startup Founder",
  "SIH 2025 Grand Finalist",
  "Data Scientist & AI/ML Engineer",
  "Linux & Security Engineer",
]

const STATS = [
  { value: "20+", label: "Tech Stacks" },
  { value: "3+", label: "Live Ventures" },
  { value: "SIH", label: "Grand Finalist" },
]

const TECH_ORBIT = [
  { label: "React", angle: 0, r: 110 },
  { label: "Node.js", angle: 60, r: 110 },
  { label: "Python", angle: 120, r: 110 },
  { label: "Next.js", angle: 180, r: 110 },
  { label: "MongoDB", angle: 240, r: 110 },
  { label: "Docker", angle: 300, r: 110 },
  { label: "TypeScript", angle: 30, r: 170 },
  { label: "PostgreSQL", angle: 100, r: 170 },
  { label: "AWS", angle: 170, r: 170 },
  { label: "Linux", angle: 240, r: 170 },
  { label: "TailwindCSS", angle: 310, r: 170 },
]

const FLOAT_CARDS = [
  { icon: "🏆", title: "SIH 2025", sub: "Grand Finalist", top: "8%", right: "2%", delay: "0s" },
  { icon: "🚀", title: "3 Ventures", sub: "Running Live", top: "52%", right: "-2%", delay: "0.4s" },
  { icon: "⚡", title: "20+ Stacks", sub: "Full-Stack", top: "80%", right: "14%", delay: "0.8s" },
]

export function HeroSection({ scrollY }: { scrollY: number }) {
  const [typing, setTyping] = useState("")
  const [ti, setTi] = useState(0)
  const [ci, setCi] = useState(0)
  const [del, setDel] = useState(false)
  const [orbitAngle, setOrbitAngle] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  // Typewriter
  useEffect(() => {
    const phrase = TYPING[ti]
    const speed = del ? 32 : 68
    const t = setTimeout(() => {
      if (!del) {
        if (ci < phrase.length) { setTyping(phrase.slice(0, ci + 1)); setCi(c => c + 1) }
        else setTimeout(() => setDel(true), 2000)
      } else {
        if (ci > 0) { setTyping(phrase.slice(0, ci - 1)); setCi(c => c - 1) }
        else { setDel(false); setTi(i => (i + 1) % TYPING.length) }
      }
    }, speed)
    return () => clearTimeout(t)
  }, [ci, del, ti])

  // Orbit rotation
  useEffect(() => {
    let frame: number
    const tick = () => {
      setOrbitAngle(a => a + 0.12)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let W = canvas.width = window.innerWidth
    let H = canvas.height = window.innerHeight
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight }
    window.addEventListener("resize", resize)
    const count = Math.floor(W / 18)
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.2 + 0.3,
      dx: (Math.random() - 0.5) * 0.25, dy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.4 + 0.1,
    }))
    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      particles.forEach(p => {
        p.x += p.dx; p.y += p.dy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(230,57,70,${p.alpha})`; ctx.fill()
      })
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < 110) {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(230,57,70,${0.06 * (1 - dist / 110)})`
            ctx.lineWidth = 0.5; ctx.stroke()
          }
        })
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize) }
  }, [])

  const parallaxY = scrollY * -0.14
  const heroOpacity = Math.max(0, 1 - scrollY / 750)

  return (
    <section className="relative min-h-screen flex flex-col items-start justify-center px-[5%] md:px-[7%] pt-[100px] pb-[80px] overflow-hidden bg-[#f7f6f3]">

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-[0.035]" style={{
          backgroundImage: "linear-gradient(rgba(26,26,46,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(26,26,46,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #e63946 0%, transparent 70%)" }} />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #1a1a2e 0%, transparent 70%)" }} />
        <div className="absolute -top-[10%] right-[20%] w-[2px] h-[130%] opacity-[0.06]"
          style={{ background: "linear-gradient(to bottom, transparent, #e63946, transparent)", transform: "rotate(18deg)" }} />
      </div>

      {/* Two-column layout */}
      <div className="relative z-10 w-full max-w-[1280px] flex flex-col lg:flex-row items-center gap-12 lg:gap-0"
        style={{ transform: `translateY(${parallaxY}px)`, opacity: heroOpacity, transition: "transform 0.05s linear" }}>

        {/* ── LEFT: Text ── */}
        <div className="flex-1 min-w-0">

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-7" style={{ animation: "heroSlideUp 0.6s 0.05s ease both" }}>
            <span className="w-7 h-[1.5px] bg-[#e63946]" />
            <span className="font-[var(--font-jetbrains)] text-[0.65rem] text-[#e63946] tracking-[2.5px] uppercase">
              B.Tech CSE · 3rd Year · Techno International Newtown, Kolkata
            </span>
          </div>

          {/* Name */}
          <h1 className="font-[var(--font-syne)] font-extrabold text-[clamp(3.2rem,7vw,7rem)] leading-[0.9] tracking-tight text-[#1a1a2e] mb-7">
            <span className="block overflow-hidden">
              <span className="block" style={{ animation: "heroSlideUp 0.9s 0.1s cubic-bezier(0.76,0,0.24,1) both" }}>Tathagata</span>
            </span>
            <span className="block overflow-hidden">
              <span className="relative inline-block text-[#e63946]" style={{ animation: "heroSlideUp 0.9s 0.22s cubic-bezier(0.76,0,0.24,1) both" }}>
                Sengupta
                <span className="absolute -bottom-2 left-0 w-full h-[3px] rounded-full bg-gradient-to-r from-[#e63946] to-[#e63946]/20" />
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <div className="flex items-center gap-4 mb-6 overflow-hidden" style={{ animation: "heroSlideUp 0.9s 0.32s cubic-bezier(0.76,0,0.24,1) both" }}>
            <span className="font-[var(--font-inter)] font-light text-[clamp(0.95rem,1.6vw,1.1rem)] text-[#374151] tracking-widest">
              Developer · Founder · Builder
            </span>
            <span className="flex-1 h-[1px] max-w-[100px] bg-gradient-to-r from-[#1a1a2e]/15 to-transparent" />
          </div>

          {/* Typewriter pill */}
          <div className="overflow-hidden mb-8" style={{ animation: "heroSlideUp 0.9s 0.4s cubic-bezier(0.76,0,0.24,1) both" }}>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-[#1a1a2e]/4 border border-[#1a1a2e]/8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e63946] animate-pulse flex-shrink-0" />
              <span className="font-[var(--font-jetbrains)] text-[clamp(0.72rem,1.3vw,0.88rem)] text-[#1a1a2e] font-medium min-w-[230px]">
                {typing}<span className="text-[#e63946] animate-pulse">|</span>
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="overflow-hidden mb-9" style={{ animation: "heroSlideUp 0.9s 0.5s cubic-bezier(0.76,0,0.24,1) both" }}>
            <p className="font-[var(--font-inter)] text-[clamp(0.86rem,1.2vw,0.97rem)] text-[#6b6b8d] max-w-[480px] leading-relaxed">
              I build full-stack web applications, data pipelines, and automated systems. 3rd-year B.Tech CSE, SIH 2025 Grand Finalist, and founder of multiple tech ventures — actively seeking React.js and full-stack engineering roles.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 mb-10" style={{ animation: "heroSlideUp 0.9s 0.6s cubic-bezier(0.76,0,0.24,1) both" }}>
            <a href="#projects"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg font-[var(--font-inter)] font-semibold text-[0.78rem] tracking-wider text-white bg-[#e63946] shadow-[0_4px_22px_rgba(230,57,70,0.38)] transition-all duration-300 hover:bg-[#c42e3a] hover:shadow-[0_8px_32px_rgba(230,57,70,0.55)] hover:-translate-y-[2px]">
              View My Work
              <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="#contact"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg font-[var(--font-inter)] font-semibold text-[0.78rem] tracking-wider text-white bg-[#1a1a2e] shadow-[0_4px_14px_rgba(26,26,46,0.22)] transition-all duration-300 hover:bg-[#2a2a4e] hover:-translate-y-[2px]">
              Get in Touch
              <svg className="w-3.5 h-3.5 opacity-60 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="/cv.jpg" target="_blank" rel="noreferrer"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg font-[var(--font-inter)] font-semibold text-[0.78rem] tracking-wider text-[#1a1a2e] bg-transparent border-[1.5px] border-[#1a1a2e]/15 transition-all duration-300 hover:bg-[#1a1a2e] hover:text-white hover:border-[#1a1a2e] hover:-translate-y-[2px]">
              Download CV
              <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>

          {/* Stats + badge */}
          <div className="flex flex-wrap items-center gap-6" style={{ animation: "heroSlideUp 0.9s 0.7s cubic-bezier(0.76,0,0.24,1) both" }}>
            {STATS.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <div>
                  <p className="font-[var(--font-syne)] font-extrabold text-[1.35rem] text-[#1a1a2e] leading-none">{s.value}</p>
                  <p className="font-[var(--font-jetbrains)] text-[0.56rem] text-[#9ca3af] tracking-widest uppercase mt-0.5">{s.label}</p>
                </div>
                {i < STATS.length - 1 && <span className="w-[1px] h-8 bg-[#1a1a2e]/10 ml-3" />}
              </div>
            ))}
            <span className="w-[1px] h-8 bg-[#1a1a2e]/10" />
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full font-[var(--font-jetbrains)] text-[0.6rem] text-[#15803d] tracking-wider border border-[#15803d]/20 bg-[#15803d]/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16a34a] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16a34a]" />
              </span>
              Available — Kolkata / Remote
            </div>
          </div>
        </div>

        {/* ── RIGHT: Graphic ── */}
        <div className="hidden lg:flex flex-shrink-0 w-[460px] h-[520px] relative items-center justify-center"
          style={{ animation: "heroSlideUp 1s 0.5s cubic-bezier(0.76,0,0.24,1) both" }}>

          {/* Orbit rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Ring 1 */}
            <div className="absolute w-[220px] h-[220px] rounded-full border border-dashed border-[#e63946]/15"
              style={{ transform: `rotate(${orbitAngle}deg)` }} />
            {/* Ring 2 */}
            <div className="absolute w-[340px] h-[340px] rounded-full border border-dashed border-[#1a1a2e]/8"
              style={{ transform: `rotate(${-orbitAngle * 0.7}deg)` }} />
            {/* Ring 3 solid faint */}
            <div className="absolute w-[420px] h-[420px] rounded-full border border-[#e63946]/5" />
          </div>

          {/* Orbiting tech pills — inner ring */}
          {TECH_ORBIT.filter((_, i) => i < 6).map((tech, i) => {
            const rad = ((tech.angle + orbitAngle) * Math.PI) / 180
            const x = Math.cos(rad) * tech.r
            const y = Math.sin(rad) * tech.r
            return (
              <div key={tech.label}
                className="absolute flex items-center justify-center"
                style={{ transform: "translate(-55.00000000000005px, -95.26279441628822px)" }}>
                <span className="font-[var(--font-jetbrains)] text-[0.58rem] px-2.5 py-1 rounded-full bg-white border border-[#e63946]/20 text-[#e63946] shadow-[0_2px_8px_rgba(230,57,70,0.12)] tracking-wide whitespace-nowrap">
                  {tech.label}
                </span>
              </div>
            )
          })}

          {/* Orbiting tech pills — outer ring */}
          {TECH_ORBIT.filter((_, i) => i >= 6).map((tech) => {
            const rad = ((tech.angle - orbitAngle * 0.65) * Math.PI) / 180
            const x = Math.cos(rad) * tech.r
            const y = Math.sin(rad) * tech.r
            return (
              <div key={tech.label}
                className="absolute flex items-center justify-center"
                style={{ transform: `translate(${x}px, ${y}px)` }}>
                <span className="font-[var(--font-jetbrains)] text-[0.55rem] px-2 py-0.5 rounded-full bg-[#1a1a2e]/5 border border-[#1a1a2e]/12 text-[#374151] tracking-wide whitespace-nowrap">
                  {tech.label}
                </span>
              </div>
            )
          })}

          {/* Center portrait / avatar */}
          <div className="relative z-10 w-[130px] h-[130px] rounded-full overflow-hidden border-4 border-white shadow-[0_8px_40px_rgba(230,57,70,0.2),0_0_0_1px_rgba(230,57,70,0.15)]">
            <img src="portrait1.jpg" alt="Tathagata Sengupta" className="w-full h-full object-cover" />
            {/* Holographic shimmer */}
            <div className="absolute inset-0 opacity-25"
              style={{
                background: "linear-gradient(135deg, transparent 30%, rgba(15,240,252,0.15) 50%, transparent 70%)",
                backgroundSize: "200% 200%",
                animation: "shimmer 3s ease-in-out infinite",
              }} />
          </div>

          {/* Floating stat cards */}
          {FLOAT_CARDS.map((card) => (
            <div key={card.title}
              className="absolute bg-white/90 backdrop-blur-sm border border-[#1a1a2e]/8 rounded-xl px-3.5 py-2.5 shadow-[0_4px_20px_rgba(26,26,46,0.08)] flex items-center gap-2.5 z-20"
              style={{
                top: card.top,
                right: card.right,
                animation: `floatCard 3.5s ${card.delay} ease-in-out infinite`,
              }}>
              <span className="text-base leading-none">{card.icon}</span>
              <div>
                <p className="font-[var(--font-syne)] font-bold text-[0.72rem] text-[#1a1a2e] leading-none">{card.title}</p>
                <p className="font-[var(--font-jetbrains)] text-[0.54rem] text-[#9ca3af] tracking-wide mt-0.5">{card.sub}</p>
              </div>
            </div>
          ))}

          {/* Corner accent lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 460 520">
            <line x1="0" y1="0" x2="60" y2="0" stroke="#e63946" strokeWidth="1.5" />
            <line x1="0" y1="0" x2="0" y2="60" stroke="#e63946" strokeWidth="1.5" />
            <line x1="460" y1="520" x2="400" y2="520" stroke="#e63946" strokeWidth="1.5" />
            <line x1="460" y1="520" x2="460" y2="460" stroke="#e63946" strokeWidth="1.5" />
          </svg>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-[5%] md:left-[7%] flex items-center gap-3 z-10"
        style={{ animation: "heroSlideUp 1s 1.1s ease both", opacity: heroOpacity }}>
        <div className="flex flex-col items-center gap-1">
          <div className="w-[1px] h-5 bg-gradient-to-b from-transparent to-[#e63946]" />
          <div className="w-[1px] h-5 bg-gradient-to-b from-[#e63946] to-transparent animate-bounce" />
        </div>
        <span className="font-[var(--font-jetbrains)] text-[0.56rem] text-[#9ca3af] tracking-[2.5px] uppercase">Scroll</span>
      </div>

      <style>{`
        @keyframes heroSlideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes shimmer {
          0% { background-position: -200% -200%; }
          50% { background-position: 200% 200%; }
          100% { background-position: -200% -200%; }
        }
        @keyframes floatCard {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
        }
      `}</style>
    </section>
  )
}