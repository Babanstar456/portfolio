"use client"
import { useEffect, useState } from "react"

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">("loading")
  const [arcPowered, setArcPowered] = useState(false)
  const [armorPhase, setArmorPhase] = useState(0)
  const [hudVisible, setHudVisible] = useState(false)
  const [systemLines, setSystemLines] = useState<string[]>([])
  const [glitchActive, setGlitchActive] = useState(false)

  const SYSTEM_LOG = [
    "INITIALIZING J.A.R.V.I.S. INTERFACE...",
    "POWER CORE ONLINE — 3.0 GW",
    "REPULSOR ARRAY CALIBRATED",
    "LOADING FLIGHT SYSTEMS...",
    "COMPILING NEURAL MATRICES...",
    "WEAPONS SYSTEM: STANDBY",
    "SUIT INTEGRITY: 100%",
    "MARK L — FULLY OPERATIONAL",
  ]

  useEffect(() => {
    // Arc reactor power-up
    setTimeout(() => setArcPowered(true), 300)
    // HUD elements
    setTimeout(() => setHudVisible(true), 800)
    // Armor assembly sequence — panel by panel
    setTimeout(() => setArmorPhase(1), 600)
    setTimeout(() => setArmorPhase(2), 900)
    setTimeout(() => setArmorPhase(3), 1150)
    setTimeout(() => setArmorPhase(4), 1350)
    setTimeout(() => setArmorPhase(5), 1550)
    setTimeout(() => setArmorPhase(6), 1750)
    // System log lines
    SYSTEM_LOG.forEach((line, i) => {
      setTimeout(() => setSystemLines(prev => [...prev, line]), 800 + i * 280)
    })
    // Progress
    let p = 0
    const tick = () => {
      p += Math.random() * 2.5 + 1.0
      if (p > 100) p = 100
      setProgress(Math.floor(p))
      if (p < 100) {
        setTimeout(tick, 55)
      } else {
        setTimeout(() => setGlitchActive(true), 200)
        setTimeout(() => setPhase("reveal"), 600)
        setTimeout(() => { setPhase("done"); onComplete() }, 1800)
      }
    }
    setTimeout(tick, 400)
  }, [onComplete])

  if (phase === "done") return null

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 60%, #0a0e1a 0%, #040608 60%, #000000 100%)",
        opacity: phase === "reveal" ? 0 : 1,
        transform: phase === "reveal" ? "scale(1.08)" : "scale(1)",
        transition: "opacity 1.6s cubic-bezier(0.4,0,0.2,1), transform 1.6s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      {/* ─── BACKGROUND GRID ─── */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(185,210,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(185,210,255,0.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          animation: "gridDrift 8s linear infinite",
        }}
      />

      {/* ─── RADIAL PULSE RINGS ─── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border border-[#4fc3f7]/10"
            style={{
              width: `${200 + i * 180}px`,
              height: `${200 + i * 180}px`,
              animation: `ringPulse 3s ease-out ${i * 0.6}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ─── HUD CORNER BRACKETS ─── */}
      {hudVisible && (
        <>
          <div className="absolute top-6 left-6" style={{ animation: "hudSlideIn 0.4s ease both" }}>
            <div className="w-12 h-12 border-t-2 border-l-2 border-[#4fc3f7]/60" />
            <span className="font-mono text-[9px] text-[#4fc3f7]/50 tracking-[3px] mt-1 block">MARK.L</span>
          </div>
          <div
            className="absolute top-6 right-6 flex flex-col items-end"
            style={{ animation: "hudSlideIn 0.4s 0.1s ease both", opacity: 0 }}
          >
            <div className="w-12 h-12 border-t-2 border-r-2 border-[#4fc3f7]/60" />
            <span className="font-mono text-[9px] text-[#4fc3f7]/50 tracking-[3px] mt-1 block">ONLINE</span>
          </div>
          <div
            className="absolute bottom-6 left-6"
            style={{ animation: "hudSlideIn 0.4s 0.15s ease both", opacity: 0 }}
          >
            <div className="w-12 h-12 border-b-2 border-l-2 border-[#e63946]/50" />
            <span className="font-mono text-[9px] text-[#e63946]/40 tracking-[3px] mt-1 block">PWR:100%</span>
          </div>
          <div
            className="absolute bottom-6 right-6 flex flex-col items-end"
            style={{ animation: "hudSlideIn 0.4s 0.2s ease both", opacity: 0 }}
          >
            <div className="w-12 h-12 border-b-2 border-r-2 border-[#e63946]/50" />
            <span className="font-mono text-[9px] text-[#e63946]/40 tracking-[3px] mt-1 block">ARMED</span>
          </div>
        </>
      )}

      {/* ─── SIDE HUD DATA LINES ─── */}
      {hudVisible && (
        <>
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 w-24 flex flex-col gap-2 pl-4"
            style={{ animation: "slideRight 0.6s 0.3s ease both", opacity: 0 }}
          >
            {[70, 45, 90, 30, 60].map((w, i) => (
              <div
                key={i}
                className="h-[1px] bg-gradient-to-r from-[#4fc3f7]/40 to-transparent"
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-24 flex flex-col gap-2 pr-4 items-end"
            style={{ animation: "slideLeft 0.6s 0.3s ease both", opacity: 0 }}
          >
            {[50, 80, 35, 65, 45].map((w, i) => (
              <div
                key={i}
                className="h-[1px] bg-gradient-to-l from-[#4fc3f7]/40 to-transparent"
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
        </>
      )}

      {/* ─── MAIN CENTER CONTENT ─── */}
      <div className="relative z-10 flex flex-col items-center">

        {/* ARC REACTOR */}
        <div
          className="relative mb-8 flex items-center justify-center"
          style={{ animation: "fadeInScale 0.5s 0.2s ease both", opacity: 0 }}
        >
          {/* Outer glow */}
          <div
            className="absolute rounded-full"
            style={{
              width: 110, height: 110,
              background: arcPowered
                ? "radial-gradient(circle, rgba(79,195,247,0.15) 0%, transparent 70%)"
                : "transparent",
              transition: "background 1.2s ease",
              animation: arcPowered ? "arcGlow 2s ease-in-out infinite" : "none",
            }}
          />
          {/* Outer spinning ring with nodes */}
          <div
            className="absolute rounded-full border border-[#4fc3f7]/20"
            style={{
              width: 96, height: 96,
              animation: "spinSlow 8s linear infinite",
              boxShadow: arcPowered ? "0 0 20px rgba(79,195,247,0.2)" : "none",
            }}
          >
            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-[#4fc3f7]/60"
                style={{
                  top: "50%", left: "50%",
                  transform: `rotate(${deg}deg) translateY(-46px) translate(-50%, -50%)`,
                  boxShadow: "0 0 6px #4fc3f7",
                  opacity: arcPowered ? 1 : 0,
                  transition: `opacity 0.3s ${i * 0.1}s ease`,
                }}
              />
            ))}
          </div>
          {/* Counter-spinning middle ring */}
          <div
            className="absolute rounded-full border border-[#e63946]/15"
            style={{ width: 72, height: 72, animation: "spinReverse 5s linear infinite" }}
          >
            {[0, 90, 180, 270].map((deg, i) => (
              <div
                key={i}
                className="absolute w-1 h-3 rounded-full"
                style={{
                  top: "50%", left: "50%",
                  background: "#e63946",
                  transform: `rotate(${deg}deg) translateY(-34px) translate(-50%, -50%)`,
                  boxShadow: "0 0 4px #e63946",
                  opacity: arcPowered ? 0.7 : 0,
                  transition: `opacity 0.3s ${i * 0.1}s ease`,
                }}
              />
            ))}
          </div>
          {/* Core */}
          <div
            className="relative w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              background: arcPowered
                ? "radial-gradient(circle at 40% 35%, #e8f4ff, #4fc3f7 40%, #0d47a1 80%)"
                : "radial-gradient(circle, #1a2030, #0a0e1a)",
              boxShadow: arcPowered
                ? "0 0 30px rgba(79,195,247,0.9), 0 0 60px rgba(79,195,247,0.4), 0 0 100px rgba(79,195,247,0.2), inset 0 0 20px rgba(255,255,255,0.3)"
                : "none",
              transition: "all 1.2s cubic-bezier(0.4,0,0.2,1)",
              animation: arcPowered ? "coreFlicker 4s ease-in-out infinite" : "none",
            }}
          >
            <div
              className="absolute inset-[6px] rounded-full border border-white/30"
              style={{ animation: arcPowered ? "spinSlow 3s linear infinite reverse" : "none" }}
            />
            <div
              className="w-4 h-4 rounded-full bg-white/90"
              style={{
                boxShadow: arcPowered ? "0 0 12px #fff, 0 0 24px #4fc3f7" : "none",
                transition: "box-shadow 1.2s ease",
              }}
            />
          </div>
        </div>

        {/* ─── IRON MAN HELMET — panel-by-panel assembly ─── */}
        <div className="relative mb-6" style={{ width: 120, height: 130 }}>
          <svg viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Panel 1 — Top dome, drops from above */}
            <path
              d="M60 8 C35 8 18 28 16 50 L20 50 C22 32 38 16 60 16 C82 16 98 32 100 50 L104 50 C102 28 85 8 60 8Z"
              fill="#b71c1c" stroke="#e63946" strokeWidth="0.5"
              style={{
                opacity: armorPhase >= 1 ? 1 : 0,
                transform: armorPhase >= 1 ? "translateY(0) scaleY(1)" : "translateY(-20px) scaleY(0.5)",
                transformOrigin: "60px 8px",
                transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                filter: "drop-shadow(0 -4px 8px rgba(230,57,70,0.6))",
              }}
            />
            {/* Panel 2 — Left cheek, slides from left */}
            <path
              d="M16 50 L16 80 C16 96 28 110 44 116 L44 90 C32 86 22 76 20 62 L20 50Z"
              fill="#c62828" stroke="#e63946" strokeWidth="0.5"
              style={{
                opacity: armorPhase >= 2 ? 1 : 0,
                transform: armorPhase >= 2 ? "translateX(0)" : "translateX(-25px)",
                transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1) 0.05s",
                filter: "drop-shadow(-4px 0 8px rgba(230,57,70,0.5))",
              }}
            />
            {/* Panel 3 — Right cheek, slides from right */}
            <path
              d="M104 50 L104 80 C104 96 92 110 76 116 L76 90 C88 86 98 76 100 62 L100 50Z"
              fill="#c62828" stroke="#e63946" strokeWidth="0.5"
              style={{
                opacity: armorPhase >= 3 ? 1 : 0,
                transform: armorPhase >= 3 ? "translateX(0)" : "translateX(25px)",
                transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1) 0.05s",
                filter: "drop-shadow(4px 0 8px rgba(230,57,70,0.5))",
              }}
            />
            {/* Panel 4 — Central faceplate, scales in */}
            <path
              d="M20 50 L20 80 C20 94 30 106 44 112 L44 90 L40 70 L40 50Z M100 50 L100 70 L96 90 L76 112 C90 106 100 94 100 80 L100 50Z M40 50 L40 70 L44 90 L76 90 L80 70 L80 50Z"
              fill="#d32f2f" stroke="#e63946" strokeWidth="0.3"
              style={{
                opacity: armorPhase >= 4 ? 1 : 0,
                transform: armorPhase >= 4 ? "scale(1)" : "scale(0.8)",
                transformOrigin: "60px 80px",
                transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
              }}
            />
            {/* Panel 5 — Eye slits power up */}
            <g style={{ opacity: armorPhase >= 5 ? 1 : 0, transition: "opacity 0.3s ease" }}>
              <path
                d="M26 58 L48 54 L48 64 L26 68Z"
                fill="#fff176"
                style={{ filter: "drop-shadow(0 0 8px rgba(255,241,118,0.9)) drop-shadow(0 0 16px rgba(255,241,118,0.5))" }}
              />
              <path
                d="M94 58 L72 54 L72 64 L94 68Z"
                fill="#fff176"
                style={{ filter: "drop-shadow(0 0 8px rgba(255,241,118,0.9)) drop-shadow(0 0 16px rgba(255,241,118,0.5))" }}
              />
              {/* Eye glow flicker overlay */}
              <path
                d="M26 58 L48 54 L48 64 L26 68Z"
                fill="rgba(255,255,255,0.3)"
                style={{ animation: armorPhase >= 5 ? "eyeFlicker 2s ease-in-out infinite" : "none" }}
              />
              <path
                d="M94 58 L72 54 L72 64 L94 68Z"
                fill="rgba(255,255,255,0.3)"
                style={{ animation: armorPhase >= 5 ? "eyeFlicker 2s ease-in-out infinite 0.1s" : "none" }}
              />
            </g>
            {/* Panel 6 — Chin drops down */}
            <path
              d="M44 112 C50 120 70 120 76 112 L76 90 L44 90Z"
              fill="#b71c1c" stroke="#e63946" strokeWidth="0.5"
              style={{
                opacity: armorPhase >= 6 ? 1 : 0,
                transform: armorPhase >= 6 ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                filter: "drop-shadow(0 6px 10px rgba(230,57,70,0.5))",
              }}
            />
            {/* Nose bridge */}
            <path
              d="M56 64 L60 68 L64 64 L62 78 L60 80 L58 78Z"
              fill="#c62828"
              style={{ opacity: armorPhase >= 6 ? 0.8 : 0, transition: "opacity 0.3s ease 0.2s" }}
            />
          </svg>
        </div>

        {/* ─── NAME GLITCH ─── */}
        <div className="relative mb-1" style={{ animation: "fadeInUp 0.5s 1.2s ease both", opacity: 0 }}>
          <h1
            className="font-[var(--font-syne)] text-[clamp(1.8rem,4.5vw,3rem)] font-extrabold tracking-[4px] text-white"
            style={{
              textShadow: "0 0 30px rgba(230,57,70,0.6), 0 0 60px rgba(230,57,70,0.2)",
              animation: glitchActive ? "glitchText 0.4s ease-in-out 3" : "none",
            }}
          >
            TATHAGATA
          </h1>
          <h1
            className="absolute inset-0 font-[var(--font-syne)] text-[clamp(1.8rem,4.5vw,3rem)] font-extrabold tracking-[4px] opacity-0"
            aria-hidden="true"
            style={{
              color: "#4fc3f7",
              animation: glitchActive ? "glitchLayer1 0.4s ease-in-out 3" : "none",
              clipPath: "polygon(0 0, 100% 0, 100% 40%, 0 40%)",
            }}
          >
            TATHAGATA
          </h1>
          <h1
            className="absolute inset-0 font-[var(--font-syne)] text-[clamp(1.8rem,4.5vw,3rem)] font-extrabold tracking-[4px] opacity-0"
            aria-hidden="true"
            style={{
              color: "#e63946",
              animation: glitchActive ? "glitchLayer2 0.4s ease-in-out 3" : "none",
              clipPath: "polygon(0 60%, 100% 60%, 100% 100%, 0 100%)",
            }}
          >
            TATHAGATA
          </h1>
        </div>

        <p
          className="font-[var(--font-jetbrains)] text-[0.6rem] tracking-[5px] text-white/30 uppercase mb-8"
          style={{ animation: "fadeInUp 0.5s 1.4s ease both", opacity: 0 }}
        >
          {"FULL-STACK DEVELOPER \u00B7 SIH 2025 FINALIST"}
        </p>

        {/* ─── PROGRESS BAR ─── */}
        <div
          className="relative w-[min(340px,78vw)] mb-2"
          style={{ animation: "fadeInUp 0.5s 1.5s ease both", opacity: 0 }}
        >
          <div className="flex justify-between mb-1.5">
            <span className="font-mono text-[9px] text-[#4fc3f7]/40 tracking-[2px]">SUIT BOOT</span>
            <span className="font-mono text-[9px] text-[#4fc3f7]/40 tracking-[2px]">{progress}%</span>
          </div>
          <div
            className="relative h-[3px] rounded-full overflow-visible"
            style={{ background: "rgba(79,195,247,0.08)" }}
          >
            <div
              className="h-full rounded-full relative"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #b71c1c 0%, #e63946 40%, #4fc3f7 100%)",
                transition: "width 0.06s linear",
                boxShadow: "0 0 12px rgba(79,195,247,0.7), 0 0 24px rgba(230,57,70,0.4)",
              }}
            >
              {/* Traveling spark */}
              <div
                className="absolute top-1/2 rounded-full"
                style={{
                  width: 10, height: 10, right: -5,
                  background: "#fff",
                  transform: "translateY(-50%)",
                  boxShadow: "0 0 8px #4fc3f7, 0 0 16px #4fc3f7, 0 0 32px rgba(79,195,247,0.5)",
                }}
              />
            </div>
          </div>
          <div className="flex justify-between mt-1">
            {[0, 25, 50, 75, 100].map((tick) => (
              <div key={tick} className="flex flex-col items-center gap-0.5">
                <div
                  className="w-px h-1.5"
                  style={{ background: progress >= tick ? "rgba(79,195,247,0.6)" : "rgba(79,195,247,0.15)" }}
                />
                <span
                  className="font-mono text-[7px]"
                  style={{ color: progress >= tick ? "rgba(79,195,247,0.5)" : "rgba(79,195,247,0.15)" }}
                >
                  {tick}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── STATUS LINE ─── */}
        <div
          className="font-mono text-[0.55rem] tracking-[3px] mb-6 h-4"
          style={{ color: "rgba(79,195,247,0.5)", animation: "fadeInUp 0.5s 1.6s ease both", opacity: 0 }}
        >
          {progress < 25
            ? "BOOTING REPULSOR ARRAY..."
            : progress < 50
            ? "LOADING FLIGHT SYSTEMS..."
            : progress < 75
            ? "CALIBRATING WEAPONS..."
            : progress < 95
            ? "SUIT INTEGRITY CHECK..."
            : "MARK L — READY"}
        </div>

        {/* ─── J.A.R.V.I.S. TERMINAL ─── */}
        <div
          className="w-[min(340px,78vw)] border border-[#4fc3f7]/10 rounded"
          style={{
            background: "rgba(4,10,20,0.7)",
            backdropFilter: "blur(4px)",
            animation: "fadeInUp 0.5s 1.7s ease both",
            opacity: 0,
          }}
        >
          <div className="flex items-center gap-2 px-3 py-1.5 border-b border-[#4fc3f7]/10">
            <div className="w-1.5 h-1.5 rounded-full bg-[#e63946]" style={{ boxShadow: "0 0 4px #e63946" }} />
            <span className="font-mono text-[8px] text-[#4fc3f7]/30 tracking-[3px]">
              J.A.R.V.I.S. TERMINAL
            </span>
          </div>
          <div className="px-3 py-2 space-y-[3px] min-h-[60px]">
            {systemLines.map((line, i) => (
              <div
                key={i}
                className="font-mono text-[8px] tracking-[1px] flex gap-2"
                style={{
                  color:
                    i === systemLines.length - 1
                      ? "rgba(79,195,247,0.8)"
                      : "rgba(79,195,247,0.35)",
                }}
              >
                <span style={{ color: "#e63946", opacity: 0.6 }}>&gt;</span>
                <span style={{ animation: "typeIn 0.3s ease both" }}>{line}</span>
              </div>
            ))}
            {systemLines.length > 0 && (
              <div className="font-mono text-[8px] text-[#4fc3f7]/50 inline-flex items-center gap-1">
                <span style={{ color: "#e63946", opacity: 0.6 }}>&gt;</span>
                <span
                  className="w-1.5 h-3 bg-[#4fc3f7]/60"
                  style={{ animation: "blink 1s step-end infinite" }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── SCANLINES ─── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px)",
        }}
      />
      {/* ─── TRAVELING SCAN BEAM ─── */}
      <div
        className="absolute inset-x-0 h-[2px] pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(79,195,247,0.3), transparent)",
          animation: "scanBeam 3s linear infinite",
        }}
      />

      <style>{`
        @keyframes gridDrift {
          0% { transform: translate(0,0); }
          100% { transform: translate(80px,80px); }
        }
        @keyframes ringPulse {
          0% { transform: scale(0.6); opacity: 0.4; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spinReverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes arcGlow {
          0%,100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes coreFlicker {
          0%,96%,100% { filter: brightness(1); }
          97% { filter: brightness(1.6); }
          98% { filter: brightness(0.9); }
          99% { filter: brightness(1.4); }
        }
        @keyframes eyeFlicker {
          0%,92%,100% { opacity: 0.3; }
          94% { opacity: 0.8; }
          96% { opacity: 0.2; }
          98% { opacity: 0.7; }
        }
        @keyframes hudSlideIn {
          from { opacity: 0; transform: scale(0.7); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.6); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes glitchText {
          0%,100% { transform: none; }
          20% { transform: translate(-3px,1px) skewX(-2deg); }
          40% { transform: translate(3px,-1px) skewX(2deg); }
          60% { transform: translate(-1px,2px); }
          80% { transform: translate(2px,-2px); }
        }
        @keyframes glitchLayer1 {
          0%,100% { transform: none; opacity: 0; }
          20% { transform: translate(4px,-2px); opacity: 0.7; }
          40% { transform: translate(-3px,1px); opacity: 0.3; }
          60% { transform: translate(2px,2px); opacity: 0.5; }
          80% { transform: translate(-1px,-3px); opacity: 0; }
        }
        @keyframes glitchLayer2 {
          0%,100% { transform: none; opacity: 0; }
          25% { transform: translate(-4px,2px); opacity: 0.7; }
          45% { transform: translate(3px,-1px); opacity: 0.3; }
          65% { transform: translate(-2px,-2px); opacity: 0.5; }
          85% { transform: translate(1px,3px); opacity: 0; }
        }
        @keyframes typeIn {
          from { opacity: 0; transform: translateX(-4px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes blink {
          0%,100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes scanBeam {
          0% { top: -2px; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  )
}