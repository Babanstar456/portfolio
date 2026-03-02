"use client"

import { useEffect, useRef, useState } from "react"

const EXP = [
  { co: "ALCOVE REALTY", ro: "Product Engineering Intern", dt: "Feb 2026 \u2014 Present", ds: "On-site full-stack engineering in Kolkata. Designing MySQL schemas and building modern web stack features for a real-estate platform serving thousands of listings." },
  { co: "TECHACON SOLUTIONS", ro: "Backend & Full-Stack Developer", dt: "Feb 2025 \u2014 Present", ds: "End-to-end development across 20+ technologies. Architecting scalable REST APIs, backend services, and responsive frontends for diverse client projects." },
  { co: "TATHAGATA SENGUPTA VENTURES", ro: "CEO & Founder", dt: "Jan 2025 \u2014 Present", ds: "Founding and managing multiple ventures across tech, wearables, food delivery, and marketing. Building products from zero \u2014 architecture through go-to-market." },
  { co: "KHAWW", ro: "Chief Operating Officer", dt: "Feb 2025 \u2014 Present", ds: "Digitizing Kolkata's legendary dabbawala food delivery network. Leading operations, vendor relations, sales strategy, and platform development." },
  { co: "B.K. PAUL & ASSOCIATES", ro: "Engineering PM Specialist", dt: "Jan 2025 \u2014 Present", ds: "Driving infrastructure cost reduction through CAD, CAM, and 3D modelling tools for commercial construction and engineering projects." },
  { co: "TATA CONSULTANCY SERVICES", ro: "Security Consultant Intern", dt: "May \u2013 Dec 2023", ds: "DDoS mitigation architecture and ER diagram audits. Security assessments for enterprise production systems at scale." },
]

export function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} id="experience" className="relative z-10 py-24 px-[5%] md:px-[7%]">
      <div className="max-w-[1280px] mx-auto">
        <div className={`transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-5 h-[1.5px] bg-[#e63946]" />
            <span className="font-[var(--font-jetbrains)] text-[0.65rem] text-[#e63946] tracking-[2.5px] uppercase">
              03 — Experience
            </span>
          </div>
          <h2 className="font-[var(--font-syne)] font-extrabold text-[clamp(2rem,4.5vw,3.2rem)] text-[#1a1a2e] tracking-tight leading-tight mb-3 text-balance">
            {"Where I've "}
            <span className="text-[#e63946]">Worked</span>
          </h2>
          <p className="font-[var(--font-inter)] text-[0.95rem] text-[#6b6b8d] max-w-[460px] leading-relaxed">
            Roles across product engineering, startup leadership, and enterprise consulting.
          </p>
        </div>

        <div className="relative pl-8 mt-12">
          {/* Timeline line */}
          <div
            className="absolute left-[5px] top-2 bottom-2 w-[2px]"
            style={{
              background: "linear-gradient(180deg, #e63946, #0ff0fc 50%, rgba(26,26,46,0.1))",
            }}
          />

          {EXP.map((e, i) => (
            <div
              key={i}
              className={`relative mb-7 transition-all duration-700 ${
                vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${200 + i * 80}ms` }}
            >
              {/* Timeline dot */}
              <div
                className="absolute -left-[27px] top-[14px] w-3 h-3 rounded-full border-2 border-[#e63946] bg-[#f0eff4] z-10 transition-all duration-300 group-hover:bg-[#e63946]"
                style={{
                  boxShadow: "0 0 0 4px rgba(230,57,70,0.1)",
                }}
              />

              <div className="bg-white/70 backdrop-blur-md border border-[#1a1a2e]/8 rounded-xl p-6 transition-all duration-300 hover:border-[#e63946]/20 hover:shadow-[0_8px_30px_rgba(26,26,46,0.08)] hover:translate-x-2 group">
                <div className="font-[var(--font-syne)] font-bold text-[0.78rem] tracking-[1.8px] uppercase text-[#e63946] mb-1">
                  {e.co}
                </div>
                <div className="font-[var(--font-inter)] font-semibold text-[1.02rem] text-[#1a1a2e] mb-1">
                  {e.ro}
                </div>
                <div className="font-[var(--font-jetbrains)] text-[0.6rem] text-[#6b6b8d] tracking-[1.5px] mb-3">
                  {e.dt}
                </div>
                <div className="font-[var(--font-inter)] text-[0.9rem] text-[#374151] leading-relaxed">
                  {e.ds}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
