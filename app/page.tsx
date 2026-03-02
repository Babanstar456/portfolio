"use client"

import { useState, useEffect, useCallback } from "react"
import { LoadingScreen } from "@/components/portfolio/loading-screen"
import { Navigation } from "@/components/portfolio/navigation"
import { HeroSection } from "@/components/portfolio/hero-section"
import { StatsBar } from "@/components/portfolio/stats-bar"
import { AboutSection } from "@/components/portfolio/about-section"
import { OrbitSection } from "@/components/portfolio/orbit-section"
import { ExperienceSection } from "@/components/portfolio/experience-section"
import { ProjectsSection } from "@/components/portfolio/projects-section"
import { SkillsSection } from "@/components/portfolio/skills-section"
import { ContactSection } from "@/components/portfolio/contact-section"
import { Particles, Footer } from "@/components/portfolio/particles"

export default function PortfolioPage() {
  const [loaded, setLoaded] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  const handleComplete = useCallback(() => setLoaded(true), [])

  useEffect(() => {
    if (!loaded) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [loaded])

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <main className="relative overflow-x-hidden" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
      {/* Loading Screen */}
      <LoadingScreen onComplete={handleComplete} />

      {/* Particles & Background */}
      <Particles />

      {/* Custom scrollbar styles */}
      <style>{`
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: rgba(26,26,46,0.05); }
        ::-webkit-scrollbar-thumb { background: #e63946; border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: #c42e3a; }

        html { scroll-behavior: smooth; }
        
        ::selection {
          background: rgba(230,57,70,0.15);
          color: #1a1a2e;
        }
      `}</style>

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <div
        className={`relative z-[2] transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
      >
        {/* Hero */}
        <HeroSection scrollY={scrollY} />

        {/* Stats */}
        <StatsBar />

        {/* Divider */}
        <div className="h-[1px] bg-[#1a1a2e]/8 mx-[5%] md:mx-[7%] relative z-10" />

        {/* About */}
        <AboutSection scrollY={scrollY} />

        {/* Divider */}
        <div className="h-[1px] bg-[#1a1a2e]/8 mx-[5%] md:mx-[7%] relative z-10" />

        {/* Orbit (Skills Visual) */}
        <OrbitSection />

        {/* Divider */}
        <div className="h-[1px] relative z-10" style={{ margin: 0 }} />

        {/* Experience */}
        <ExperienceSection />

        {/* Divider */}
        <div className="h-[1px] bg-[#1a1a2e]/8 mx-[5%] md:mx-[7%] relative z-10" />

        {/* Projects */}
        <ProjectsSection />

        {/* Divider */}
        <div className="h-[1px] bg-[#1a1a2e]/8 mx-[5%] md:mx-[7%] relative z-10" />

        {/* Skills */}
        <SkillsSection />

        {/* Divider */}
        <div className="h-[1px] bg-[#1a1a2e]/8 mx-[5%] md:mx-[7%] relative z-10" />

        {/* Contact */}
        <ContactSection />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  )
}
