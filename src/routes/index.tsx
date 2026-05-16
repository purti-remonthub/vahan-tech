import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Flag, Gauge, Timer, Trophy, Zap, CheckCircle2, XCircle, Clock,
  Database, LineChart, Users, Award, Wrench, Activity, ArrowRight,
  Mail, Phone, Globe, Calendar, MapPin, GraduationCap, ChevronRight,
} from "lucide-react";
import { TelemetryDashboard } from "@/components/TelemetryDashboard";
import { FAQ } from "@/components/FAQ";

export const Route = createFileRoute("/")({
  component: Index,
});

// =============================================================================
// CONFIG — easy to update
// =============================================================================
const RAZORPAY_PAYMENT_LINK = "PASTE_RAZORPAY_PAYMENT_LINK_HERE";
const WORKSHOP_PRICE = "₹999";
const seatsLimit = 40;
const seatsRemaining: number | null = null;
const _batchParts = (import.meta.env.VITE_CLASSES_DATES?.split(",") ?? [])
  .map((s: string) => s.trim())
  .filter(Boolean);
const NEXT_BATCH_DATE =
  _batchParts.length >= 2
    ? `${_batchParts[0]} – ${_batchParts[1]}`
    : (_batchParts[0] ?? "To Be Announced");
const NEXT_BATCH_TIME = "Weekend Slot — To Be Announced";

// For production, replace payment link with Razorpay Standard Checkout or Razorpay Payment Button.
// Razorpay notes / form fields should collect:
//   Name, Email, WhatsApp Number, College/Company,
//   Motorsport/Automotive Background,
//   Primary Interest: Race Engineering / Vehicle Dynamics / Data Analysis /
//                     Formula Student / Automotive R&D / Just Exploring
function handlePayment() {
  if (RAZORPAY_PAYMENT_LINK === "PASTE_RAZORPAY_PAYMENT_LINK_HERE") {
    alert("Razorpay payment link not configured yet. Please contact support@vahantech.in to reserve your seat.");
    return;
  }
  window.open(RAZORPAY_PAYMENT_LINK, "_blank", "noopener,noreferrer");
}

// =============================================================================

function Index() {
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setScroll(total > 0 ? (h.scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Scroll progress */}
      <div className="fixed top-0 left-0 right-0 h-0.5 z-50 bg-transparent">
        <div className="h-full bg-[var(--racing-red)] transition-[width] duration-150" style={{ width: `${scroll}%` }} />
      </div>

      <Header />
      <Hero />
      <WhatYouLearn />
      {/* <WorkflowSection /> */}
      {/* <TrustStrip /> */}
      <Problem />
      <CTABand label="Ready to read the car through data?" />
      {/* <Promise /> */}
      <Audience />
      <CTABand label="Limited seats per batch — secure yours." />
      <Agenda />
      <WhatYouGet />
      <CTABand label="One weekend. Real motorsport workflow." />
      <WhyVahanTech />
      <Trainer />
      <Offer />
      <FOMO />
      <CTABand label="Join the next batch." />
      {/* <Upsell /> */}
      <FAQSection />
      <FinalCTA />
      <Footer />
      <MobileStickyCTA />
    </div>
  );
}

// ────────────────────────── HEADER ──────────────────────────
function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#0A0E13]/95 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <div className="size-9 rounded-lg bg-[var(--gradient-red)] flex items-center justify-center" style={{ background: "var(--gradient-red)" }}>
            <Flag className="size-5 text-white" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-xl tracking-wider text-white">VahanTech</div>
            <div className="font-mono text-[9px] text-gray-400 tracking-widest -mt-0.5">Engineering</div>
          </div>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#workshop" className="text-gray-300 hover:text-white transition border-b-2 border-transparent hover:border-[var(--racing-red)]">WORKSHOP</a>
          <a href="#agenda" className="text-gray-300 hover:text-white transition border-b-2 border-transparent hover:border-[var(--racing-red)]">AGENDA</a>
          <a href="#instructor" className="text-gray-300 hover:text-white transition border-b-2 border-transparent hover:border-[var(--racing-red)]">INSTRUCTOR</a>
          <a href="#faq" className="text-gray-300 hover:text-white transition border-b-2 border-transparent hover:border-[var(--racing-red)]">FAQ</a>
        </nav>
        <button onClick={handlePayment} className="hidden sm:inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.02]" style={{ background: "var(--gradient-red)" }}>
          RESERVE SEAT · {WORKSHOP_PRICE}
        </button>
      </div>
    </header>
  );
}

// ────────────────────────── HERO ──────────────────────────
function Hero() {
  const trustIndicators = [
    { icon: Users, label: "1000+", sub: "Learners" },
    { icon: Trophy, label: "150+", sub: "Motorsport Professionals" },
    { icon: Award, label: "4.9/5", sub: "Workshop Rating" },
    { icon: Database, label: "Replay Access", sub: "" },
  ];
  
  // Only 3 shown on mobile (drop "15+ Motorsport Engineers")
  const mobileTrust = trustIndicators.filter((_, i) => i !== 1);

  return (
    <section id="top" className="relative overflow-hidden min-h-screen flex items-center bg-[#0A0E13]">

      {/* ── MOBILE: full-bleed background image ── */}
      <div className="absolute inset-0 lg:hidden">
        <img
          src="/images/hero-telemetry.png"
          alt="Race Engineer analyzing telemetry data"
          className="w-full h-full object-cover object-left"
        />
        {/* dark gradient so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      </div>

      {/* ── DESKTOP: image pinned to right side ── */}
      <div className="absolute right-0 top-0 bottom-0 w-[55%] hidden lg:block">
        <div className="relative h-full">
          <img
            src="/images/hero-telemetry.png"
            alt="Race Engineer analyzing telemetry data"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E13] via-[#0A0E13]/60 to-transparent" />

          {/* Floating Telemetry Cards */}
          <div className="absolute bottom-[15%] left-[10%] grid grid-cols-3 gap-3">
            <div className="backdrop-blur-md bg-black/60 border border-[var(--racing-red)]/30 rounded-lg p-3">
              <div className="text-[10px] font-mono text-gray-400 uppercase">Sector Gain</div>
              <div className="text-2xl font-display text-[var(--telemetry-green)]">-0.241s</div>
              <div className="text-[10px] text-gray-500">vs Session Best</div>
              <svg className="w-full h-12 mt-2" viewBox="0 0 100 40">
                <polyline points="0,30 20,25 40,28 60,20 80,15 100,10" fill="none" stroke="var(--telemetry-green)" strokeWidth="2"/>
              </svg>
            </div>
            <div className="backdrop-blur-md bg-black/60 border border-border rounded-lg p-3">
              <div className="text-[10px] font-mono text-gray-400 uppercase">Brake Trace</div>
              <div className="text-2xl font-display text-white">98%</div>
              <div className="text-[10px] text-gray-500">Efficiency</div>
              <svg className="w-full h-12 mt-2" viewBox="0 0 100 40">
                <polyline points="0,20 20,25 40,15 60,28 80,22 100,30" fill="none" stroke="#E10600" strokeWidth="2"/>
              </svg>
            </div>
            <div className="backdrop-blur-md bg-black/60 border border-border rounded-lg p-3">
              <div className="text-[10px] font-mono text-gray-400 uppercase">Top Speed</div>
              <div className="text-2xl font-display text-[var(--warning-amber)]">241 <span className="text-sm">km/h</span></div>
              <div className="text-[10px] text-gray-500">Max</div>
              <svg className="w-full h-12 mt-2" viewBox="0 0 100 40">
                <polyline points="0,35 20,30 40,25 60,28 80,20 100,18" fill="none" stroke="var(--warning-amber)" strokeWidth="2"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 pb-[250px] lg:pb-20 w-full z-10">
        <div className="lg:max-w-[50%]">
          <div className="space-y-8">
            <div className="space-y-5">
              {/* Mobile: pill badge | Desktop: plain mono text */}
              <div>
                <span className="inline-block lg:hidden rounded-full bg-[var(--racing-red)] px-4 py-1.5 text-xs font-semibold text-white tracking-widest uppercase">
                  LIVE WORKSHOP
                </span>
                <div className="hidden lg:block text-[var(--racing-red)] font-mono text-xs tracking-[0.25em] uppercase">
                  LIVE WORKSHOP FOR ASPIRING ENGINEERS
                </div>
              </div>

              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-white">
                Stop guessing.<br />
                Start reading<br />
                the <span className="text-gradient-red">race car</span><br />
                through data.
              </h1>

              <p className="text-base text-gray-300 max-w-xl leading-relaxed">
                A 6-hour practical workshop that teaches you how motorsport engineers analyze telemetry and extract real performance.
              </p>
            </div>

            {/* CTA Buttons — stacked full-width on mobile, row on desktop */}
            <div className="flex flex-col lg:flex-row gap-3">
              <button
                onClick={handlePayment}
                className="w-full lg:w-auto inline-flex items-center justify-center gap-2 rounded-lg px-8 py-4 text-base font-semibold text-white tracking-wide transition hover:scale-[1.02]"
                style={{ background: "var(--gradient-red)" }}
              >
                RESERVE YOUR SEAT — {WORKSHOP_PRICE}
              </button>
              <button className="w-full lg:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-black/40 backdrop-blur px-6 py-4 text-base font-medium text-white hover:bg-white/10 transition">
                 View Workshop Agenda
              </button>
            </div>

            {/* Trust Indicators — 3 on mobile, 4 on desktop */}
            <div className="pt-6 border-t border-white/10">
              {/* Mobile: 3 items */}
              <div className="flex flex-wrap items-center gap-6 lg:hidden">
                {mobileTrust.map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <item.icon className="size-5 text-[var(--racing-red)]" />
                    <div>
                      <div className="text-white font-semibold text-base leading-none">{item.label}</div>
                      <div className="text-gray-400 text-xs mt-0.5">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Desktop: all 4 items */}
              <div className="hidden lg:flex flex-wrap items-center gap-8">
                {trustIndicators.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <item.icon className="size-5 text-[var(--racing-red)]" />
                    <div>
                      <div className="text-white font-semibold text-lg leading-none">{item.label}</div>
                      <div className="text-gray-400 text-xs mt-1">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE ONLY: image + floating cards block ── */}
      <div className="lg:hidden absolute bottom-0 left-0 right-0 h-[220px] pointer-events-none">
        <img
          src="/images/hero-telemetry.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        {/* top fade into the dark overlay above */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/80 to-transparent" />
        {/* bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0A0E13] to-transparent" />

        {/* Floating Telemetry Cards */}
        <div className="absolute bottom-6 left-4 right-4 grid grid-cols-3 gap-2 pointer-events-auto">
          <div className="backdrop-blur-md bg-black/70 border border-[var(--racing-red)]/30 rounded-lg p-2.5">
            <div className="text-[9px] font-mono text-gray-400 uppercase">Sector Gain</div>
            <div className="text-lg font-display text-[var(--telemetry-green)]">-0.241s</div>
            <div className="text-[9px] text-gray-500">vs Session Best</div>
            <svg className="w-full h-8 mt-1" viewBox="0 0 100 40">
              <polyline points="0,30 20,25 40,28 60,20 80,15 100,10" fill="none" stroke="var(--telemetry-green)" strokeWidth="2"/>
            </svg>
          </div>
          <div className="backdrop-blur-md bg-black/70 border border-border rounded-lg p-2.5">
            <div className="text-[9px] font-mono text-gray-400 uppercase">Brake Trace</div>
            <div className="text-lg font-display text-white">98%</div>
            <div className="text-[9px] text-gray-500">Efficiency</div>
            <svg className="w-full h-8 mt-1" viewBox="0 0 100 40">
              <polyline points="0,20 20,25 40,15 60,28 80,22 100,30" fill="none" stroke="#E10600" strokeWidth="2"/>
            </svg>
          </div>
          <div className="backdrop-blur-md bg-black/70 border border-border rounded-lg p-2.5">
            <div className="text-[9px] font-mono text-gray-400 uppercase">Top Speed</div>
            <div className="text-lg font-display text-[var(--warning-amber)]">241 <span className="text-xs">km/h</span></div>
            <div className="text-[9px] text-gray-500">Max</div>
            <svg className="w-full h-8 mt-1" viewBox="0 0 100 40">
              <polyline points="0,35 20,30 40,25 60,28 80,20 100,18" fill="none" stroke="var(--warning-amber)" strokeWidth="2"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────── WHAT YOU'LL LEARN ──────────────────────────
function WhatYouLearn() {
  const skills = [
    { icon: Activity, title: "Understand telemetry channels and signals" },
    { icon: Gauge, title: "Analyze driver inputs like throttle, brake, steer & more" },
    { icon: Timer, title: "Perform lap & sector analysis like engineering teams" },
    { icon: LineChart, title: "Identify performance gains & optimize lap time" },
    { icon: Trophy, title: "Compare laps and driving stints" },
    { icon: Zap, title: "Basic race strategy & data-driven decisions" },
    { icon: Database, title: "Work with real motorsport datasets" },
    { icon: Wrench, title: "Final hands-on engineering exercise" },
  ];

  return (
    <section className="relative py-16 bg-[#060A0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* Left: Heading — fixed width */}
          <div className="lg:w-[300px] shrink-0">
            <div className="text-[var(--racing-red)] font-mono text-xs tracking-[0.25em] uppercase mb-4">
              WHAT YOU'LL LEARN
            </div>
            <h2 className="font-display text-4xl sm:text-5xl leading-tight text-white">
              In 6 hours, you'll Analyse<br />
              a motorsport dataset like a <span className="text-gradient-red">race engineer</span>.
            </h2>
          </div>

          {/* Right: 4-col × 2-row grid */}
          <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-3">
            {skills.map((skill) => (
              <div
                key={skill.title}
                className="rounded-xl border border-white/10 bg-[#0D1521] p-4 hover:border-[var(--racing-red)]/40 transition-all"
              >
                <div className="size-10 rounded-full border border-[var(--racing-red)]/40 bg-[var(--racing-red)]/10 flex items-center justify-center mb-3">
                  <skill.icon className="size-5 text-[var(--racing-red)]" />
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{skill.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────── WORKFLOW SECTION ──────────────────────────
// function WorkflowSection() {
//   const steps = [
//     { num: "1", title: "Capture Data", desc: "Understand what the car and driver data actually represents." },
//     { num: "2", title: "Compare & Visualize", desc: "Overlay lap channels and drivers to see the bigger picture." },
//     { num: "3", title: "Analyze & Interpret", desc: "Find the reasons behind performance differences." },
//     { num: "4", title: "Make Engineering Decisions", desc: "Turn insights into real lap time or setup gains." },
//   ];
  
//   return (
//     <section className="relative py-20 bg-gradient-to-b from-[#060A0F] to-[#0B1220]">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6">
//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
//           {/* Left: Content */}
//           <div>
//             <div className="text-[var(--racing-red)] font-mono text-xs tracking-[0.25em] uppercase mb-4">
//               THE REAL WORKFLOW ENGINEERS FOLLOW
//             </div>
//             <h2 className="font-display text-4xl sm:text-5xl leading-tight text-white mb-6">
//               Learn the exact <span className="text-gradient-red">workflow</span><br />
//               used by motorsport<br />
//               engineers.
//             </h2>
            
//             <div className="space-y-6 mt-10">
//               {steps.map((step) => (
//                 <div key={step.num} className="flex gap-4">
//                   <div className="shrink-0 size-12 rounded-full border-2 border-[var(--racing-red)] bg-[var(--racing-red)]/10 flex items-center justify-center">
//                     <span className="font-display text-2xl text-[var(--racing-red)]">{step.num}</span>
//                   </div>
//                   <div>
//                     <h3 className="font-heading text-xl text-white mb-1">{step.title}</h3>
//                     <p className="text-sm text-gray-400">{step.desc}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
          
//           {/* Right: Image */}
//           <div className="relative">
//             <div className="relative rounded-2xl overflow-hidden border border-white/10">
//               <img 
//                 src="/images/workflow-engineer.png" 
//                 alt="Engineer analyzing race data" 
//                 className="w-full h-auto"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/80 via-transparent to-transparent pointer-events-none" />
              
//               {/* Motorsport logos overlay */}
//               <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between gap-4">
//                 <div className="text-xs text-gray-400 font-mono">Tech stack no real element from...</div>
//                 <div className="flex items-center gap-4 opacity-50">
//                   <div className="text-white font-bold text-sm">F1</div>
//                   <div className="text-white font-bold text-sm">WEC</div>
//                   <div className="text-white font-bold text-sm">IMSA</div>
//                   <div className="text-white font-bold text-sm">F2</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

function TrustStrip() {
  const items = [
    { icon: Users, label: "1000+ Students Trained" },
    { icon: Wrench, label: "Built by Race Car Engineers" },
    { icon: Activity, label: "Practical Motorsport Data Workflow" },
    // { icon: Trophy, label: "Gateway to Full Course" },
  ];
  return (
    <section className="border-y border-border bg-[var(--bg-2)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((i) => (
          <div key={i.label} className="flex items-center gap-3 text-sm text-[var(--muted-foreground)]">
            <i.icon className="size-4 text-[var(--racing-red)] shrink-0" />
            <span>{i.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ────────────────────────── PROBLEM ──────────────────────────
function Problem() {
  const cards = [
    { icon: Database, title: "Raw data looks confusing", desc: "Channels, traces and time-aligned signals feel like noise without a workflow." },
    { icon: Gauge, title: "Vehicle dynamics feels theoretical", desc: "Textbook formulas don't tell you what to look at after a session." },
    { icon: Trophy, title: "Race engineering roles feel unreachable", desc: "It's unclear how engineers actually convert data into setup decisions." },
    { icon: LineChart, title: "Most courses don't give practical datasets", desc: "Without real data and a guided exercise, learning stays surface-level." },
  ];
  return (
    <section id="problem" className="relative py-16 sm:py-24 overflow-hidden">
      {/* Right-side background image with gradient fade */}
      {/* Desktop: right-side panel */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none hidden lg:block">
        <img
          src="/images/workflow-engineer.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)] via-[var(--background)]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)]/50 via-transparent to-[var(--background)]/50" />
      </div>

      {/* Mobile: full-bleed background */}
      <div className="absolute inset-0 pointer-events-none lg:hidden">
        <img
          src="/images/workflow-engineer.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[var(--background)]/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)]/50 via-transparent to-[var(--background)]/50" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-8 bg-[var(--racing-red)]" />
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-[var(--racing-red)]">THE GAP</span>
        </div>
        <SectionHeading>
          Motorsport Is Not Just Driving Fast.<br />
          It Is <span className="text-gradient-red">Knowing Why You Are Slow.</span>
        </SectionHeading>
        <p className="text-[var(--muted-foreground)] max-w-3xl mb-10 leading-relaxed">
          Most students watch racing and understand cars emotionally, but struggle to answer engineering questions like:
        </p>
        <ul className="space-y-2 mb-10 text-[var(--muted-foreground)]">
          {[
            "Where exactly is the driver losing time?",
            "Is the problem driver input, tyre grip, braking, gearing, or setup?",
            "How do you convert raw logged data into a decision?",
            "What does a race engineer actually look at after a session?",
          ].map((q) => (
            <li key={q} className="flex gap-3"><ChevronRight className="size-5 text-[var(--racing-red)] shrink-0 mt-0.5" />{q}</li>
          ))}
        </ul>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c) => (
            <Card key={c.title} className="bg-[var(--card)]/80 backdrop-blur-sm">
              <c.icon className="size-6 text-[var(--racing-red)] mb-3" />
              <h3 className="font-heading text-lg mb-2">{c.title}</h3>
              <p className="text-sm text-[var(--muted-foreground)]">{c.desc}</p>
            </Card>
          ))}
        </div>
        <p className="mt-10 text-lg text-center text-[var(--foreground)] font-medium">
          This workshop is designed to <span className="text-[var(--racing-red)]">close that gap in one weekend.</span>
        </p>
      </div>
    </section>
  );
}

// ────────────────────────── PROMISE ──────────────────────────
function Promise() {
  const items = [
    { icon: Activity, title: "Understand telemetry channels" },
    { icon: Timer, title: "Compare laps and sectors" },
    { icon: LineChart, title: "Read throttle, brake, steering & speed traces" },
    { icon: XCircle, title: "Identify driver mistakes" },
    { icon: Gauge, title: "Connect data with vehicle dynamics" },
    { icon: Zap, title: "Create simple KPIs for performance analysis" },
    { icon: Database, title: "Get real-time data for practice" },
    { icon: Award, title: "Receive certificate of participation" },
  ];
  return (
    <Section id="promise" eyebrow="THE PROMISE">
      <SectionHeading>
        In 6 Hours, You Will Analyse a<br />
        Motorsport Dataset Like a <span className="text-gradient-red">Race Engineer.</span>
      </SectionHeading>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {items.map((i) => (
          <Card key={i.title} className="group hover:border-[var(--racing-red)]/50 hover:-translate-y-1 transition-all">
            <i.icon className="size-6 text-[var(--racing-red)] mb-3" />
            <h3 className="font-medium text-[var(--foreground)]">{i.title}</h3>
          </Card>
        ))}
      </div>
    </Section>
  );
}

// ────────────────────────── AUDIENCE ──────────────────────────
function Audience() {
  const yes = [
    "Engineering students",
    "Formula Student / Baja / Go-Kart team members",
    "Motorsport enthusiasts",
    "Aspiring race engineers",
    "Automotive testing & validation engineers",
    "Vehicle dynamics learners",
    "Data analysts interested in motorsports",
    "Drivers who want to understand telemetry",
  ];
  return (
    <section id="audience" className="relative py-16 sm:py-24 bg-[#0A0E13]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading and "Yes" List */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-[var(--racing-red)]" />
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-[var(--racing-red)]">WHO IT'S FOR</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl leading-[1.05] mb-6 max-w-lg text-white">
              Built for <span className="text-gradient-red">Serious Motorsport Learners.</span>
            </h2>
            <ul className="space-y-3 mt-8">
              {yes.map((y) => (
                <li key={y} className="flex items-start gap-3 text-sm text-gray-300">
                  <CheckCircle2 className="size-5 text-[var(--telemetry-green)] shrink-0 mt-0.5" />
                  <span>{y}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Image with "Not For You If" card overlay */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 min-h-[300px] lg:min-h-[450px]">
            <img
              src="/images/workflow-engineer.png"
              alt="Engineer analyzing race data"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Dark overlay for text readability, and blend with background */}
            <div className="absolute inset-0 bg-black/50 md:bg-black/30 lg:bg-black/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E13] via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0A0E13]/20" />

            {/* "Not For You If" Card */}
            <div className="absolute bottom-6 right-6 max-w-xs w-full p-6 rounded-xl border border-[var(--warning-amber)]/30 bg-black/70 backdrop-blur-sm shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="size-5 text-[var(--warning-amber)]" />
                <h3 className="font-heading text-lg text-white">Not For You If</h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                This workshop is not for people looking for a passive motivational webinar. You should join only if you are ready to sit with data, think like an engineer, and practice after the session.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────── AGENDA ──────────────────────────
function Agenda() {
  const hours = [
    { h: "Hour 1", t: "Motorsport Data Foundations", points: ["What data engineers look at after a run", "Common telemetry channels: speed, RPM, throttle, brake, steering, G, tyre temperature", "How raw logged data becomes engineering insight"] },
    { h: "Hour 2", t: "Reading Driver Inputs", points: ["Throttle trace", "Brake trace", "Steering trace", "Identifying over-driving, late braking, early throttle, inconsistent inputs"] },
    { h: "Hour 3", t: "Lap & Sector Comparison", points: ["Fast lap vs slow lap", "Sector delta", "Entry, mid-corner and exit analysis", "Where lap time is gained or lost"] },
    { h: "Hour 4", t: "Vehicle Dynamics Through Data", points: ["Grip, lateral G, understeer/oversteer indicators", "Tyre temperature & pressure interpretation", "Setup thinking from data"] },
    { h: "Hour 5", t: "Hands-On Dataset Practice", points: ["Real-time race data provided", "Guided analysis exercise", "Build a simple performance report"] },
    { h: "Hour 6", t: "Career Path", points: ["How race engineers and performance analysts work", "What to learn after this workshop", "Q&A and certificate briefing"] },
  ];

  return (
    <section id="agenda" className="relative pt-12 lg:py-24 bg-[#060A0F] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/agenda-background.png"
          alt="Race control room"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060A0F] via-[#060A0F]/90 to-[#060A0F]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px w-8 bg-[var(--racing-red)]" />
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-[var(--racing-red)]">THE AGENDA</span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl text-white mb-2">6-Hour <span className="text-gradient-red">Practical Agenda</span></h2>

        {/* Vertical timeline */}
        <div className="relative">
          {/* Timeline line - visible on desktop only */}
          <div className="hidden lg:block absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-[var(--racing-red)] via-[var(--steel)] to-transparent" />
          
          <div className="space-y-6 lg:space-y-4">
            {hours.map((h, i) => (
              <div key={h.h} className="relative lg:pl-16">
                {/* Number circle */}
                <div className="flex items-start gap-4 lg:block">
                  <div className="flex-shrink-0 lg:absolute lg:left-0 lg:top-4 size-12 lg:size-12 rounded-full border-2 border-[var(--racing-red)] bg-[#060A0F] flex items-center justify-center font-mono text-sm lg:text-xs font-bold text-[var(--racing-red)]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 lg:rounded-xl lg:border lg:border-border lg:bg-[var(--card)]/80 lg:backdrop-blur-sm lg:p-6 lg:hover:border-[var(--racing-red)]/40 lg:transition">
                    {/* Desktop only: HOUR label with divider */}
                    <div className="hidden lg:flex items-center gap-3 mb-3">
                      <span className="font-mono text-[10px] tracking-widest text-[var(--racing-red)]">{h.h.toUpperCase()}</span>
                      <div className="h-px flex-1 bg-border" />
                    </div>
                    
                    <h3 className="font-heading text-xl lg:text-2xl text-white mb-2 lg:mb-3">{h.t}</h3>
                    <p className="text-sm text-gray-400 lg:hidden">{h.points.join(", ")}</p>
                    
                    {/* Desktop only: bullet list */}
                    <ul className="hidden lg:block space-y-1.5">
                      {h.points.map((p) => (
                        <li key={p} className="flex gap-2 text-sm text-[var(--muted-foreground)]">
                          <span className="text-[var(--racing-red)] mt-0.5">›</span>{p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-8 text-sm text-[var(--muted-foreground)] text-center">
          <Database className="inline size-4 text-[var(--telemetry-green)] mr-2" />
          Participants will receive real-time data for practice. Laptop recommended.
        </p>
      </div>

      {/* Bottom quote with full-width background image */}
      <div className="relative mt-12 lg:mt-20 overflow-hidden min-h-[300px] lg:min-h-[400px]">
        <img
          src="/images/race-control.png"
          alt="Race control room"
          className="absolute inset-0 w-full h-full object-cover object-right scale-110 brightness-110"
        />
        {/* mobile: lighter overlay so image shows clearly; desktop: darker */}
        <div className="absolute inset-0 bg-black/25 lg:bg-black/40" />
        {/* top & bottom fade into the section background */}
        <div className="absolute inset-x-0 top-0  lg:h-24 bg-gradient-to-b from-[#060A0F] to-transparent" />
        <div className="absolute inset-x-0 bottom-0  lg:h-24 bg-gradient-to-t from-[#060A0F] to-transparent" />

        <div className="relative py-20 lg:py-32 px-6 flex items-center min-h-[300px] lg:min-h-[400px]">
          <h3 className="font-display text-3xl leading-tight lg:text-center lg:text-5xl xl:text-6xl lg:leading-tight text-white uppercase max-w-5xl lg:mx-auto">
            Motorsport is not about driving harder.{" "}
            <span className="lg:block">It's about </span>
            <span className="text-gradient-red">understanding data faster.</span>
          </h3>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────── WHAT YOU GET ──────────────────────────
function WhatYouGet() {
  const items = [
    "6-hour live weekend training",
    "Real-time motorsport dataset",
    "Guided analysis workflow",
    "Certificate of participation",
    "Access to workshop recordings after live session",
    "WhatsApp batch group for updates",
    "Practical roadmap to continue learning",
    "Live Q&A and doubt solving",
  ];
  return (
    <Section id="value" eyebrow="WHAT'S INCLUDED">
      <SectionHeading>Your Workshop Pass <span className="text-gradient-red">Includes</span></SectionHeading>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
        {items.map((it) => (
          <div key={it} className="flex gap-3 rounded-lg border-gradient-red p-4">
            <CheckCircle2 className="size-5 text-[var(--telemetry-green)] shrink-0 mt-0.5" />
            <span className="text-sm">{it}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ────────────────────────── WHY VAHANTECH ──────────────────────────
function WhyVahanTech() {
  const cards = [
    { icon: Flag, title: "Race Car Engineering Background" },
    { icon: Gauge, title: "Vehicle Dynamics & Powertrain Expertise" },
    { icon: LineChart, title: "Automotive Product & Analytics Development" },
    { icon: Trophy, title: "Industry Exposure Across Leading OEMs" },
    { icon: Wrench, title: "Practical Training, Real-World Application" },
  ];
  return (
    <section id="why" className="relative py-16 sm:py-24 bg-[#060A0F] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/why-vahan.png"
          alt="Race control environment"
          className="w-full h-full object-cover object-center scale-125 sm:scale-60 "
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060A0F]/50 via-[#060A0F]/40 to-[#060A0F]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-8 bg-[var(--racing-red)]" />
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-[var(--racing-red)]">WHY VAHANTECH</span>
        </div>
        
        <h2 className="font-display text-3xl sm:text-5xl leading-[1.05] mb-6 max-w-4xl text-white">
          Learn From Engineers Who Work at the Intersection of<br />
          <span className="text-gradient-red">Motorsport, Vehicle Dynamics & Data.</span>
        </h2>
        
        <p className="text-[var(--muted-foreground)] max-w-3xl mb-10 leading-relaxed">
          VahanTech Engineering has trained 1000+ students and works across motorsport engineering, vehicle dynamics, data acquisition, automotive testing, diagnostics, ECU development, and connected vehicle technologies.
        </p>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {cards.map((c) => (
            <div key={c.title} className="rounded-xl border border-border bg-[var(--card)]/80 backdrop-blur-sm p-6 text-center hover:border-[var(--racing-red)]/40 transition">
              <c.icon className="size-7 text-[var(--racing-red)] mx-auto mb-3" />
              <h3 className="text-sm font-medium leading-snug text-white">{c.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ────────────────────────── TRAINER ──────────────────────────
function Trainer() {
  const skills = [
    "Vehicle Dynamics", "Data Analytics", "Simulation & Modelling",
    "Multibody Dynamics", "Tyre Pressure Prediction", "Lap Time Simulation",
    "Setup Optimisation", "Race Data Interpretation",
  ];
  return (
    <Section id="trainer" eyebrow="THE EXPERT">
      <SectionHeading>
        Learn the Workflow Used by<br />
        <span className="text-gradient-red">Motorsport Data & Performance Engineers.</span>
      </SectionHeading>
      <Card className="mt-8 p-6 sm:p-10">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* <div>
            <div className="aspect-square rounded-2xl border border-border bg-[var(--bg-2)] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 grid-bg opacity-40" />
              <div className="relative size-32 rounded-full bg-[var(--gradient-red)] flex items-center justify-center" style={{ background: "var(--gradient-red)" }}>
                <GraduationCap className="size-14 text-white" />
              </div>
            </div>
            <div className="mt-4 inline-flex items-center gap-2 rounded-md border border-[var(--warning-amber)]/40 bg-[var(--warning-amber)]/10 px-3 py-1.5">
              <Trophy className="size-4 text-[var(--warning-amber)]" />
              <span className="font-mono text-[10px] tracking-widest text-[var(--warning-amber)]">EX–ASTON MARTIN F1 EXPERIENCE</span>
            </div>
          </div> */}
          <div className="lg:col-span-2">
            <h3 className="font-heading text-2xl mb-4">Course Expert Profile</h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">
              Trainer expertise spans vehicle dynamics, data analytics, simulation and modelling, multibody dynamics, tyre pressure prediction, lap time simulation, setup optimisation, and race data interpretation. The course expert profile carries Ex–Aston Martin Formula One experience, ensuring you learn the workflow used inside competitive motorsport teams.
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} className="font-mono text-[10px] tracking-wide rounded border border-border bg-[var(--bg-2)] px-2.5 py-1.5 text-[var(--muted-foreground)]">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </Section>
  );
}

// ────────────────────────── OFFER ──────────────────────────
function Offer() {
  return (
    <Section id="offer" eyebrow="THE OFFER">
      <SectionHeading>Book the Next <span className="text-gradient-red">Weekend Workshop</span></SectionHeading>
      <div className="mt-10 grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 rounded-2xl border-gradient-red p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute top-4 right-4 font-mono text-[10px] tracking-widest text-[var(--racing-red)] border border-[var(--racing-red)]/40 rounded px-2 py-1">LIMITED SEATS</div>
          <div className="font-mono text-xs text-[var(--muted-foreground)] tracking-widest mb-2">WEEKEND WORKSHOP PASS</div>
          <div className="flex items-baseline gap-3 mb-6">
            <span className="font-display text-6xl sm:text-7xl text-white">{WORKSHOP_PRICE}</span>
            <span className="text-[var(--muted-foreground)]">one-time</span>
          </div>
          <ul className="space-y-2.5 mb-8">
            {[
              "6-Hour Live Practical Workshop",
              "Certificate Included",
              "Real-time Data Included",
              // "Limited Seats Per Batch",
              // seatsRemaining === null ? "Limited seats per batch" : `${seatsRemaining} of ${seatsLimit} seats remaining`,
            ].map((x) => (
              <li key={x} className="flex gap-3 text-sm"><CheckCircle2 className="size-5 text-[var(--telemetry-green)] shrink-0" />{x}</li>
            ))}
          </ul>
          <button onClick={handlePayment} className="w-full inline-flex items-center justify-center gap-2 rounded-md px-6 py-4 font-semibold text-white glow-red transition hover:scale-[1.01]" style={{ background: "var(--gradient-red)" }}>
            Reserve My Seat for {WORKSHOP_PRICE}
            <ArrowRight className="size-4" />
          </button>
          {/* <p className="mt-3 text-center text-xs text-[var(--muted-foreground)]">No sales call required. Direct registration. Serious learners only.</p> */}
        </div>
        <div className="lg:col-span-2 space-y-3">
          <Card>
            <div className="flex items-center gap-3 mb-2"><Calendar className="size-5 text-[var(--racing-red)]" /><span className="font-mono text-[10px] tracking-widest text-[var(--muted-foreground)]">NEXT BATCH</span></div>
            <p className="font-heading text-xl">{NEXT_BATCH_DATE}</p>
          </Card>
          <Card>
            <div className="flex items-center gap-3 mb-2"><Clock className="size-5 text-[var(--racing-red)]" /><span className="font-mono text-[10px] tracking-widest text-[var(--muted-foreground)]">TIME</span></div>
            <p className="font-heading text-xl">{NEXT_BATCH_TIME}</p>
          </Card>
          <Card>
            <div className="flex items-center gap-3 mb-2"><MapPin className="size-5 text-[var(--racing-red)]" /><span className="font-mono text-[10px] tracking-widest text-[var(--muted-foreground)]">FORMAT</span></div>
            <p className="font-heading text-xl">Online Live Workshop</p>
          </Card>
          <div className="rounded-xl border border-[var(--telemetry-green)]/30 bg-[var(--telemetry-green)]/5 p-4 text-xs text-[var(--muted-foreground)] leading-relaxed">
            After registration, you will receive confirmation on WhatsApp & email. Final date and time will be shared before the upcoming weekend batch. If the announced slot does not work for you, you can shift to the next batch.
          </div>
        </div>
      </div>
    </Section>
  );
}

// ────────────────────────── FOMO ──────────────────────────
function FOMO() {
  const cards = [
    "Limited live Q&A slots",
    "Early registrants get batch priority",
    "Workshop fee may increase after initial launch batches",
  ];
  return (
    <Section id="fomo" eyebrow="WHY ACT NOW">
      <SectionHeading>Why Seats Are <span className="text-gradient-red">Limited</span></SectionHeading>
      <p className="text-[var(--muted-foreground)] max-w-3xl mb-8 leading-relaxed">
        This is not a mass webinar. The workshop includes practical walkthroughs, real-time data, and Q&A. To keep the session useful, each batch will have limited seats.
      </p>
      <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-3">
        {cards.map((c, i) => (
          <Card key={c} className="hover:border-[var(--racing-red)]/40 transition">
            <div className="font-mono text-xs text-[var(--racing-red)] mb-2">0{i + 1}</div>
            <p className="text-sm">{c}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

// ────────────────────────── UPSELL ──────────────────────────
function Upsell() {
  const modules = [
    "Data Logging & Analysis", "Setup Measurements", "Tyre Science",
    "Cornering Dynamics", "Suspension Geometry & Load Transfer",
    "Springs and Anti-Roll Bars", "Dampers", "Differential",
    "Gearing", "Driver Performance",
  ];
  return (
    <Section id="upsell" eyebrow="GO DEEPER">
      <SectionHeading>Want to Go Deeper <span className="text-gradient-red">After the Workshop?</span></SectionHeading>
      <p className="text-[var(--muted-foreground)] max-w-3xl mb-8 leading-relaxed">
        The workshop gives you the starting workflow. The full Data Analysis in Motorsports course takes you deeper into data logging, setup measurements, tyre science, cornering dynamics, suspension, dampers, gearing, racing line evaluation, and driver-performance analysis.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
        {modules.map((m, i) => (
          <div key={m} className="rounded-lg border border-border bg-[var(--card)] p-4 hover:border-[var(--racing-red)]/40 transition">
            <div className="font-mono text-[10px] text-[var(--racing-red)] mb-1">M{String(i + 1).padStart(2, "0")}</div>
            <div className="text-sm font-medium">{m}</div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <button onClick={handlePayment} className="inline-flex items-center justify-center gap-2 rounded-md px-6 py-3.5 font-semibold text-white glow-red transition hover:scale-[1.02]" style={{ background: "var(--gradient-red)" }}>
          Join Workshop First
          <ArrowRight className="size-4" />
        </button>
      </div>
    </Section>
  );
}

function FAQSection() {
  return (
    <Section id="faq" eyebrow="QUESTIONS">
      <SectionHeading>Frequently Asked <span className="text-gradient-red">Questions</span></SectionHeading>
      <div className="mt-8 max-w-3xl mx-auto"><FAQ /></div>
    </Section>
  );
}

// ────────────────────────── FINAL CTA ──────────────────────────
function FinalCTA() {
  return (
    <section className="relative overflow-hidden min-h-[420px] flex items-center bg-[#0A0E13]">
      {/* Mobile: full-cover centered image */}
      <img
        src="/images/final-cta-bg.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-right lg:hidden"
      />
      {/* Desktop: car anchored to the right */}
      <img
        src="/images/final-cta-bg.png"
        alt=""
        className="absolute right-0 top-0 h-full w-[95%] object-cover object-left hidden lg:block"
      />

      {/* Mobile overlay: dark center so text pops, slight red tint */}
      <div className="absolute inset-0 bg-black/53 lg:hidden" />
      <div className="absolute inset-0 bg-[var(--racing-red)]/10 lg:hidden" />

      {/* Desktop overlay: left-to-right gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E13] via-[#0A0E13]/85 to-transparent hidden lg:block" />

      {/* Shared top/bottom vignette */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0A0E13] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0A0E13] to-transparent" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-28 text-center lg:text-left">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl leading-tight">
            YOUR FIRST STEP INTO<br />
            <span className="text-gradient-red">MOTORSPORT DATA ANALYSIS</span><br />
            STARTS HERE.
          </h2>
          <p className="mt-5 text-gray-300 max-w-xl mx-auto lg:mx-0">
            Join hundreds of aspiring engineers and start thinking like the teams on the grid.
          </p>
          <button onClick={handlePayment} className="mt-8 w-full lg:w-auto inline-flex items-center justify-center gap-2 rounded-md px-8 py-4 text-sm font-semibold text-white tracking-widest transition hover:scale-[1.02]" style={{ background: "var(--gradient-red)" }}>
            RESERVE YOUR SEAT · {WORKSHOP_PRICE}
          </button>
          <p className="mt-3 font-mono text-[10px] text-gray-400 tracking-widest">Limited Seats. Reserve Now!</p>
        </div>
      </div>
    </section>
  );
}

// ────────────────────────── FOOTER ──────────────────────────
function Footer() {
  return (
    <footer className="border-t border-border bg-[var(--bg-2)] pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="size-8 rounded-md flex items-center justify-center" style={{ background: "var(--gradient-red)" }}>
              <Flag className="size-4 text-white" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-lg tracking-wider">VAHANTECH</div>
              <div className="font-mono text-[9px] text-[var(--muted-foreground)] tracking-widest -mt-0.5">ENGINEERING</div>
            </div>
          </div>
          <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
            Practical motorsport, vehicle dynamics & data analytics training built by race car engineers.
          </p>
        </div>
        <div>
          <h4 className="font-mono text-[10px] tracking-widest text-[var(--racing-red)] mb-3">CONTACT</h4>
          <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
            <li className="flex items-center gap-2"><Mail className="size-4" /><a href="mailto:admin@vahantech.in" className="hover:text-white">admin@vahantech.in</a></li>
            <li className="flex items-center gap-2"><Phone className="size-4" /><a href="tel:+916287894109" className="hover:text-white">+91 628789 4109</a></li>
            <li className="flex items-center gap-2"><Globe className="size-4" /><a href="https://www.vahantech.in/course/data-analysis-in-motorsport/" target="_blank" rel="noreferrer" className="hover:text-white">vahantech.in</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-mono text-[10px] tracking-widest text-[var(--racing-red)] mb-3">WORKSHOP</h4>
          <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
            <li><a href="#agenda" className="hover:text-white">Agenda</a></li>
            <li><a href="#offer" className="hover:text-white">Pricing</a></li>
            <li><a href="#faq" className="hover:text-white">FAQ</a></li>
          </ul>
        </div>
        {/* <div>
          <h4 className="font-mono text-[10px] tracking-widest text-[var(--racing-red)] mb-3">LEGAL</h4>
          <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
            <li>Refund / transfer policy</li>
            <li>Terms &amp; Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div> */}
      </div>
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[var(--muted-foreground)]">
          <p>© {new Date().getFullYear()} VahanTech Engineering. All rights reserved.</p>
          <p className="font-mono">BUILT FOR ENGINEERS · POWERED BY DATA</p>
        </div>
      </div>
    </footer>
  );
}

// ────────────────────────── MOBILE STICKY CTA ──────────────────────────
function MobileStickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t border-border bg-[#060A0F]/95 backdrop-blur-md">
      <div className="px-4 py-3 flex items-center justify-between gap-3">
        <div>
          <div className="font-mono text-[9px] tracking-widest text-[var(--muted-foreground)]">WEEKEND WORKSHOP</div>
          <div className="font-display text-lg leading-none mt-0.5">{WORKSHOP_PRICE} · Book Seat</div>
        </div>
        <button onClick={handlePayment} className="shrink-0 inline-flex items-center gap-1.5 rounded-md px-4 py-2.5 text-sm font-semibold text-white glow-red" style={{ background: "var(--gradient-red)" }}>
          Pay Now <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}

// ────────────────────────── SHARED ──────────────────────────
function Section({ id, eyebrow, children }: { id?: string; eyebrow?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative py-12 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {eyebrow && (
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-[var(--racing-red)]" />
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-[var(--racing-red)]">{eyebrow}</span>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-3xl sm:text-5xl leading-[1.05] mb-6 max-w-4xl">{children}</h2>;
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-border bg-[var(--card)] p-5 sm:p-6 shadow-[var(--shadow-card)] ${className}`}>
      {children}
    </div>
  );
}

function CTABand({ label }: { label: string }) {
  return (
    <section className="border-y border-border bg-[var(--bg-2)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-heading text-lg sm:text-xl text-center sm:text-left">{label}</p>
        <button onClick={handlePayment} className="inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold text-white glow-red transition hover:scale-[1.02]" style={{ background: "var(--gradient-red)" }}>
          Book Weekend Workshop · {WORKSHOP_PRICE}
          <ArrowRight className="size-4" />
        </button>
      </div>
    </section>
  );
}
