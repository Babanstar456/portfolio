"use client"

import { useEffect, useRef, useState, useCallback } from "react"

const PROJECTS = [
  { c: "from-[#e63946] to-[#ff6b6b]", tc: "bg-[#e63946]/8 text-[#e63946] border-[#e63946]/20", tag: "SIH 2025 Grand Finalist", name: "SURYADUT — Solar Dewatering System", desc: "IoT solar dewatering platform for mining operations. ESP32 + Grafana monitoring. Cuts diesel costs by 50%.", stack: ["ESP32", "LoRa", "MQTT", "Grafana", "Next.js", "MySQL"], links: [{ l: "Live Demo", h: "https://fancy-gumption-ec4362.netlify.app/" }, { l: "Video", h: "https://youtu.be/YkadWFia1aU" }] },
  { c: "from-[#1a1a2e] to-[#2a2a4e]", tc: "bg-[#1a1a2e]/8 text-[#1a1a2e] border-[#1a1a2e]/18", tag: "Hackathon Winner", name: "RAWMART — Reverse Auction Platform", desc: "Real-time gamified bidding for street vendors. WebSocket-powered live auctions reduce procurement costs by 25–40%.", stack: ["Next.js", "Node.js", "WebSockets", "Express", "MySQL"], links: [{ l: "Live Demo", h: "http://rawmart.onrender.com/" }] },
  { c: "from-[#b8860b] to-[#d4a017]", tc: "bg-[#b8860b]/8 text-[#7a5a00] border-[#b8860b]/22", tag: "Full-Stack Project", name: "BECS — School Management System", desc: "End-to-end web-based school ERP. Node.js backend APIs and SQL database for academic reporting.", stack: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "SQL"], links: [{ l: "Live Demo", h: "https://www.becsofficial.com" }] },
  { c: "from-[#e63946] to-[#ff6b6b]", tc: "bg-[#e63946]/8 text-[#e63946] border-[#e63946]/20", tag: "Client Work", name: "JM BIOTECH — Corporate Website", desc: "Fully responsive company website. Custom layouts, interactive components, and cross-browser compatibility.", stack: ["HTML", "CSS", "JavaScript"], links: [{ l: "Live Demo", h: "https://www.jmbiotech.in" }] },
  { c: "from-[#1a1a2e] to-[#2a2a4e]", tc: "bg-[#1a1a2e]/8 text-[#1a1a2e] border-[#1a1a2e]/18", tag: "Startup — COO", name: "KHAWW — Organized Dabbawala Network", desc: "Digitizing India's legendary dabbawala system with route optimization for Greater Kolkata food delivery.", stack: ["React", "Node.js", "Operations", "Supply Chain"], links: [{ l: "Download App", h: "https://play.google.com/store/apps/details?id=com.techaconsolutions.khaww/" }] },
  { c: "from-[#b8860b] to-[#d4a017]", tc: "bg-[#b8860b]/8 text-[#7a5a00] border-[#b8860b]/22", tag: "Client Work", name: "INDIISERVE — Service Marketplace", desc: "Full-stack service platform. RESTful APIs and relational database for complex business workflows.", stack: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "SQL"], links: [{ l: "Live Demo", h: "https://www.indiiserve.com" }] },
  { c: "from-[#e63946] to-[#ff6b6b]", tc: "bg-[#e63946]/8 text-[#e63946] border-[#e63946]/20", tag: "Unpaid Client Work", name: "Tending to Infinity (Prototype)", desc: "A world class LMS system built for mathematics teacher Srijan Datta.", stack: ["Python", "IoT", "AI/ML", "Research"], links: [{ l: "View Project", h: "https://github.com/Babanstar456/Tending-to-Infinity.git" }] },
  { c: "from-[#1a1a2e] to-[#2a2a4e]", tc: "bg-[#1a1a2e]/8 text-[#1a1a2e] border-[#1a1a2e]/18", tag: "In Progress", name: "Suryadut — AI IoT Assistant", desc: "AI + IoT powered solar DC generation and dewatering system with intelligent monitoring.", stack: ["Python", "React", "Node.js", "LangChain", "AI/ML"], links: [{ l: "GitHub", h: "https://github.com/Babanstar456/SIH-Miningmotors_T72-GIET" }] },
  { c: "from-[#1a1a2e] to-[#2a2a4e]", tc: "bg-[#1a1a2e]/8 text-[#1a1a2e] border-[#1a1a2e]/18", tag: "In Progress", name: "Bengal Heritage Quest", desc: "Interactive web platform showcasing the cultural heritage of Bengal.", stack: ["Python", "React", "Node.js", "LangChain", "AI/ML"], links: [{ l: "GitHub", h: "https://github.com/Babanstar456/bengal-heritage-quest" }] },
  { c: "from-[#1a1a2e] to-[#2a2a4e]", tc: "bg-[#1a1a2e]/8 text-[#1a1a2e] border-[#1a1a2e]/18", tag: "In Progress", name: "PingDue — EMI Reminder", desc: "A smart EMI reminder system so users never miss a payment deadline.", stack: ["Python", "React", "Node.js", "LangChain", "AI/ML"], links: [{ l: "GitHub", h: "https://github.com/Babanstar456/PingDue" }] },
]

const SLOTS = 3
const SLOT_ANGLES = [-90, 30, 150] // top, bottom-right, bottom-left (clock positions)

export function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  const [rotation, setRotation] = useState(0)       // current wheel angle in degrees
  const [targetRot, setTargetRot] = useState(0)     // target for smooth lerp
  const [activeGroup, setActiveGroup] = useState(0) // which set of 3 is shown
  const [isAnimating, setIsAnimating] = useState(false)
  const rotRef = useRef(0)
  const rafRef = useRef<number>(0)
  const totalGroups = Math.ceil(PROJECTS.length / SLOTS)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.05 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  // Smooth rotation lerp
  useEffect(() => {
    const animate = () => {
      const diff = targetRot - rotRef.current
      if (Math.abs(diff) < 0.05) {
        rotRef.current = targetRot
        setRotation(targetRot)
        setIsAnimating(false)
        return
      }
      rotRef.current += diff * 0.07
      setRotation(rotRef.current)
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [targetRot])

  const rotate = useCallback((dir: 1 | -1) => {
    if (isAnimating) return
    const next = (activeGroup + dir + totalGroups) % totalGroups
    setIsAnimating(true)
    setActiveGroup(next)
    setTargetRot(t => t + dir * 120) // 120deg = 360/3 slots
  }, [activeGroup, isAnimating, totalGroups])

  const goToGroup = (g: number) => {
    if (isAnimating || g === activeGroup) return
    const diff = g - activeGroup
    setIsAnimating(true)
    setActiveGroup(g)
    setTargetRot(t => t + diff * 120)
  }

  const currentProjects = PROJECTS.slice(activeGroup * SLOTS, activeGroup * SLOTS + SLOTS)

  // Radius for card placement — responsive
  const RADIUS = 260

  return (
    <section ref={ref} id="projects" className="relative z-10 py-24 px-[5%] md:px-[7%] overflow-hidden bg-[#1a1a2e]/[0.02]">
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <div className={`transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-5 h-[1.5px] bg-[#e63946]" />
            <span className="font-[var(--font-jetbrains)] text-[0.65rem] text-[#e63946] tracking-[2.5px] uppercase">04 — Projects</span>
          </div>
          <h2 className="font-[var(--font-syne)] font-extrabold text-[clamp(2rem,4.5vw,3.2rem)] text-[#1a1a2e] tracking-tight leading-tight mb-3 text-balance">
            {"What I've "}<span className="text-[#e63946]">Built</span>
          </h2>
          <p className="font-[var(--font-inter)] text-[0.95rem] text-[#6b6b8d] max-w-[460px] leading-relaxed">
            From hackathon winners to live client work. Rotate the wheel to explore.
          </p>
        </div>

        {/* ── CLOCK WHEEL (desktop) ── */}
        <div className={`hidden md:flex flex-col items-center mt-16 transition-all duration-700 delay-200 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>

          {/* Wheel container */}
          <div className="relative" style={{ width: 860, height: 640 }}>

            {/* ── Decorative rings ── */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="absolute rounded-full border border-dashed border-[#e63946]/12"
                style={{ width: RADIUS * 2 + 140, height: RADIUS * 2 + 140,
                  transform: `rotate(${rotation}deg)`, transition: "transform 0.05s linear" }} />
              <div className="absolute rounded-full border border-[#1a1a2e]/5"
                style={{ width: RADIUS * 2 - 20, height: RADIUS * 2 - 20 }} />
              {/* Spoke lines */}
              {SLOT_ANGLES.map((angle, i) => {
                const rad = ((angle + rotation) * Math.PI) / 180
                const x2 = Math.cos(rad) * (RADIUS + 30)
                const y2 = Math.sin(rad) * (RADIUS + 30)
                return (
                  <svg key={i} className="absolute pointer-events-none"
                    style={{ width: RADIUS * 2 + 140, height: RADIUS * 2 + 140, left: "50%", top: "50%",
                      transform: "translate(-50%,-50%)" }}>
                    <line
                      x1={RADIUS + 70} y1={RADIUS + 70}
                      x2={RADIUS + 70 + x2} y2={RADIUS + 70 + y2}
                      stroke="rgba(230,57,70,0.08)" strokeWidth="1.5" strokeDasharray="4 6"
                    />
                  </svg>
                )
              })}
            </div>

            {/* ── Center hub ── */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="w-16 h-16 rounded-full bg-white border-2 border-[#e63946]/30 shadow-[0_0_32px_rgba(230,57,70,0.15)] flex items-center justify-center"
                style={{ transform: `rotate(${rotation}deg)`, transition: "transform 0.05s linear" }}>
                <div className="w-3 h-3 rounded-full bg-[#e63946]" />
              </div>
              {/* Group counter */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-[var(--font-jetbrains)] text-[0.6rem] text-[#9ca3af] tracking-widest">
                {activeGroup + 1} / {totalGroups}
              </div>
            </div>

            {/* ── Project cards on orbit ── */}
            {SLOT_ANGLES.map((baseAngle, slot) => {
              const project = currentProjects[slot]
              if (!project) return null
              const angle = baseAngle + rotation
              const rad = (angle * Math.PI) / 180
              const cx = 430 + Math.cos(rad) * RADIUS
              const cy = 320 + Math.sin(rad) * RADIUS
              const cardW = 220

              return (
                <div
                  key={`${activeGroup}-${slot}`}
                  className="absolute z-10"
                  style={{
                    left: cx,
                    top: cy,
                    transform: "translate(-50%, -50%)",
                    width: cardW,
                    animation: "hingeIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both",
                    animationDelay: `${slot * 80}ms`,
                  }}
                >
                  <div className="group relative bg-white/90 backdrop-blur-md border border-[#1a1a2e]/8 rounded-2xl p-4 flex flex-col overflow-hidden hover:border-[#e63946]/30 hover:shadow-[0_12px_40px_rgba(26,26,46,0.14)] transition-all duration-300 cursor-default">
                    <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${project.c} rounded-t-2xl`} />
                    {/* Slot number */}
                    <span className="absolute top-3 right-4 font-[var(--font-syne)] font-extrabold text-[2rem] leading-none text-[#1a1a2e]/[0.05] select-none">
                      {String(activeGroup * SLOTS + slot + 1).padStart(2, "0")}
                    </span>
                    <span className={`inline-flex items-center font-[var(--font-jetbrains)] text-[0.52rem] tracking-wider px-2.5 py-1 rounded-full border w-fit mb-2.5 ${project.tc}`}>
                      {project.tag}
                    </span>
                    <h3 className="font-[var(--font-syne)] font-bold text-[0.85rem] text-[#1a1a2e] leading-tight mb-2">
                      {project.name}
                    </h3>
                    <p className="font-[var(--font-inter)] text-[0.76rem] text-[#374151] leading-relaxed mb-3 line-clamp-3">
                      {project.desc}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.stack.slice(0, 4).map(s => (
                        <span key={s} className="font-[var(--font-jetbrains)] text-[0.52rem] px-1.5 py-0.5 rounded bg-[#eaeaf2] border border-[#1a1a2e]/8 text-[#6b6b8d]">{s}</span>
                      ))}
                      {project.stack.length > 4 && (
                        <span className="font-[var(--font-jetbrains)] text-[0.52rem] px-1.5 py-0.5 rounded bg-[#eaeaf2] border border-[#1a1a2e]/8 text-[#6b6b8d]">+{project.stack.length - 4}</span>
                      )}
                    </div>
                    <div className="flex gap-1.5">
                      {project.links.map((lnk, li) => (
                        <a key={li} href={lnk.h} target="_blank" rel="noreferrer"
                          className={`font-[var(--font-inter)] font-semibold text-[0.68rem] px-3 py-1.5 rounded-lg transition-all duration-200 no-underline ${
                            li === 0
                              ? "bg-[#e63946] text-white hover:bg-[#c42e3a]"
                              : "border border-[#1a1a2e]/12 text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-white"
                          }`}>
                          {lnk.l} ↗
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}

            {/* ── Rotation arrows ── */}
            <button onClick={() => rotate(-1)} disabled={isAnimating}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-11 h-11 rounded-full bg-white border border-[#1a1a2e]/10 shadow-md flex items-center justify-center text-[#1a1a2e] hover:bg-[#e63946] hover:text-white hover:border-[#e63946] transition-all duration-200 disabled:opacity-40 z-30">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button onClick={() => rotate(1)} disabled={isAnimating}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-11 h-11 rounded-full bg-white border border-[#1a1a2e]/10 shadow-md flex items-center justify-center text-[#1a1a2e] hover:bg-[#e63946] hover:text-white hover:border-[#e63946] transition-all duration-200 disabled:opacity-40 z-30">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* ── Group dots ── */}
          <div className="flex items-center gap-3 mt-10">
            {Array.from({ length: totalGroups }).map((_, g) => (
              <button key={g} onClick={() => goToGroup(g)}
                className={`transition-all duration-300 rounded-full ${g === activeGroup ? "w-8 h-2.5 bg-[#e63946]" : "w-2.5 h-2.5 bg-[#1a1a2e]/15 hover:bg-[#e63946]/40"}`} />
            ))}
          </div>

          {/* ── Rotate hint ── */}
          <p className="font-[var(--font-jetbrains)] text-[0.6rem] text-[#9ca3af] tracking-[2px] uppercase mt-4">
            ← rotate wheel to explore all {PROJECTS.length} projects →
          </p>
        </div>

        {/* ── MOBILE: vertical stack ── */}
        <div className="md:hidden mt-10 flex flex-col gap-4">
          {PROJECTS.map((p, i) => (
            <div key={i}
              className={`relative bg-white/80 backdrop-blur-md border border-[#1a1a2e]/8 rounded-2xl p-5 overflow-hidden transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 50 + 100}ms` }}>
              <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${p.c} rounded-t-2xl`} />
              <span className={`inline-flex font-[var(--font-jetbrains)] text-[0.55rem] tracking-wider px-2.5 py-1 rounded-full border w-fit mb-3 ${p.tc}`}>{p.tag}</span>
              <h3 className="font-[var(--font-syne)] font-bold text-[0.95rem] text-[#1a1a2e] mb-2">{p.name}</h3>
              <p className="font-[var(--font-inter)] text-[0.84rem] text-[#374151] leading-relaxed mb-3">{p.desc}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {p.stack.map(s => (
                  <span key={s} className="font-[var(--font-jetbrains)] text-[0.55rem] px-2 py-0.5 rounded bg-[#eaeaf2] border border-[#1a1a2e]/8 text-[#6b6b8d]">{s}</span>
                ))}
              </div>
              <div className="flex gap-2">
                {p.links.map((lnk, li) => (
                  <a key={li} href={lnk.h} target="_blank" rel="noreferrer"
                    className={`font-[var(--font-inter)] font-semibold text-[0.72rem] px-3.5 py-2 rounded-lg transition-all no-underline ${li === 0 ? "bg-[#e63946] text-white" : "border border-[#1a1a2e]/12 text-[#1a1a2e]"}`}>
                    {lnk.l} ↗
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @keyframes hingeIn {
          from { opacity: 0; transform: translate(-50%, -50%) rotateY(-90deg) scale(0.8); }
          to   { opacity: 1; transform: translate(-50%, -50%) rotateY(0deg)   scale(1);   }
        }
      `}</style>
    </section>
  )
}