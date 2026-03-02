"use client"

import { useEffect, useState, useCallback } from "react"

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">("loading")

  useEffect(() => {
    let p = 0
    const tick = () => {
      p += Math.random() * 3 + 1.2
      if (p > 100) p = 100
      setProgress(Math.floor(p))
      if (p < 100) {
        setTimeout(tick, 50)
      } else {
        setTimeout(() => setPhase("reveal"), 400)
        setTimeout(() => {
          setPhase("done")
          onComplete()
        }, 1400)
      }
    }
    setTimeout(tick, 300)
  }, [onComplete])

  if (phase === "done") return null

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center transition-all duration-[1200ms] ${
        phase === "reveal" ? "opacity-0 scale-110" : "opacity-100 scale-100"
      }`}
      style={{ background: "linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 40%, #16213e 100%)" }}
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(15,240,252,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(15,240,252,0.15) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            animation: "gridMove 4s linear infinite",
          }}
        />
      </div>

      {/* Glowing orbs */}
      <div
        className="absolute rounded-full blur-[100px] opacity-30"
        style={{
          width: 300,
          height: 300,
          background: "radial-gradient(circle, #e63946, transparent)",
          top: "20%",
          left: "20%",
          animation: "orbFloat 6s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full blur-[80px] opacity-20"
        style={{
          width: 200,
          height: 200,
          background: "radial-gradient(circle, #0ff0fc, transparent)",
          bottom: "20%",
          right: "25%",
          animation: "orbFloat 5s ease-in-out infinite reverse",
        }}
      />

      {/* Scanline effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Glitch name */}
        <div className="relative mb-2">
          <h1
            className="font-[var(--font-syne)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-[3px] text-white"
            style={{
              animation: "glitchText 3s ease-in-out infinite",
              textShadow: "0 0 40px rgba(230,57,70,0.5), 0 0 80px rgba(230,57,70,0.2)",
            }}
          >
            TATHAGATA
          </h1>
          {/* Glitch copies */}
          <h1
            className="absolute inset-0 font-[var(--font-syne)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-[3px] opacity-60"
            style={{
              color: "#0ff0fc",
              animation: "glitchLayer1 2.5s ease-in-out infinite",
              clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
            }}
            aria-hidden="true"
          >
            TATHAGATA
          </h1>
          <h1
            className="absolute inset-0 font-[var(--font-syne)] text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-[3px] opacity-60"
            style={{
              color: "#e63946",
              animation: "glitchLayer2 2.5s ease-in-out infinite",
              clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
            }}
            aria-hidden="true"
          >
            TATHAGATA
          </h1>
        </div>

        <p
          className="font-[var(--font-jetbrains)] text-[0.65rem] tracking-[5px] text-white/30 uppercase mb-10"
          style={{ animation: "fadeInUp 0.6s 0.2s ease both" }}
        >
          {"FULL-STACK DEVELOPER \u00B7 SIH 2025 FINALIST"}
        </p>

        {/* Progress bar */}
        <div
          className="relative w-[min(320px,75vw)] h-[2px] rounded-full overflow-hidden mb-3"
          style={{
            background: "rgba(255,255,255,0.06)",
            animation: "fadeInUp 0.6s 0.3s ease both",
          }}
        >
          <div
            className="h-full rounded-full relative"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #e63946, #0ff0fc)",
              transition: "width 0.08s linear",
              boxShadow: "0 0 20px rgba(15,240,252,0.5), 0 0 40px rgba(230,57,70,0.3)",
            }}
          >
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
              style={{
                background: "#0ff0fc",
                boxShadow: "0 0 12px #0ff0fc, 0 0 24px #0ff0fc",
              }}
            />
          </div>
        </div>

        {/* Percentage + status */}
        <div className="flex items-center gap-4">
          <span
            className="font-[var(--font-jetbrains)] text-[0.7rem] tracking-[3px] tabular-nums"
            style={{
              color: "rgba(15,240,252,0.7)",
              animation: "fadeInUp 0.6s 0.4s ease both",
            }}
          >
            {progress}%
          </span>
          <span
            className="font-[var(--font-jetbrains)] text-[0.55rem] tracking-[2px] text-white/20"
            style={{ animation: "fadeInUp 0.6s 0.5s ease both" }}
          >
            {progress < 30 ? "INITIALIZING SYSTEMS..." : progress < 60 ? "LOADING MODULES..." : progress < 90 ? "COMPILING ASSETS..." : "READY"}
          </span>
        </div>

        {/* Decorative corner brackets */}
        <div className="absolute -top-8 -left-8 w-6 h-6 border-t-2 border-l-2 border-[#0ff0fc]/30" />
        <div className="absolute -top-8 -right-8 w-6 h-6 border-t-2 border-r-2 border-[#0ff0fc]/30" />
        <div className="absolute -bottom-8 -left-8 w-6 h-6 border-b-2 border-l-2 border-[#e63946]/30" />
        <div className="absolute -bottom-8 -right-8 w-6 h-6 border-b-2 border-r-2 border-[#e63946]/30" />
      </div>

      <style>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.1); }
        }
        @keyframes glitchText {
          0%, 90%, 100% { transform: none; }
          92% { transform: translate(-2px, 1px); }
          94% { transform: translate(2px, -1px); }
          96% { transform: translate(-1px, -1px); }
          98% { transform: translate(1px, 1px); }
        }
        @keyframes glitchLayer1 {
          0%, 88%, 100% { transform: none; opacity: 0; }
          90% { transform: translate(3px, -2px); opacity: 0.6; }
          92% { transform: translate(-2px, 1px); opacity: 0; }
          94% { transform: translate(1px, 2px); opacity: 0.4; }
          96% { transform: none; opacity: 0; }
        }
        @keyframes glitchLayer2 {
          0%, 85%, 100% { transform: none; opacity: 0; }
          87% { transform: translate(-3px, 2px); opacity: 0.6; }
          89% { transform: translate(2px, -1px); opacity: 0; }
          91% { transform: translate(-1px, -2px); opacity: 0.4; }
          93% { transform: none; opacity: 0; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  )
}
