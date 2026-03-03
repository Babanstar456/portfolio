"use client"

import { useEffect, useRef, useState } from "react"

// ── DECISION TREE ────────────────────────────────────────────────────────────
type Node = {
  message: string
  options?: { label: string; next: string }[]
  end?: boolean
}

const TREE: Record<string, Node> = {
  start: {
    message: "Hey there! 👋 I'm Tathaaa's AI. Who are you today?",
    options: [
      { label: "💼 Potential Client", next: "client_1" },
      { label: "🎯 Recruiter / HR", next: "recruiter_1" },
      { label: "😄 Friend / Familiar", next: "friend_1" },
      { label: "👀 Just Curious", next: "curious_1" },
    ],
  },

  // ── CLIENT BRANCH ──
  client_1: {
    message: "Great! What kind of project are you thinking about?",
    options: [
      { label: "🌐 Website / Web App", next: "client_website" },
      { label: "📱 Mobile App", next: "client_mobile" },
      { label: "🤖 AI / Automation", next: "client_ai" },
      { label: "🗄️ Backend / API", next: "client_backend" },
    ],
  },
  client_website: {
    message: "Perfect — Tathaaa has built everything from corporate sites (JM Biotech, IndiServe) to full ERPs (BECS School System). What's your budget range?",
    options: [
      { label: "Under ₹20k", next: "client_budget_low" },
      { label: "₹20k – ₹1L", next: "client_budget_mid" },
      { label: "₹1L+", next: "client_budget_high" },
    ],
  },
  client_mobile: {
    message: "He's shipped Khaww on the Play Store — a live food delivery app for Kolkata. What platform?",
    options: [
      { label: "Android", next: "client_contact" },
      { label: "iOS", next: "client_contact" },
      { label: "Both (React Native)", next: "client_contact" },
    ],
  },
  client_ai: {
    message: "Tathaaa works with Python, LangChain, and IoT — built SURYADUT (solar IoT) and AI dashboards. What problem are you solving?",
    options: [
      { label: "Automate a workflow", next: "client_contact" },
      { label: "Build a chatbot", next: "client_contact" },
      { label: "Data analytics", next: "client_contact" },
    ],
  },
  client_backend: {
    message: "He's built RESTful APIs with Node.js/Express + SQL/MongoDB for multiple live platforms. Need something specific?",
    options: [
      { label: "REST API", next: "client_contact" },
      { label: "Database design", next: "client_contact" },
      { label: "Full backend", next: "client_contact" },
    ],
  },
  client_budget_low: {
    message: "That works for landing pages and simple sites! Tathaaa has delivered clean, fast websites in that range. Ready to connect?",
    options: [
      { label: "📧 Email him", next: "client_contact" },
      { label: "🔙 Go back", next: "start" },
    ],
  },
  client_budget_mid: {
    message: "Sweet spot for full web apps, ERPs, or complex sites. This is where Tathaaa does his best work!",
    options: [
      { label: "📧 Let's talk!", next: "client_contact" },
      { label: "🔙 Go back", next: "start" },
    ],
  },
  client_budget_high: {
    message: "Tathaaa delivers enterprise-grade solutions via Techacon Solutions — IoT platforms, AI systems, full-stack products. Let's build something serious.",
    options: [
      { label: "📧 Let's connect", next: "client_contact" },
      { label: "🔙 Go back", next: "start" },
    ],
  },
  client_contact: {
    message: "Awesome! Reach out directly 👇\n\n📧 tathagata456@gmail.com\n🌐 tathagatasengupta.in\n📍 Kolkata / Remote\n\nHe typically responds within 24 hours!",
    options: [
      { label: "🔁 Start over", next: "start" },
      { label: "📂 See his projects", next: "projects_list" },
    ],
  },

  // ── RECRUITER BRANCH ──
  recruiter_1: {
    message: "Nice to meet you! What role are you hiring for?",
    options: [
      { label: "⚛️ React / Frontend", next: "rec_frontend" },
      { label: "🔧 Full-Stack", next: "rec_fullstack" },
      { label: "🤖 AI / ML Engineer", next: "rec_ai" },
      { label: "🌐 General SWE", next: "rec_general" },
    ],
  },
  rec_frontend: {
    message: "Strong match! Tathaaa builds in React, Next.js, and TailwindCSS — this very portfolio is his work. Where's the role based?",
    options: [
      { label: "Remote", next: "rec_availability" },
      { label: "Kolkata", next: "rec_availability" },
      { label: "Other city", next: "rec_availability" },
    ],
  },
  rec_fullstack: {
    message: "Tathaaa is a full-stack engineer — React + Node.js + SQL/MongoDB + Docker. He's shipped 6+ live products. Where's the role?",
    options: [
      { label: "Remote", next: "rec_availability" },
      { label: "Kolkata", next: "rec_availability" },
      { label: "Hybrid", next: "rec_availability" },
    ],
  },
  rec_ai: {
    message: "He works with Python, LangChain, IoT, and ML pipelines. Published research too (IEEE/Springer). Interested in his background?",
    options: [
      { label: "Yes, tell me more", next: "rec_background" },
      { label: "Jump to availability", next: "rec_availability" },
    ],
  },
  rec_general: {
    message: "Tathaaa is a SIH 2025 Grand Finalist with 20+ tech stacks and real-world delivery experience. What seniority level?",
    options: [
      { label: "Intern / Fresher", next: "rec_availability" },
      { label: "Junior Engineer", next: "rec_availability" },
      { label: "Mid-level", next: "rec_availability" },
    ],
  },
  rec_background: {
    message: "📌 Quick brief:\n\n• SIH 2025 Grand Finalist\n• 3rd year B.Tech CSE @ TIN Kolkata\n• Founder of Techacon Solutions\n• COO of Khaww (live Play Store app)\n• 6+ shipped projects across IoT, Web, AI",
    options: [
      { label: "Check availability", next: "rec_availability" },
      { label: "See his stack", next: "rec_stack" },
    ],
  },
  rec_stack: {
    message: "🛠️ Tech Stack:\n\nFrontend: React, Next.js, TailwindCSS\nBackend: Node.js, Express, Python\nDB: MySQL, MongoDB, PostgreSQL\nOther: Docker, Linux, IoT, AI/ML, Git",
    options: [
      { label: "Check availability", next: "rec_availability" },
      { label: "Contact him", next: "rec_contact" },
    ],
  },
  rec_availability: {
    message: "✅ Tathagata is actively looking for React.js, full-stack, or AI/ML roles — open to remote or Kolkata-based. Want to reach out?",
    options: [
      { label: "📧 Get his contact", next: "rec_contact" },
      { label: "📄 His resume/portfolio", next: "rec_contact" },
    ],
  },
  rec_contact: {
    message: "Here's how to reach him 👇\n\n📧 tathagata456@gmail.com\n🌐 tathagatasengupta.in\n📎 LinkedIn: Tathagata Sengupta\n\nBest to email — he responds fast!",
    options: [
      { label: "🔁 Start over", next: "start" },
      { label: "📂 See projects", next: "projects_list" },
    ],
  },

  // ── FRIEND BRANCH ──
  friend_1: {
    message: "Haha okay which type of 'friend' are you? 😂",
    options: [
      { label: "😇 Genuinely supportive", next: "friend_nice" },
      { label: "😏 Here to judge", next: "friend_judge" },
      { label: "😤 Lowkey jealous", next: "friend_jealous" },
      { label: "🤝 Classmate / Batchmate", next: "friend_classmate" },
    ],
  },
  friend_nice: {
    message: "Aww you're the real ones 🥹 Tathaaa appreciates you! Want to know what he's been cooking lately?",
    options: [
      { label: "Yes spill! 👀", next: "friend_projects" },
      { label: "How can I support?", next: "friend_support" },
    ],
  },
  friend_judge: {
    message: "Bold of you to come here and judge 😂 But the projects speak for themselves — SIH Grand Finals, live apps, real clients. Still judging?",
    options: [
      { label: "Okay okay, impressed 😅", next: "friend_projects" },
      { label: "Show me the receipts 🧾", next: "projects_list" },
    ],
  },
  friend_jealous: {
    message: "It's okay bro, we can't all be SIH Grand Finalists 😎 Built 6+ live projects in 3 years of college — but hey, there's time for everyone!",
    options: [
      { label: "Okay fine, respect 🫡", next: "friend_projects" },
      { label: "How did he do it?? 😭", next: "friend_howdone" },
    ],
  },
  friend_classmate: {
    message: "Oh a batchmate! 👋 You've probably seen the grind firsthand. What's up?",
    options: [
      { label: "Just checking the portfolio", next: "friend_projects" },
      { label: "Want to collab on something", next: "client_contact" },
    ],
  },
  friend_projects: {
    message: "Latest highlights 🔥\n\n🏆 SIH 2025 Grand Finals — SURYADUT\n🚀 Khaww — live on Play Store\n🏫 BECS — school ERP live\n💼 Multiple client sites delivered\n📜 Research published",
    options: [
      { label: "That's actually sick 🔥", next: "friend_end" },
      { label: "See full project list", next: "projects_list" },
    ],
  },
  friend_howdone: {
    message: "Honestly? Just started building on Day 1 of college and never stopped. Real clients, real deadlines, real code — no tutorial hell 😄",
    options: [
      { label: "Respect honestly 🤝", next: "friend_end" },
      { label: "🔁 Back to start", next: "start" },
    ],
  },
  friend_support: {
    message: "Follow his journey, share his work, or just spread the word! 🙏 And if you need anything built — he's the guy.",
    options: [
      { label: "🌐 Visit portfolio", next: "friend_end" },
      { label: "🔁 Start over", next: "start" },
    ],
  },
  friend_end: {
    message: "You're good people 😄 Come back anytime!",
    options: [
      { label: "🔁 Start over", next: "start" },
      { label: "📂 See projects", next: "projects_list" },
    ],
  },

  // ── CURIOUS BRANCH ──
  curious_1: {
    message: "Welcome! 😊 What would you like to know about Tathagata?",
    options: [
      { label: "👤 Who is he?", next: "curious_who" },
      { label: "💻 What has he built?", next: "projects_list" },
      { label: "🎓 His education?", next: "curious_edu" },
      { label: "🌍 His ventures?", next: "curious_ventures" },
    ],
  },
  curious_who: {
    message: "Tathagata Sengupta (Tathaaa) is a 3rd-year B.Tech CSE student from Kolkata 🇮🇳\n\nHe's a full-stack developer, startup founder, SIH Grand Finalist, and builder who's been shipping real products since Year 1 of college.",
    options: [
      { label: "What did he build?", next: "projects_list" },
      { label: "His ventures?", next: "curious_ventures" },
      { label: "Contact him", next: "client_contact" },
    ],
  },
  curious_edu: {
    message: "🎓 B.Tech Computer Science\nTechno International Newtown, Kolkata\n3rd Year (Current)\n\n🏆 SIH 2025 Grand Finalist\n📜 Published Research — IEEE / Springer",
    options: [
      { label: "His tech stack?", next: "rec_stack" },
      { label: "His projects?", next: "projects_list" },
      { label: "🔁 Back", next: "curious_1" },
    ],
  },
  curious_ventures: {
    message: "🏢 Tathaaa runs TWO active ventures:\n\n1. Techacon Solutions — IT consulting firm, 20+ tech stacks, real client delivery\n\n2. Khaww — digitizing Kolkata's dabbawala network (live on Play Store!)",
    options: [
      { label: "Tell me about Khaww", next: "curious_khaww" },
      { label: "Tell me about Techacon", next: "curious_techacon" },
      { label: "🔁 Back", next: "curious_1" },
    ],
  },
  curious_khaww: {
    message: "🍱 Khaww is reimagining Kolkata's legendary dabbawala system with tech — route optimization, vendor management, and a digital ops platform. Think Swiggy but for traditional home-cooked food delivery networks.",
    options: [
      { label: "Cool! See more projects", next: "projects_list" },
      { label: "🔁 Back", next: "curious_ventures" },
    ],
  },
  curious_techacon: {
    message: "⚡ Techacon Solutions is Tathaaa's IT consulting firm — delivering web apps, automation, and tech solutions for businesses across 20+ technology stacks. Real clients, real deliveries.",
    options: [
      { label: "See client work", next: "projects_list" },
      { label: "🔁 Back", next: "curious_ventures" },
    ],
  },

  // ── SHARED NODES ──
  projects_list: {
    message: "📂 Here's what he's shipped:\n\n🏆 SURYADUT — Solar IoT dewatering\n🛒 RAWMART — Reverse auction platform\n🏫 BECS — School ERP (live)\n🧬 JM Biotech — Corporate site (live)\n🍱 Khaww — Dabbawala app (Play Store)\n🔧 IndiServe — Service marketplace\n📚 Tending to Infinity — LMS\n🏛️ Bengal Heritage Quest\n📅 PingDue — EMI Reminder",
    options: [
      { label: "💼 I want to hire him", next: "client_contact" },
      { label: "🎯 I want to recruit him", next: "rec_contact" },
      { label: "🔁 Start over", next: "start" },
    ],
  },
}

type Message = { from: "bot" | "user"; text: string; ts: number }

export function ChatbotSection() {
  const [open, setOpen]         = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [currentNode, setCurrentNode] = useState<string>("start")
  const [options, setOptions]   = useState<{ label: string; next: string }[]>([])
  const [pulse, setPulse]       = useState(true)
  const [botTyping, setBotTyping] = useState(false)
  const bottomRef               = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 8000)
    return () => clearTimeout(t)
  }, [])

  // Init on open
  useEffect(() => {
    if (open && messages.length === 0) pushNode("start")
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, botTyping, options])

  const pushNode = (key: string) => {
    const node = TREE[key]
    if (!node) return
    setBotTyping(true)
    setOptions([])
    setTimeout(() => {
      setMessages(prev => [...prev, { from: "bot", text: node.message, ts: Date.now() }])
      setCurrentNode(key)
      setBotTyping(false)
      if (node.options) setOptions(node.options)
    }, 600)
  }

  const choose = (opt: { label: string; next: string }) => {
    setMessages(prev => [...prev, { from: "user", text: opt.label, ts: Date.now() }])
    setOptions([])
    setTimeout(() => pushNode(opt.next), 300)
  }

  const reset = () => {
    setMessages([])
    setOptions([])
    setCurrentNode("start")
    setTimeout(() => pushNode("start"), 100)
  }

  return (
    <>
      {/* ── FAB ── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {!open && pulse && (
          <div className="relative bg-[#1a1a2e] text-white font-[var(--font-inter)] text-[0.7rem] px-3.5 py-2 rounded-xl shadow-xl max-w-[150px] text-center leading-snug">
            👋 Chat with Tathaaa's AI!
            <div className="absolute -bottom-1.5 right-5 w-3 h-3 bg-[#1a1a2e] rotate-45" />
          </div>
        )}
        <button onClick={() => setOpen(o => !o)}
          className="relative w-14 h-14 rounded-full shadow-[0_8px_32px_rgba(26,26,46,0.35)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
          style={{ background: open ? "#e63946" : "#1a1a2e" }}>
          {!open && pulse && <span className="absolute inset-0 rounded-full bg-[#e63946] animate-ping opacity-35" />}
          {!open && <span className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-[#e63946] border-2 border-white" />}
          {open
            ? <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            : <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3C6.477 3 2 6.925 2 11.765c0 2.607 1.248 4.946 3.228 6.574L4 21l3.833-1.47A10.717 10.717 0 0012 20.529c5.523 0 10-3.925 10-8.764C22 6.925 17.523 3 12 3z" /></svg>
          }
        </button>
      </div>

      {/* ── Window ── */}
      <div className={`fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-24px)] transition-all duration-300 origin-bottom-right ${
        open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"
      }`}>
        <div className="bg-white rounded-2xl shadow-[0_24px_80px_rgba(26,26,46,0.2)] border border-[#1a1a2e]/8 overflow-hidden flex flex-col" style={{ height: 540 }}>

          {/* Header */}
          <div className="relative bg-[#1a1a2e] px-4 py-3 flex items-center gap-3 flex-shrink-0">
            <div className="absolute inset-0 opacity-[0.06]" style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }} />
            <div className="relative w-9 h-9 rounded-full bg-[#e63946] flex items-center justify-center flex-shrink-0 z-10">
              <span className="font-[var(--font-syne)] font-extrabold text-white text-[0.65rem]">TS</span>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#16a34a] border-[1.5px] border-[#1a1a2e]" />
            </div>
            <div className="flex-1 z-10">
              <p className="font-[var(--font-syne)] font-bold text-white text-[0.85rem] leading-none">Tathaaa's Assistant</p>
              <p className="font-[var(--font-jetbrains)] text-[0.55rem] text-white/45 tracking-wider mt-0.5">Always here</p>
            </div>
            <button onClick={reset} title="Restart"
              className="z-10 w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all duration-200">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#f7f6f3]"
            style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(26,26,46,0.08) transparent" }}>

            {messages.map((m, i) => (
              <div key={i} className={`flex items-end gap-2 ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                {m.from === "bot" && (
                  <div className="w-6 h-6 rounded-full bg-[#e63946] flex items-center justify-center flex-shrink-0 mb-0.5">
                    <span className="font-[var(--font-syne)] font-bold text-white text-[0.42rem]">TS</span>
                  </div>
                )}
                <div className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-[0.78rem] leading-relaxed font-[var(--font-inter)] whitespace-pre-line ${
                  m.from === "user"
                    ? "bg-[#e63946] text-white rounded-br-sm shadow-[0_2px_8px_rgba(230,57,70,0.2)]"
                    : "bg-white text-[#1a1a2e] border border-[#1a1a2e]/6 rounded-bl-sm shadow-sm"
                }`}>
                  {m.text}
                  <div className={`text-[0.5rem] mt-1 ${m.from === "user" ? "text-white/50 text-right" : "text-[#c4c4c4]"}`}>
                    {new Date(m.ts).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing */}
            {botTyping && (
              <div className="flex items-end gap-2">
                <div className="w-6 h-6 rounded-full bg-[#e63946] flex items-center justify-center flex-shrink-0">
                  <span className="font-[var(--font-syne)] font-bold text-white text-[0.42rem]">TS</span>
                </div>
                <div className="bg-white border border-[#1a1a2e]/6 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                  <div className="flex gap-1.5 items-center h-3.5">
                    {[0,1,2].map(d => (
                      <span key={d} className="w-1.5 h-1.5 rounded-full bg-[#e63946]/50"
                        style={{ animation: `dot 1.2s ${d*0.2}s ease-in-out infinite` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Options */}
          {options.length > 0 && !botTyping && (
            <div className="px-3 py-3 border-t border-[#1a1a2e]/6 bg-white flex-shrink-0">
              <p className="font-[var(--font-jetbrains)] text-[0.52rem] text-[#9ca3af] tracking-widest uppercase mb-2">Choose an option</p>
              <div className="flex flex-col gap-1.5 max-h-[140px] overflow-y-auto" style={{ scrollbarWidth: "none" }}>
                {options.map((opt, i) => (
                  <button key={i} onClick={() => choose(opt)}
                    className="w-full text-left font-[var(--font-inter)] text-[0.78rem] text-[#1a1a2e] px-3.5 py-2.5 rounded-xl bg-[#f7f6f3] border border-[#1a1a2e]/8 hover:bg-[#e63946] hover:text-white hover:border-[#e63946] transition-all duration-200 active:scale-[0.98]">
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes dot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.3; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </>
  )
}