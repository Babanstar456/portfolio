"use client"

import { useEffect, useRef, useState } from "react"

const CONTACTS = [
  { ic: "@", lb: "EMAIL", vl: "tathagata456@gmail.com", href: "mailto:tathagata456@gmail.com" },
  { ic: "WA", lb: "WHATSAPP", vl: "+91 8167014019", href: "https://wa.me/918167014019" },
  { ic: "in", lb: "LINKEDIN", vl: "linkedin.com/in/tathaaa", href: "https://www.linkedin.com/in/tathaaa/" },
  { ic: "GH", lb: "GITHUB", vl: "github.com/Babanstar456", href: "https://github.com/Babanstar456" },
  { ic: "\u2197", lb: "WEBSITE", vl: "tathagatasengupta.in", href: "https://tathagatasengupta.in" },
]

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", subject: "", msg: "" })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const m = encodeURIComponent(
      `*Portfolio Contact*\n\n*Name:* ${form.name}\n*Email:* ${form.email}\n*Subject:* ${form.subject}\n\n*Message:*\n${form.msg}`
    )
    window.open(`https://wa.me/918167014019?text=${m}`, "_blank")
    setSent(true)
  }

  return (
    <section ref={ref} id="contact" className="relative z-10 py-24 px-[5%] md:px-[7%]">
      <div className="max-w-[1280px] mx-auto">
        <div className={`text-center max-w-[520px] mx-auto mb-12 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-5 h-[1.5px] bg-[#e63946]" />
            <span className="font-[var(--font-jetbrains)] text-[0.65rem] text-[#e63946] tracking-[2.5px] uppercase">
              06 — Contact
            </span>
          </div>
          <h2 className="font-[var(--font-syne)] font-extrabold text-[clamp(2rem,4.5vw,3.2rem)] text-[#1a1a2e] tracking-tight leading-tight mb-3 text-balance text-center">
            {"Let's "}
            <span className="text-[#e63946]">Connect</span>
          </h2>
          <p className="font-[var(--font-inter)] text-[0.95rem] text-[#6b6b8d] leading-relaxed text-center">
            Open to React.js, full-stack, and AI/ML engineering roles. Available in Kolkata or remote.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-10 md:gap-12">
          {/* Contact links */}
          <div>
            <div className="flex flex-col gap-3">
              {CONTACTS.map((c, i) => (
                <a
                  key={i}
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-4 p-4 bg-white/70 backdrop-blur-md border border-[#1a1a2e]/8 rounded-xl no-underline transition-all duration-300 hover:border-[#e63946]/20 hover:shadow-[0_4px_20px_rgba(26,26,46,0.08)] hover:translate-x-2 ${
                    vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: `${300 + i * 70}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#e63946]/7 border border-[#e63946]/15 flex items-center justify-center font-[var(--font-inter)] font-bold text-[0.68rem] text-[#e63946] flex-shrink-0">
                    {c.ic}
                  </div>
                  <div>
                    <div className="font-[var(--font-jetbrains)] text-[0.54rem] text-[#6b6b8d] tracking-[1.8px] mb-0.5">
                      {c.lb}
                    </div>
                    <div className="font-[var(--font-inter)] text-[0.9rem] font-medium text-[#1a1a2e]">
                      {c.vl}
                    </div>
                  </div>
                </a>
              ))}
            </div>
            <div
              className={`mt-4 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: "650ms" }}
            >
              <a
                href="https://tathagatasengupta.in"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-lg font-[var(--font-inter)] font-semibold text-[0.85rem] text-white bg-[#e63946] shadow-[0_4px_14px_rgba(230,57,70,0.3)] transition-all duration-300 hover:bg-[#c42e3a] hover:shadow-[0_7px_22px_rgba(230,57,70,0.4)] hover:-translate-y-[2px] no-underline"
              >
                {"↓ Download CV / Resume"}
              </a>
            </div>
          </div>

          {/* Form */}
          <div
            className={`bg-white/70 backdrop-blur-md border border-[#1a1a2e]/8 rounded-xl p-8 relative overflow-hidden transition-all duration-700 delay-400 ${
              vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Top gradient */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#e63946] to-[#0ff0fc] rounded-t-xl" />

            {!sent ? (
              <form onSubmit={handleSubmit}>
                <h3 className="font-[var(--font-syne)] font-bold text-[1.08rem] text-[#1a1a2e] mb-1">
                  Send a Message
                </h3>
                <p className="font-[var(--font-jetbrains)] text-[0.58rem] text-[#6b6b8d] tracking-[1.3px] mb-7">
                  MESSAGES ROUTE DIRECTLY TO WHATSAPP
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-[var(--font-jetbrains)] text-[0.58rem] text-[#6b6b8d] tracking-[1.5px]">
                      YOUR NAME
                    </label>
                    <input
                      className="bg-[#f0eff4] border-[1.5px] border-[#1a1a2e]/10 rounded-lg px-3.5 py-2.5 font-[var(--font-inter)] text-[0.95rem] text-[#1a1a2e] outline-none transition-all duration-200 focus:border-[#e63946] focus:shadow-[0_0_0_3px_rgba(230,57,70,0.09)] placeholder:text-[#6b6b8d]/50"
                      placeholder="Jane Smith"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-[var(--font-jetbrains)] text-[0.58rem] text-[#6b6b8d] tracking-[1.5px]">
                      EMAIL
                    </label>
                    <input
                      className="bg-[#f0eff4] border-[1.5px] border-[#1a1a2e]/10 rounded-lg px-3.5 py-2.5 font-[var(--font-inter)] text-[0.95rem] text-[#1a1a2e] outline-none transition-all duration-200 focus:border-[#e63946] focus:shadow-[0_0_0_3px_rgba(230,57,70,0.09)] placeholder:text-[#6b6b8d]/50"
                      type="email"
                      placeholder="you@company.com"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 mb-3">
                  <label className="font-[var(--font-jetbrains)] text-[0.58rem] text-[#6b6b8d] tracking-[1.5px]">
                    SUBJECT
                  </label>
                  <input
                    className="bg-[#f0eff4] border-[1.5px] border-[#1a1a2e]/10 rounded-lg px-3.5 py-2.5 font-[var(--font-inter)] text-[0.95rem] text-[#1a1a2e] outline-none transition-all duration-200 focus:border-[#e63946] focus:shadow-[0_0_0_3px_rgba(230,57,70,0.09)] placeholder:text-[#6b6b8d]/50"
                    placeholder="React Dev Role / Collaboration / Freelance"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-1.5 mb-5">
                  <label className="font-[var(--font-jetbrains)] text-[0.58rem] text-[#6b6b8d] tracking-[1.5px]">
                    MESSAGE
                  </label>
                  <textarea
                    className="bg-[#f0eff4] border-[1.5px] border-[#1a1a2e]/10 rounded-lg px-3.5 py-2.5 font-[var(--font-inter)] text-[0.95rem] text-[#1a1a2e] outline-none resize-y min-h-[108px] transition-all duration-200 focus:border-[#e63946] focus:shadow-[0_0_0_3px_rgba(230,57,70,0.09)] placeholder:text-[#6b6b8d]/50"
                    placeholder="Tell me about the opportunity..."
                    value={form.msg}
                    onChange={(e) => setForm({ ...form, msg: e.target.value })}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#e63946] text-white font-[var(--font-inter)] font-semibold text-[0.85rem] tracking-wider rounded-lg shadow-[0_4px_14px_rgba(230,57,70,0.3)] transition-all duration-300 hover:bg-[#c42e3a] hover:-translate-y-[2px] hover:shadow-[0_7px_22px_rgba(230,57,70,0.4)]"
                >
                  {"Send Message →"}
                </button>
              </form>
            ) : (
              <div className="text-center py-16 px-5">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#15803d]/10 border border-[#15803d]/20 flex items-center justify-center mb-5">
                  <svg className="w-7 h-7 text-[#15803d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="font-[var(--font-syne)] font-bold text-[1.15rem] text-[#15803d] mb-3">
                  Message Sent!
                </div>
                <div className="font-[var(--font-jetbrains)] text-[0.62rem] text-[#6b6b8d] tracking-[1.3px] mb-6">
                  {"ROUTED TO WHATSAPP \u2014 EXPECT A QUICK REPLY."}
                </div>
                <button
                  onClick={() => setSent(false)}
                  className="px-6 py-2.5 bg-transparent text-[#1a1a2e] border-[1.5px] border-[#1a1a2e]/15 rounded-lg font-[var(--font-inter)] font-semibold text-[0.8rem] transition-all duration-200 hover:bg-[#1a1a2e] hover:text-white"
                >
                  Send Another
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
