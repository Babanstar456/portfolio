"use client"

import { useEffect, useRef, useState } from "react"

const SKILL_GROUPS = [
  { title: "Frontend", cls: "border-l-[#e63946]", titleCls: "text-[#e63946]", skills: ["React.js", "Next.js", "AngularJS", "HTML5", "CSS3", "JavaScript", "TypeScript", "TailwindCSS", "Redux", "Figma", "Framer Motion"] },
  { title: "Backend & Databases", cls: "border-l-[#1a1a2e]", titleCls: "text-[#1a1a2e]", skills: ["Node.js", "Express.js", "PHP", "Python", "Golang", "REST APIs", "WebSockets", "PostgreSQL", "MySQL", "MongoDB", "Firebase", "ASP.NET"] },
  { title: "Data Science & AI/ML", cls: "border-l-[#b8860b]", titleCls: "text-[#7a5a00]", skills: ["Python", "PyTorch", "TensorFlow", "Scikit-Learn", "Pandas", "NumPy", "LangChain", "OpenAI API", "Hugging Face", "RAG Pipelines", "LangGraph", "Feature Engineering"] },
  { title: "Automation & Agents", cls: "border-l-[#374151]", titleCls: "text-[#374151]", skills: ["n8n Automation", "LangChain Agents", "Zapier", "Web Scraping", "RPA", "Chatbot Pipelines", "API Chaining", "Scheduled Tasks"] },
  { title: "Security & Linux", cls: "border-l-[#e63946]", titleCls: "text-[#e63946]", skills: ["Kali Linux", "Metasploit", "Nmap", "Wireshark", "Burp Suite", "OWASP Top 10", "Ubuntu/Debian", "Bash Scripting", "Nginx", "Docker", "SSH Hardening", "Pen Testing"] },
  { title: "Cloud & DevOps", cls: "border-l-[#1a1a2e]", titleCls: "text-[#1a1a2e]", skills: ["Docker", "CI/CD", "Render", "Netlify", "Git / GitHub", "Firebase", "Redis", "Grafana", "MQTT", "PowerBI"] },
  { title: "Other Technologies", cls: "border-l-[#b8860b]", titleCls: "text-[#7a5a00]", skills: ["Java", "C / C#", "MATLAB", "CAD/CAM", "3D Modelling", "Tally/GST", "DSA", "R", "ESP32", "IoT Stack"] },
]

const B1 = ["React.js", "Next.js", "Node.js", "PostgreSQL", "MySQL", "MongoDB", "Docker", "TypeScript", "TailwindCSS", "REST APIs", "WebSockets", "Firebase", "Git", "Express.js"]
const B2 = ["Ethical Hacking", "Pen Testing", "Kali Linux", "Burp Suite", "Nmap", "OSINT", "SSH Hardening", "iptables", "DDoS Mitigation", "Wireshark", "Metasploit"]
const B3 = ["PyTorch", "TensorFlow", "Scikit-Learn", "Pandas", "LangChain", "n8n", "OpenAI API", "RAG Pipelines", "LangGraph", "Vector DBs", "Feature Engineering"]
const B4 = ["ESP32", "IoT", "LoRa", "CAD/CAM", "DSA", "Grafana", "MQTT", "PowerBI", "Render", "Netlify", "CI/CD", "Bash Scripting", "Golang", "PHP"]

const BAND_STYLES = [
  "bg-[#e63946]/5 border-[#e63946]/18 text-[#e63946] hover:bg-[#e63946] hover:text-white",
  "bg-[#1a1a2e]/5 border-[#1a1a2e]/15 text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-white",
  "bg-[#b8860b]/5 border-[#b8860b]/18 text-[#7a5a00] hover:bg-[#b8860b] hover:text-white",
  "bg-[#374151]/5 border-[#374151]/15 text-[#374151] hover:bg-[#374151] hover:text-white",
]

function MarqueeBand({ items, reverse, style }: { items: string[]; reverse?: boolean; style: string }) {
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden">
      <div
        className={`flex gap-3 whitespace-nowrap ${reverse ? "animate-marqueeReverse" : "animate-marquee"}`}
      >
        {doubled.map((s, i) => (
          <span
            key={i}
            className={`inline-flex items-center font-[var(--font-jetbrains)] text-[0.62rem] px-4 py-2 rounded-full border tracking-wider flex-shrink-0 transition-all duration-200 cursor-default ${style}`}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}

export function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.05 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} id="skills" className="relative z-10 py-24 px-[5%] md:px-[7%]">
      <div className="max-w-[1280px] mx-auto">
        <div className={`transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-5 h-[1.5px] bg-[#e63946]" />
            <span className="font-[var(--font-jetbrains)] text-[0.65rem] text-[#e63946] tracking-[2.5px] uppercase">
              05 — Skills
            </span>
          </div>
          <h2 className="font-[var(--font-syne)] font-extrabold text-[clamp(2rem,4.5vw,3.2rem)] text-[#1a1a2e] tracking-tight leading-tight mb-3 text-balance">
            My <span className="text-[#e63946]">Arsenal</span>
          </h2>
          <p className="font-[var(--font-inter)] text-[0.95rem] text-[#6b6b8d] max-w-[460px] leading-relaxed">
            Technologies, frameworks, and tools I use to build and ship.
          </p>
        </div>
      </div>

      {/* Marquee bands */}
      <div className={`flex flex-col gap-3 my-12 transition-all duration-700 delay-200 ${vis ? "opacity-100" : "opacity-0"}`}>
        <MarqueeBand items={B1} style={BAND_STYLES[0]} />
        <MarqueeBand items={B2} reverse style={BAND_STYLES[1]} />
        <MarqueeBand items={B3} style={BAND_STYLES[2]} />
        <MarqueeBand items={B4} reverse style={BAND_STYLES[3]} />
      </div>

      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {SKILL_GROUPS.map((g, i) => (
            <div
              key={g.title}
              className={`bg-white/70 backdrop-blur-md border border-[#1a1a2e]/8 rounded-xl p-5 border-l-[3px] ${g.cls} transition-all duration-500 hover:shadow-[0_8px_28px_rgba(26,26,46,0.08)] hover:-translate-y-1 ${
                vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${400 + i * 60}ms` }}
            >
              <h3 className={`font-[var(--font-syne)] font-bold text-[0.78rem] tracking-[1.3px] uppercase mb-4 pl-2 ${g.titleCls}`}>
                {g.title}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {g.skills.map((s) => (
                  <span
                    key={s}
                    className="font-[var(--font-jetbrains)] text-[0.6rem] px-2.5 py-1 rounded bg-[#eaeaf2] border border-[#1a1a2e]/8 text-[#374151] tracking-wider transition-all duration-200 hover:border-[#e63946]/15 cursor-default"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marqueeReverse {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
        .animate-marqueeReverse {
          animation: marqueeReverse 23s linear infinite;
        }
      `}</style>
    </section>
  )
}
