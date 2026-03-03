"use client"

import { useEffect, useRef, useState } from "react"

const TESTIMONIALS = [
  {
    name: "Arun Adhikary",
    role: "Founder & CEO @ InDiiServe.ai",
    relation: "Client",
    date: "January 2026",
    avatar: "AA",
    text: "Tathagata is a true Young Entrepreneur with a zeal to build something which has not only a value but should have a social impact. Business with the balance from GenZ is an exceptional trade. He is always open to learning and this right attitude makes him different from others. He has worked with our Projects and demonstrated agility to accomplish the target. I definitely recommend him for any Tech Projects for any business we want to grow!",
  },
  {
    name: "Prasun Banerjee",
    role: "Chief Growth Officer @ Change Activate",
    relation: "Mentor",
    date: "October 2025",
    avatar: "PB",
    text: "I had the pleasure of mentoring Tathagata, and I can confidently recommend him for his exceptional drive and adaptability. Tathagata demonstrates a strong commitment to personal and professional growth, quickly grasping life skills and industry-relevant concepts. His proactive approach, coupled with a keen ability to apply feedback, makes him a valuable asset in any professional setting.",
  },
  {
    name: "Koustav Mukherjee",
    role: "Assistant Professor @ TNU | Full Stack Developer",
    relation: "Teacher",
    date: "October 2025",
    avatar: "KM",
    text: "Tathagata is a hardworking and sincere student who shows great enthusiasm for learning. Their analytical skills and discipline make them an asset to any academic or research environment.",
  },
]

const RELATION_COLORS: Record<string, string> = {
  Client: "bg-[#e63946]/10 text-[#e63946] border-[#e63946]/20",
  Mentor: "bg-[#1a1a2e]/8 text-[#1a1a2e] border-[#1a1a2e]/15",
  Teacher: "bg-emerald-50 text-emerald-700 border-emerald-200",
}

export function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true) },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const goTo = (i: number) => {
    if (i === active || animating) return
    setAnimating(true)
    setTimeout(() => {
      setActive(i)
      setAnimating(false)
    }, 220)
  }

  const t = TESTIMONIALS[active]

  return (
    <section ref={ref} id="testimonials" className="relative z-10 py-24 px-[5%] md:px-[7%]">
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <div className={`transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-5 h-[1.5px] bg-[#e63946]" />
            <span className="font-[var(--font-jetbrains)] text-[0.65rem] text-[#e63946] tracking-[2.5px] uppercase">
              03 — Testimonials
            </span>
          </div>
          <h2 className="font-[var(--font-syne)] font-extrabold text-[clamp(2rem,4.5vw,3.2rem)] text-[#1a1a2e] tracking-tight leading-tight mb-3 text-balance">
            What People <span className="text-[#e63946]">Say</span>
          </h2>
          <p className="font-[var(--font-inter)] text-[0.95rem] text-[#374151] max-w-xl">
            Perspectives from clients, mentors, and educators I've had the privilege of working with.
          </p>
        </div>

        {/* Main Card + Sidebar */}
        <div className={`mt-12 grid grid-cols-1 md:grid-cols-[1fr_260px] gap-6 transition-all duration-700 delay-200 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>

          {/* Active Card */}
          <div
            className={`relative rounded-2xl border border-[#1a1a2e]/8 bg-white p-8 md:p-10 flex flex-col justify-between min-h-[320px] shadow-[0_4px_32px_rgba(26,26,46,0.06)] transition-all duration-220 ${animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}
          >
            {/* Quote mark */}
            <span
              className="absolute top-6 right-8 font-[var(--font-syne)] text-[6rem] leading-none text-[#e63946]/8 select-none pointer-events-none"
              aria-hidden
            >
              "
            </span>

            {/* Body */}
            <p className="font-[var(--font-inter)] text-[1rem] text-[#374151] leading-relaxed relative z-10 max-w-2xl">
              "{t.text}"
            </p>

            {/* Footer */}
            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-[#1a1a2e]/6">
              {/* Avatar */}
              <div className="w-11 h-11 rounded-full bg-[#e63946] flex items-center justify-center flex-shrink-0">
                <span className="font-[var(--font-syne)] font-bold text-white text-[0.75rem] tracking-wide">
                  {t.avatar}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-[var(--font-syne)] font-semibold text-[#1a1a2e] text-[0.9rem] leading-snug truncate">
                  {t.name}
                </p>
                <p className="font-[var(--font-inter)] text-[0.72rem] text-[#6b7280] mt-0.5 leading-snug line-clamp-1">
                  {t.role}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                <span className={`font-[var(--font-jetbrains)] text-[0.55rem] px-2.5 py-1 rounded-full border tracking-widest uppercase ${RELATION_COLORS[t.relation]}`}>
                  {t.relation}
                </span>
                <span className="font-[var(--font-jetbrains)] text-[0.58rem] text-[#9ca3af] tracking-wider">
                  {t.date}
                </span>
              </div>
            </div>
          </div>

          {/* Sidebar — stacked nav cards */}
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-x-visible pb-1 md:pb-0">
            {TESTIMONIALS.map((item, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`
                  flex-none md:flex-1 text-left rounded-xl border px-4 py-3.5 transition-all duration-200 w-[200px] md:w-auto
                  ${i === active
                    ? "border-[#e63946]/40 bg-[#e63946]/5 shadow-[0_2px_12px_rgba(230,57,70,0.1)]"
                    : "border-[#1a1a2e]/8 bg-white hover:border-[#e63946]/20 hover:bg-[#e63946]/3"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${i === active ? "bg-[#e63946]" : "bg-[#1a1a2e]/8"}`}>
                    <span className={`font-[var(--font-syne)] font-bold text-[0.6rem] tracking-wide ${i === active ? "text-white" : "text-[#1a1a2e]"}`}>
                      {item.avatar}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className={`font-[var(--font-syne)] font-semibold text-[0.78rem] leading-snug truncate transition-colors duration-200 ${i === active ? "text-[#e63946]" : "text-[#1a1a2e]"}`}>
                      {item.name.split(" ")[0]} {item.name.split(" ")[1]}
                    </p>
                    <span className={`font-[var(--font-jetbrains)] text-[0.52rem] tracking-widest uppercase ${RELATION_COLORS[item.relation]} px-1.5 py-0.5 rounded-full border inline-block mt-1`}>
                      {item.relation}
                    </span>
                  </div>
                </div>
                {/* Active indicator bar */}
                {i === active && (
                  <div className="mt-2.5 h-[2px] w-full rounded-full bg-[#e63946]/30" />
                )}
              </button>
            ))}
          </div>

        </div>

        {/* Dot navigation — mobile only */}
        <div className="flex md:hidden justify-center gap-2 mt-6">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-200 rounded-full ${i === active ? "w-5 h-1.5 bg-[#e63946]" : "w-1.5 h-1.5 bg-[#1a1a2e]/20"}`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}