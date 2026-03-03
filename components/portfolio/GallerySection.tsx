"use client"
import { useEffect, useRef, useState } from "react"

const GALLERY_ITEMS = [
  { src: "1.jpg", caption: "SIH 2025 Grand Finals,GIET Gunupur", tag: "Hackathon" },
  { src: "2.jpg", caption: "InCubES 2025 Investor Summit", tag: "Venture" },
  { src: "3.jpg", caption: "Prayas 2024 TIB Hackathon", tag: "Mechanical Project on Energy & Sustainability" },
  { src: "4.jpg", caption: "AISC 2024 Research Paper Conference", tag: "Work" },
  { src: "5.jpg", caption: "BPPIMT Business Meet Winner", tag: "Life" },
  { src: "6.jpg", caption: "Exuberance College Sports Trophy", tag: "College" },
]

export function GallerySection() {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  const [active, setActive] = useState<number | null>(null)
  // stores "landscape" | "portrait" | "square" per index once loaded
  const [orientations, setOrientations] = useState<Record<number, string>>({})

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true) },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setActive(null) }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  // Detect orientation for each image
  useEffect(() => {
    GALLERY_ITEMS.forEach((item, i) => {
      const img = new Image()
      img.onload = () => {
        const ratio = img.naturalWidth / img.naturalHeight
        setOrientations(prev => ({
          ...prev,
          [i]: ratio > 1.15 ? "landscape" : ratio < 0.87 ? "portrait" : "square",
        }))
      }
      img.src = item.src
    })
  }, [])

  // Returns padding-bottom % to create the right intrinsic ratio box
  const getPadding = (i: number) => {
    const o = orientations[i]
    if (o === "portrait") return "133.33%"   // 3:4
    if (o === "square")   return "100%"       // 1:1
    return "66.67%"                           // 3:2 landscape (default while loading too)
  }

  return (
    <>
      <section ref={ref} id="gallery" className="relative z-10 py-24 px-[5%] md:px-[7%]">
        <div className="max-w-[1280px] mx-auto">

          {/* Header */}
          <div className={`transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-5 h-[1.5px] bg-[#e63946]" />
              <span className="font-[var(--font-jetbrains)] text-[0.65rem] text-[#e63946] tracking-[2.5px] uppercase">
                02 — Gallery
              </span>
            </div>
            <h2 className="font-[var(--font-syne)] font-extrabold text-[clamp(2rem,4.5vw,3.2rem)] text-[#1a1a2e] tracking-tight leading-tight mb-3 text-balance">
              Moments &amp; <span className="text-[#e63946]">Milestones</span>
            </h2>
            <p className="font-[var(--font-inter)] text-[0.95rem] text-[#374151] max-w-xl">
              A glimpse into the builds, teams, and moments that shaped the journey.
            </p>
          </div>

          {/* Desktop — masonry via CSS columns */}
          <div className="hidden md:block mt-12">
            <div className="columns-3 gap-4 space-y-0">
              {GALLERY_ITEMS.map((item, i) => (
                <div
                  key={i}
                  onClick={() => setActive(i)}
                  className={`
                    relative break-inside-avoid mb-4 rounded-2xl overflow-hidden cursor-pointer group
                    border border-[#1a1a2e]/8 transition-all duration-700
                    ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
                  `}
                  style={{ transitionDelay: `${i * 80 + 200}ms` }}
                >
                  {/* Natural-ratio intrinsic box */}
                  <div className="relative w-full" style={{ paddingBottom: getPadding(i) }}>
                    <img
                      src={item.src}
                      alt={item.caption}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/80 via-[#1a1a2e]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {/* Caption */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="font-[var(--font-jetbrains)] text-[0.55rem] px-2 py-1 rounded-full bg-[#e63946] text-white tracking-widest uppercase mb-2 inline-block">
                        {item.tag}
                      </span>
                      <p className="font-[var(--font-syne)] font-semibold text-white text-[0.85rem] leading-tight">
                        {item.caption}
                      </p>
                    </div>
                    {/* Expand icon */}
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile — single column, each image natural ratio */}
          <div className="md:hidden mt-10 flex flex-col gap-4">
            {GALLERY_ITEMS.map((item, i) => (
              <div
                key={i}
                onClick={() => setActive(i)}
                className={`
                  relative rounded-2xl overflow-hidden cursor-pointer border border-[#1a1a2e]/8
                  transition-all duration-700
                  ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                `}
                style={{ transitionDelay: `${i * 60 + 100}ms` }}
              >
                <div className="relative w-full" style={{ paddingBottom: getPadding(i) }}>
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/75 via-[#1a1a2e]/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <span className="font-[var(--font-jetbrains)] text-[0.5rem] px-2 py-0.5 rounded-full bg-[#e63946] text-white tracking-widest uppercase mb-1 inline-block">
                      {item.tag}
                    </span>
                    <p className="font-[var(--font-syne)] font-semibold text-white text-[0.78rem] leading-tight">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Lightbox — always object-contain, never crops */}
      {active !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1a2e]/92 backdrop-blur-md p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl bg-[#0f0f1a]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={GALLERY_ITEMS[active].src}
              alt={GALLERY_ITEMS[active].caption}
              className="w-full h-auto block max-h-[82vh] object-contain mx-auto"
            />
            <div className="absolute bottom-0 left-0 right-0 px-5 py-4 bg-gradient-to-t from-[#0f0f1a] to-transparent">
              <span className="font-[var(--font-jetbrains)] text-[0.55rem] px-2 py-1 rounded-full bg-[#e63946] text-white tracking-widest uppercase mb-1 inline-block">
                {GALLERY_ITEMS[active].tag}
              </span>
              <p className="font-[var(--font-syne)] font-semibold text-white text-[1rem]">
                {GALLERY_ITEMS[active].caption}
              </p>
            </div>
            <button
              onClick={() => setActive((active - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setActive((active + 1) % GALLERY_ITEMS.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={() => setActive(null)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#e63946] transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Image counter */}
            <div className="absolute top-3 left-3 font-[var(--font-jetbrains)] text-[0.6rem] text-white/60 tracking-widest bg-black/30 px-2.5 py-1 rounded-full backdrop-blur-sm">
              {active + 1} / {GALLERY_ITEMS.length}
            </div>
          </div>
        </div>
      )}
    </>
  )
}