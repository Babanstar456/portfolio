"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "left" | "right" | "rotate" | "scale"
  /** Scroll-driven rotation (degrees) per 100px scroll */
  scrollRotate?: number
  /** Scroll-driven opacity shift: fade in as element scrolls into view */
  scrollOpacity?: boolean
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  scrollRotate = 0,
  scrollOpacity = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVis(true)
      },
      { threshold: 0.07 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!scrollRotate && !scrollOpacity) return

    const handler = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const vh = window.innerHeight
      // Progress from 0 (just entering bottom) to 1 (at center or past)
      const progress = Math.max(0, Math.min(1, 1 - rect.top / vh))
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handler, { passive: true })
    handler()
    return () => window.removeEventListener("scroll", handler)
  }, [scrollRotate, scrollOpacity])

  const baseTransforms: Record<string, string> = {
    up: "translateY(40px)",
    left: "translateX(-40px)",
    right: "translateX(40px)",
    rotate: "rotate(-5deg) translateY(30px)",
    scale: "scale(0.88)",
  }

  const inactiveTransform = baseTransforms[direction] || "translateY(40px)"

  const rotateValue = scrollRotate ? scrollProgress * scrollRotate : 0
  const opacityValue = scrollOpacity ? 0.3 + scrollProgress * 0.7 : vis ? 1 : 0

  const dynamicTransform = vis
    ? scrollRotate
      ? `rotate(${rotateValue}deg)`
      : "none"
    : inactiveTransform

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: scrollOpacity ? opacityValue : vis ? 1 : 0,
        transform: dynamicTransform,
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
