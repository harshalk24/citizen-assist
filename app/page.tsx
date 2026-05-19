"use client"

import { useRouter } from "next/navigation"
import { ArrowRight, MessageSquare, Compass, FileStack, Globe, ChevronDown } from "lucide-react"

const PAIN_POINTS = [
  {
    icon: <Compass size={22} className="text-[#185FA5]" />,
    title: "30% of Salvadorans know what they qualify for",
    body: "Most benefits go unclaimed — not because they don't exist, but because nobody explains them.",
  },
  {
    icon: <FileStack size={22} className="text-[#185FA5]" />,
    title: "The wrong document means starting over",
    body: "Cross-agency processes have hidden dependencies. Miss one step and you're back at the beginning.",
  },
  {
    icon: <Globe size={22} className="text-[#185FA5]" />,
    title: "Managing SV affairs from abroad is a full-time job",
    body: "Poder notarial, property, consulate appointments — the information exists, but no one connects it.",
  },
]

const PERSONAS = [
  {
    name: "María",
    role: "New mother · Soyapango",
    quote: "Found her maternity benefit and RNPN deadline in 30 seconds. Would have missed the 30-day window.",
  },
  {
    name: "José",
    role: "Salvadoran in Los Angeles",
    quote: "Got the correct poder chain for a property sale — without paying a tramitador.",
  },
  {
    name: "Rosa",
    role: "Food vendor · Santa Ana",
    quote: "Discovered a $2,500 CONAMYPE grant she didn't know existed. Applied before registering her business.",
  },
]

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="h-screen overflow-y-auto bg-white">
      {/* ── Nav ─────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <MessageSquare size={17} className="text-[#185FA5]" />
          <span className="font-semibold text-gray-900 text-sm">Citizen Assist</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-[#185FA5] font-medium">El Salvador</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/chat")}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Sign in
          </button>
          <button
            onClick={() => router.push("/onboarding")}
            className="text-sm font-semibold px-4 py-2 rounded-xl bg-[#185FA5] text-white hover:bg-[#145290] transition-colors"
          >
            Get started
          </button>
        </div>
      </nav>

      <div className="max-w-[1100px] mx-auto px-6">

        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="text-center pt-20 pb-16">
          <div className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full bg-blue-50 text-[#185FA5] mb-8">
            🇸🇻 El Salvador · Powered by AI
          </div>

          <h1 className="text-5xl font-bold text-gray-900 leading-tight tracking-tight max-w-2xl mx-auto">
            Your government owes you<br />
            <span className="text-[#185FA5]">more than you know.</span>
          </h1>

          <p className="mt-5 text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            Describe your situation once. We find every benefit, subsidy, and service you qualify for — and tell you exactly what to do next.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <button
              onClick={() => router.push("/onboarding")}
              className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-[#185FA5] text-white font-semibold text-sm hover:bg-[#145290] transition-colors shadow-md shadow-blue-100"
            >
              Find my benefits
              <ArrowRight size={16} />
            </button>
            <a
              href="#how-it-works"
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1"
            >
              See how it works
              <ChevronDown size={14} />
            </a>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            No account required · Free · Takes 30 seconds
          </p>
        </section>

        {/* ── Pain points ─────────────────────────────────── */}
        <section id="how-it-works" className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PAIN_POINTS.map((p, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4">
                  {p.icon}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-2">{p.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── North star ──────────────────────────────────── */}
        <section className="py-12 -mx-6 px-6 bg-blue-50 rounded-3xl my-4">
          <blockquote className="text-center max-w-2xl mx-auto">
            <p className="text-xl font-semibold text-gray-800 leading-relaxed">
              "Describe your situation once.<br />
              We tell you everything your government owes you —<br />
              <span className="text-[#185FA5]">before you have to ask.</span>"
            </p>
          </blockquote>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 text-center">
            {[
              { stat: "5 benefits", sub: "avg per session" },
              { stat: "$1,400/mo", sub: "unclaimed on average" },
              { stat: "30 seconds", sub: "to your first result" },
            ].map((m, i) => (
              <div key={i}>
                <p className="text-2xl font-bold text-[#185FA5]">{m.stat}</p>
                <p className="text-sm text-gray-500 mt-0.5">{m.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Personas ─────────────────────────────────────── */}
        <section className="py-12">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide text-center mb-6">
            Who uses Citizen Assist
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PERSONAS.map((p, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl p-5 bg-white">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                  <span className="text-sm font-bold text-[#185FA5]">{p.name[0]}</span>
                </div>
                <p className="font-semibold text-gray-900 text-sm">{p.name}</p>
                <p className="text-xs text-gray-400 mt-0.5 mb-3">{p.role}</p>
                <p className="text-sm text-gray-600 leading-relaxed">"{p.quote}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Final CTA ─────────────────────────────────────── */}
        <section className="py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to find what you're owed?
          </h2>
          <button
            onClick={() => router.push("/onboarding")}
            className="flex items-center gap-2 mx-auto px-8 py-4 rounded-2xl bg-[#185FA5] text-white font-bold text-sm hover:bg-[#145290] transition-colors shadow-md shadow-blue-100"
          >
            Start the conversation
            <ArrowRight size={16} />
          </button>
          <p className="text-xs text-gray-400 mt-4">El Salvador · English & Spanish</p>
        </section>

      </div>
    </div>
  )
}
