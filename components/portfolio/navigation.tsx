"use client"

import { useState, useEffect } from "react"

const NAV_LINKS = ["about", "experience", "projects", "skills", "contact"]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[500] h-[66px] px-[5%] md:px-[7%] flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? "bg-[#f0eff4]/95 backdrop-blur-2xl shadow-[0_2px_30px_rgba(26,26,46,0.08)] border-b border-[#e63946]/20"
            : "bg-[#f0eff4]/80 backdrop-blur-xl border-b border-transparent"
        }`}
      >
        <a href="#" className="font-[var(--font-syne)] font-extrabold text-lg tracking-wider text-[#1a1a2e] relative group">
          TS<span className="text-[#e63946]">.</span>
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#e63946] transition-all duration-300 group-hover:w-full" />
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {NAV_LINKS.map((s) => (
            <li key={s}>
              <a
                href={`#${s}`}
                className="font-[var(--font-inter)] font-medium text-[0.8rem] text-[#6b6b8d] tracking-wider uppercase no-underline relative transition-colors duration-200 hover:text-[#1a1a2e] group"
              >
                {s}
                <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#e63946] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16a34a] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16a34a]" />
          </span>
          <span className="font-[var(--font-jetbrains)] text-[0.6rem] tracking-[1.5px] text-[#15803d] uppercase">
            Open to Work
          </span>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-[5px] z-[600]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span
            className={`w-6 h-[2px] bg-[#1a1a2e] transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`w-4 h-[2px] bg-[#e63946] transition-all duration-300 ${
              menuOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-[#1a1a2e] transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[499] md:hidden transition-all duration-500 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        style={{
          background: "linear-gradient(135deg, #f0eff4 0%, #e8e8f0 100%)",
          backdropFilter: "blur(30px)",
        }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {NAV_LINKS.map((s, i) => (
            <a
              key={s}
              href={`#${s}`}
              onClick={() => setMenuOpen(false)}
              className="font-[var(--font-syne)] font-bold text-3xl text-[#1a1a2e] tracking-wider uppercase no-underline transition-all duration-300 hover:text-[#e63946] hover:tracking-[8px]"
              style={{
                animation: menuOpen ? `mobileNavIn 0.5s ${i * 0.08}s ease both` : "none",
              }}
            >
              {s}
            </a>
          ))}
          <div
            className="flex items-center gap-3 mt-4"
            style={{ animation: menuOpen ? "mobileNavIn 0.5s 0.4s ease both" : "none" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16a34a] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16a34a]" />
            </span>
            <span className="font-[var(--font-jetbrains)] text-[0.7rem] tracking-[2px] text-[#15803d]">
              AVAILABLE FOR WORK
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes mobileNavIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </>
  )
}
