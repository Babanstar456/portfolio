"use client"

import { useEffect, useRef, useState } from "react"

const PROJECTS = [
  { c: "from-[#e63946] to-[#ff6b6b]", tc: "bg-[#e63946]/8 text-[#e63946] border-[#e63946]/20", tag: "SIH 2025 Grand Finalist", name: "SURYADUT \u2014 Solar Dewatering System", desc: "IoT solar dewatering platform for mining operations. Magnetic piston generator, floating mobile platform, ESP32 + Grafana monitoring. Cuts diesel costs by 50% with pay-as-you-go OPEX.", stack: ["ESP32", "LoRa", "MQTT", "Grafana", "Next.js", "MySQL", "Solar IoT"], links: [{ l: "Live Demo", h: "https://fancy-gumption-ec4362.netlify.app/" }, { l: "Video", h: "https://youtu.be/YkadWFia1aU" }] },
  { c: "from-[#1a1a2e] to-[#2a2a4e]", tc: "bg-[#1a1a2e]/8 text-[#1a1a2e] border-[#1a1a2e]/18", tag: "Hackathon Winner", name: "RAWMART \u2014 Reverse Auction Platform", desc: "Real-time gamified bidding for street vendors and wholesalers. WebSocket-powered live auctions reduce procurement costs by 25\u201340%. Mobile-first Next.js + Node.js.", stack: ["Next.js", "Node.js", "WebSockets", "Express", "MySQL"], links: [{ l: "Live Demo", h: "http://rawmart.onrender.com/" }] },
  { c: "from-[#b8860b] to-[#d4a017]", tc: "bg-[#b8860b]/8 text-[#7a5a00] border-[#b8860b]/22", tag: "Full-Stack Project", name: "BECS \u2014 School Management System", desc: "End-to-end web-based school ERP. Responsive UI in HTML/CSS/JS, Node.js backend APIs, and SQL database design for secure data management and academic reporting.", stack: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "SQL"], links: [{ l: "Live Demo", h: "https://www.becsofficial.com" }] },
  { c: "from-[#e63946] to-[#ff6b6b]", tc: "bg-[#e63946]/8 text-[#e63946] border-[#e63946]/20", tag: "Client Work", name: "JM BIOTECH \u2014 Corporate Website", desc: "Fully responsive company website for JM Biotech. Custom layouts, interactive components, client-side form validation, and cross-browser compatibility.", stack: ["HTML", "CSS", "JavaScript"], links: [{ l: "Live Demo", h: "https://www.jmbiotech.in" }] },
  { c: "from-[#1a1a2e] to-[#2a2a4e]", tc: "bg-[#1a1a2e]/8 text-[#1a1a2e] border-[#1a1a2e]/18", tag: "Startup \u2014 COO", name: "KHAWW \u2014 Organized Dabbawala Network", desc: "Digitizing India's legendary dabbawala system with a digital ops platform, route optimization, and vendor management for Greater Kolkata food delivery.", stack: ["React", "Node.js", "Operations", "Supply Chain"], links: [{ l: "Download App", h: "https://play.google.com/store/apps/details?id=com.techaconsolutions.khaww/" }] },
  { c: "from-[#b8860b] to-[#d4a017]", tc: "bg-[#b8860b]/8 text-[#7a5a00] border-[#b8860b]/22", tag: "Client Work", name: "INDIISERVE \u2014 Service Marketplace", desc: "Full-stack service platform. Server-side logic, RESTful APIs, and relational database design. Translated complex business workflows into reliable technical architecture.", stack: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "SQL"], links: [{ l: "Live Demo", h: "https://www.indiiserve.com" }] },
  { c: "from-[#e63946] to-[#ff6b6b]", tc: "bg-[#e63946]/8 text-[#e63946] border-[#e63946]/20", tag: "Unpaid Client Work", name: "Tending to Infinity (Prototype)", desc: "A world class LMS system for our mathematics teacher Srijan Datta.", stack: ["Python", "IoT", "AI/ML", "Research", "IEEE", "Springer"], links: [{ l: "View Project", h: "https://github.com/Babanstar456/Tending-to-Infinity.git" }] },
  { c: "from-[#1a1a2e] to-[#2a2a4e]", tc: "bg-[#1a1a2e]/8 text-[#1a1a2e] border-[#1a1a2e]/18", tag: "In Progress", name: "Suryadut \u2014 Retail AI Assistant", desc: "AI,IOT Powered Dewatering based Solar and DC generation powered Dewatering system", stack: ["Python", "React", "Node.js", "LangChain", "AI/ML"], links: [{ l: "GitHub", h: "https://github.com/Babanstar456/SIH-Miningmotors_T72-GIET" }] },
  { c: "from-[#1a1a2e] to-[#2a2a4e]", tc: "bg-[#1a1a2e]/8 text-[#1a1a2e] border-[#1a1a2e]/18", tag: "In Progress", name: "Bengal Heritage Quest \u2014 Retail AI Assistant", desc: "Made a project to showcase the cultural heritage of Bengal through an interactive web platform.", stack: ["Python", "React", "Node.js", "LangChain", "AI/ML"], links: [{ l: "GitHub", h: "https://github.com/Babanstar456/bengal-heritage-quest" }] },
  { c: "from-[#1a1a2e] to-[#2a2a4e]", tc: "bg-[#1a1a2e]/8 text-[#1a1a2e] border-[#1a1a2e]/18", tag: "In Progress", name: "Bengal Heritage Quest \u2014 Retail AI Assistant", desc: "A EMI reminder system for users.", stack: ["Python", "React", "Node.js", "LangChain", "AI/ML"], links: [{ l: "GitHub", h: "https://github.com/Babanstar456/PingDue" }] },
]

export function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.05 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} id="projects" className="relative z-10 py-24 px-[5%] md:px-[7%] bg-[#1a1a2e]/[0.02]">
      <div className="max-w-[1280px] mx-auto">
        <div className={`transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-5 h-[1.5px] bg-[#e63946]" />
            <span className="font-[var(--font-jetbrains)] text-[0.65rem] text-[#e63946] tracking-[2.5px] uppercase">
              04 — Projects
            </span>
          </div>
          <h2 className="font-[var(--font-syne)] font-extrabold text-[clamp(2rem,4.5vw,3.2rem)] text-[#1a1a2e] tracking-tight leading-tight mb-3 text-balance">
            {"What I've "}
            <span className="text-[#e63946]">Built</span>
          </h2>
          <p className="font-[var(--font-inter)] text-[0.95rem] text-[#6b6b8d] max-w-[460px] leading-relaxed">
            From hackathon winners to live client work and published research.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-12">
          {PROJECTS.map((p, i) => (
            <div
              key={i}
              className={`group relative bg-white/70 backdrop-blur-md border border-[#1a1a2e]/8 rounded-xl p-6 flex flex-col transition-all duration-500 hover:border-[#e63946]/20 hover:shadow-[0_12px_40px_rgba(26,26,46,0.1)] hover:-translate-y-1 overflow-hidden ${
                vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${200 + i * 70}ms` }}
            >
              {/* Top gradient bar */}
              <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${p.c} rounded-t-xl`} />

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at 50% 0%, rgba(230,57,70,0.04) 0%, transparent 60%)",
                }}
              />

              <span className={`inline-flex items-center font-[var(--font-jetbrains)] text-[0.6rem] tracking-wider px-3 py-1 rounded-full border w-fit mb-4 ${p.tc}`}>
                {p.tag}
              </span>
              <h3 className="font-[var(--font-syne)] font-bold text-[1rem] text-[#1a1a2e] leading-tight mb-3">
                {p.name}
              </h3>
              <p className="font-[var(--font-inter)] text-[0.88rem] text-[#374151] leading-relaxed mb-4 flex-1">
                {p.desc}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="font-[var(--font-jetbrains)] text-[0.58rem] px-2 py-1 rounded bg-[#eaeaf2] border border-[#1a1a2e]/8 text-[#6b6b8d] tracking-wider transition-all duration-200 group-hover:border-[#e63946]/15 group-hover:text-[#374151]"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                {p.links.map((l, li) => (
                  <a
                    key={li}
                    href={l.h}
                    target="_blank"
                    rel="noreferrer"
                    className={`font-[var(--font-inter)] font-semibold text-[0.75rem] px-4 py-2 rounded-lg transition-all duration-200 no-underline ${
                      li === 0
                        ? "bg-[#e63946] text-white hover:bg-[#c42e3a] hover:shadow-[0_4px_12px_rgba(230,57,70,0.35)]"
                        : "bg-transparent text-[#1a1a2e] border-[1.5px] border-[#1a1a2e]/12 hover:bg-[#1a1a2e] hover:text-white"
                    }`}
                  >
                    {l.l} {"↗"}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
