import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Trophy,
  Calendar,
  Clock,
  Wifi,
  Award,
  MessageCircle,
  ArrowLeft,
  ExternalLink,
  Mail,
  Phone,
  Laptop,
  Notebook,
  Gauge,
  Radio,
  PlayCircle,
  FileCheck,
} from "lucide-react";

// NOTE: Payment success should be verified from backend/webhook before giving final access.
// Query params (razorpay_payment_id, razorpay_order_id, razorpay_signature) are shown for
// reference only and must NOT be trusted as proof of payment.
//
// If the site uses a Razorpay Payment Link, configure its success redirect in the
// Razorpay Dashboard to point to: https://<your-domain>/thank-you

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Payment Successful — VahanTech Motorsport Workshop" },
      {
        name: "description",
        content:
          "Your seat for the VahanTech 6-hour weekend workshop on Data Analysis in Motorsports is reserved. Check next steps, joining info and preparation.",
      },
      { property: "og:title", content: "Payment Successful — Workshop Seat Reserved" },
      {
        property: "og:description",
        content:
          "Welcome to VahanTech's Data Analysis in Motorsports workshop. Decode real race data and think like a motorsport data engineer.",
      },
    ],
  }),
  component: ThankYouPage,
});

function useRazorpayParams() {
  const [params, setParams] = useState<{
    payment_id?: string;
    order_id?: string;
    signature?: string;
  }>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sp = new URLSearchParams(window.location.search);
    setParams({
      payment_id: sp.get("razorpay_payment_id") ?? undefined,
      order_id: sp.get("razorpay_order_id") ?? undefined,
      signature: sp.get("razorpay_signature") ?? undefined,
    });
  }, []);

  return params;
}

function TelemetryGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.07]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--moto-offwhite) 1px, transparent 1px), linear-gradient(90deg, var(--moto-offwhite) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <svg
        className="absolute inset-x-0 top-1/3 h-40 w-full animate-[telemetry_8s_linear_infinite] text-[var(--moto-green)]"
        viewBox="0 0 1200 160"
        preserveAspectRatio="none"
      >
        <path
          d="M0 100 Q 80 20 160 80 T 320 60 T 480 110 T 640 40 T 800 90 T 960 50 T 1120 100 T 1280 70"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
      <svg
        className="absolute inset-x-0 bottom-1/4 h-40 w-full animate-[telemetry_12s_linear_infinite_reverse] text-[var(--moto-red)]"
        viewBox="0 0 1200 160"
        preserveAspectRatio="none"
      >
        <path
          d="M0 80 Q 100 140 200 60 T 400 100 T 600 30 T 800 120 T 1000 70 T 1200 90"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
      <style>{`
        @keyframes telemetry { 0% { transform: translateX(0); } 100% { transform: translateX(-80px); } }
      `}</style>
    </div>
  );
}

function SuccessCheck() {
  return (
    <div className="relative mx-auto flex h-28 w-28 items-center justify-center">
      <span className="absolute inset-0 animate-ping rounded-full bg-[var(--moto-green)]/20" />
      <span className="absolute inset-2 rounded-full bg-[var(--moto-green)]/10" />
      <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[var(--moto-green)]/15 ring-2 ring-[var(--moto-green)]">
        <CheckCircle2 className="h-12 w-12 text-[var(--moto-green)]" strokeWidth={2.25} />
      </span>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow?: string;
  title: string;
}) {
  return (
    <div className="mb-8">
      {eyebrow ? (
        <div className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-[var(--moto-amber)]">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="font-display text-3xl uppercase tracking-wide text-[var(--moto-offwhite)] md:text-4xl">
        {title}
      </h2>
    </div>
  );
}

function ThankYouPage() {
  const { payment_id, order_id } = useRazorpayParams();
  const _batchParts = (import.meta.env.VITE_CLASSES_DATES?.split(",") ?? [])
  .map((s: string) => s.trim())
  .filter(Boolean);
const _fmt = (raw: string) => {
  // Append T12:00:00 so ISO date strings are treated as local time, not UTC
  const d = new Date(/^\d{4}-\d{2}-\d{2}$/.test(raw.trim()) ? `${raw.trim()}T12:00:00` : raw);
  if (isNaN(d.getTime())) return raw;
  const day = d.toLocaleDateString("en-GB", { weekday: "short" });
  const date = d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  return `${day} ${date}`;
};
const NEXT_BATCH_DATE =
  _batchParts.length >= 2
    ? `${_fmt(_batchParts[0])} – ${_fmt(_batchParts[1])}`
    : (_batchParts[0] ? _fmt(_batchParts[0]) : "To Be Announced");
  // Replace this with your actual WhatsApp group link
  const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/EXwTQqkvQJkBeknSIgglhg";

  const details: Array<{ label: string; value: string; icon: React.ReactNode }> = [
    { label: "Workshop", value: "Data Analysis in Motorsports", icon: <Trophy className="h-4 w-4" /> },
    { label: "Duration", value: "6 Hours", icon: <Clock className="h-4 w-4" /> },
    { label: "Date", value: NEXT_BATCH_DATE, icon: <Calendar className="h-4 w-4" /> },
    { label: "Time", value: "To Be Announced", icon: <Clock className="h-4 w-4" /> },
    { label: "Mode", value: "Online Live Workshop", icon: <Wifi className="h-4 w-4" /> },
    { label: "Fee Paid", value: "₹999", icon: <Gauge className="h-4 w-4" /> },
  ];

  const steps = [
    {
      icon: <MessageCircle className="h-5 w-5" />,
      title: "Confirmation",
      body: "You will receive your payment and registration confirmation on WhatsApp / email.",
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      title: "Batch Details",
      body: `The final time and joining link for the ${NEXT_BATCH_DATE} workshop will be shared before the session.`,
    },
    {
      icon: <Radio className="h-5 w-5" />,
      title: "Attend Live Workshop",
      body: "Join the 6-hour live practical workshop and analyse real race data with guided explanation.",
    },
    {
      icon: <PlayCircle className="h-5 w-5" />,
      title: "Recording & Certificate",
      body: "Registered students receive recording access and certificate details after the workshop.",
    },
  ];

  const checklist = [
    { icon: <Laptop className="h-4 w-4" />, text: "Laptop or desktop" },
    { icon: <Wifi className="h-4 w-4" />, text: "Stable internet connection" },
    { icon: <Notebook className="h-4 w-4" />, text: "Notebook for observations" },
    { icon: <Gauge className="h-4 w-4" />, text: "Basic interest in cars, racing, vehicle dynamics, or data analysis" },
    { icon: <FileCheck className="h-4 w-4" />, text: "Curiosity to understand how lap time is found from data" },
  ];

  const faqs = [
    {
      q: "My payment is successful. Is my seat confirmed?",
      a: "Yes. If you reached this page after successful payment, your workshop seat is reserved.",
    },
    {
      q: "When will I get the joining link?",
      a: "The joining link and exact time will be shared with registered students on WhatsApp and email before the workshop.",
    },
    {
      q: "Will I get the recording?",
      a: "Yes. The workshop recording will be shared with registered students after the live session.",
    },
    {
      q: "Will I get a certificate?",
      a: "Yes. A certificate of participation will be provided after the workshop.",
    },
    {
      q: "What if I cannot attend on the announced time?",
      a: "Contact VahanTech support. You may be shifted to the next available alternate-weekend batch, subject to availability.",
    },
  ];

  return (
    <div
      className="min-h-screen bg-[var(--moto-bg)] text-[var(--moto-offwhite)]"
      style={{
        backgroundImage:
          "radial-gradient(1200px 600px at 80% -10%, rgba(225,6,0,0.18), transparent 60%), radial-gradient(900px 500px at -10% 20%, rgba(0,230,118,0.07), transparent 60%)",
      }}
    >
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/5 px-6 pb-16 pt-20 md:pt-28">
        <TelemetryGrid />
        <div className="relative mx-auto max-w-5xl text-center">
          <SuccessCheck />
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--moto-green)]/40 bg-[var(--moto-green)]/10 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.25em] text-[var(--moto-green)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--moto-green)]" />
            Registration Confirmed
          </div>
          <h1 className="mt-6 font-display text-4xl uppercase leading-[1.05] tracking-wide text-[var(--moto-offwhite)] md:text-6xl">
            Payment Successful.
            <br />
            <span className="text-[var(--moto-red)]">Your Workshop Seat</span> Is Reserved.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-[var(--moto-muted)] md:text-lg">
            Welcome to VahanTech&rsquo;s 6-Hour Weekend Workshop on Data Analysis in
            Motorsports. Get ready to decode real race data and think like a motorsport
            data engineer.
          </p>

          {payment_id || order_id ? (
            <div className="mx-auto mt-6 inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-1 rounded-md border border-white/10 bg-[var(--moto-card)]/60 px-4 py-2 font-mono text-xs text-[var(--moto-muted)]">
              {payment_id ? (
                <span>
                  <span className="text-[var(--moto-amber)]">PAYMENT_ID:</span> {payment_id}
                </span>
              ) : null}
              {order_id ? (
                <span>
                  <span className="text-[var(--moto-amber)]">ORDER_ID:</span> {order_id}
                </span>
              ) : null}
            </div>
          ) : null}

          {/* Workshop details card */}
          <div className="mt-10 overflow-hidden rounded-xl border border-white/10 bg-[var(--moto-card)] text-left shadow-[0_30px_80px_-30px_rgba(225,6,0,0.35)]">
            <div className="flex items-center justify-between border-b border-white/5 bg-black/30 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--moto-muted)]">
              <span> Workshop Brief</span>
              <span className="text-[var(--moto-green)]">● LIVE</span>
            </div>
            <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
              {details.map((d) => (
                <div key={d.label} className="bg-[var(--moto-card)] p-5">
                  <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--moto-muted)]">
                    <span className="text-[var(--moto-red)]">{d.icon}</span>
                    {d.label}
                  </div>
                  <div className="mt-2 font-heading text-lg text-[var(--moto-offwhite)]">
                    {d.value}
                  </div>
                </div>
              ))}
              <div className="bg-[var(--moto-card)] p-5 sm:col-span-2 lg:col-span-3">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--moto-muted)]">
                  <Award className="h-4 w-4 text-[var(--moto-amber)]" /> Includes
                </div>
                <div className="mt-2 font-heading text-lg">
                  Real Race Data <span className="text-[var(--moto-muted)]">+</span>{" "}
                  Certificate <span className="text-[var(--moto-muted)]">+</span> Recording
                  Access
                </div>
              </div>
            </div>
            <div className="border-t border-white/5 bg-[var(--moto-amber)]/5 px-6 py-4 text-sm text-[var(--moto-amber)]">
              <strong className="font-semibold">Important:</strong> The exact workshop timing
              and joining link will be shared with you on WhatsApp and email before the
              session.
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap">
            {WHATSAPP_GROUP_LINK  ? (
              <a
                href={WHATSAPP_GROUP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--moto-green)] px-6 py-3 font-heading text-sm uppercase tracking-wider text-black transition hover:brightness-110"
              >
                <MessageCircle className="h-4 w-4" /> Join Workshop WhatsApp Group
              </a>
            ) : (
              <button
                disabled
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--moto-muted)] px-6 py-3 font-heading text-sm uppercase tracking-wider text-black opacity-50 cursor-not-allowed"
              >
                <MessageCircle className="h-4 w-4" /> Join Workshop WhatsApp Group
              </button>
            )}
            {/* <a
              href="https://www.vahantech.in/course/data-analysis-in-motorsport/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--moto-red)] px-6 py-3 font-heading text-sm uppercase tracking-wider text-[var(--moto-offwhite)] transition hover:brightness-110"
            >
              Explore Full Course <ExternalLink className="h-4 w-4" />
            </a> */}
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 bg-transparent px-6 py-3 font-heading text-sm uppercase tracking-wider text-[var(--moto-offwhite)] transition hover:bg-white/5"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Workshop Page
            </Link>
          </div>
        </div>
      </section>

      {/* NEXT STEPS */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="Lap 01 · Onboarding" title="What Happens Next?" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div
                key={s.title}
                className="group relative overflow-hidden rounded-lg border border-white/10 bg-[var(--moto-card)] p-6 transition hover:border-[var(--moto-red)]/40"
              >
                <div className="absolute right-4 top-3 font-mono text-xs text-[var(--moto-muted)]/70">
                  0{i + 1}
                </div>
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-[var(--moto-red)]/15 text-[var(--moto-red)]">
                  {s.icon}
                </div>
                <h3 className="font-heading text-lg uppercase tracking-wide text-[var(--moto-offwhite)]">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--moto-muted)]">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREPARATION */}
      <section className="border-y border-white/5 bg-black/30 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Pre-Race Checklist"
            title="Before the Workshop, Keep This Ready"
          />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <ul className="grid grid-cols-1 gap-3">
              {checklist.map((c) => (
                <li
                  key={c.text}
                  className="flex items-start gap-3 rounded-md border border-white/10 bg-[var(--moto-card)] p-4"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[var(--moto-green)]/15 text-[var(--moto-green)]">
                    {c.icon}
                  </span>
                  <span className="text-sm text-[var(--moto-offwhite)]/90">{c.text}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-lg border border-[var(--moto-amber)]/30 bg-[var(--moto-amber)]/5 p-6">
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--moto-amber)]">
                Note from the Engineers
              </div>
              <p className="mt-3 text-base leading-relaxed text-[var(--moto-offwhite)]/90">
                No advanced motorsport experience is required, but this workshop is
                designed for <strong>serious learners</strong> who want to practice and
                understand telemetry, driver inputs, and performance analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VISUAL */}
      <section
        className="relative isolate overflow-hidden px-6 py-32"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1583900985737-6d0495555783?auto=format&fit=crop&w=1800&q=80")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 -z-10 bg-[var(--moto-bg)]/80" />
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(120deg, rgba(225,6,0,0.55) 0%, rgba(6,10,15,0.85) 60%, rgba(6,10,15,0.95) 100%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl text-center">
          <div className="font-mono text-xs uppercase tracking-[0.4em] text-[var(--moto-amber)]">
             Driver Inputs · Lap Time
          </div>
          <h2 className="mt-4 font-display text-5xl uppercase leading-none tracking-wide text-[var(--moto-offwhite)] md:text-7xl">
            Decode the Data.
            <br />
            <span className="text-[var(--moto-red)]">Find the Lap Time.</span>
          </h2>
        </div>
      </section>

      {/* SUPPORT */}
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-[var(--moto-card)] p-8">
            <SectionHeading eyebrow="Pit Wall" title="Need Help?" />
            <p className="text-[var(--moto-muted)]">
              If you have any issue with your registration or do not receive confirmation,
              contact VahanTech support.
            </p>
            <div className="mt-6 space-y-3">
              <a
                href="mailto:admin@vahantech.in"
                className="flex items-center gap-3 rounded-md border border-white/10 bg-black/30 p-4 transition hover:border-[var(--moto-red)]/50"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[var(--moto-red)]/15 text-[var(--moto-red)]">
                  <Mail className="h-4 w-4" />
                </span>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--moto-muted)]">
                    Email
                  </div>
                  <div className="text-[var(--moto-offwhite)]">admin@vahantech.in</div>
                </div>
              </a>
              <a
                href="tel:+916287894109"
                className="flex items-center gap-3 rounded-md border border-white/10 bg-black/30 p-4 transition hover:border-[var(--moto-red)]/50"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[var(--moto-green)]/15 text-[var(--moto-green)]">
                  <Phone className="h-4 w-4" />
                </span>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--moto-muted)]">
                    Phone
                  </div>
                  <div className="text-[var(--moto-offwhite)]">+91 628789 4109</div>
                </div>
              </a>
            </div>
          </div>

          {/* FAQ */}
          <div className="rounded-lg border border-white/10 bg-[var(--moto-card)] p-8">
            <SectionHeading eyebrow="Race Briefing" title="FAQs" />
            <div className="divide-y divide-white/5">
              {faqs.map((f) => (
                <details key={f.q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left">
                    <span className="font-heading text-base uppercase tracking-wide text-[var(--moto-offwhite)]">
                      {f.q}
                    </span>
                    <span className="mt-1 font-mono text-xs text-[var(--moto-red)] transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-2 pr-8 text-sm leading-relaxed text-[var(--moto-muted)]">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-center text-xs text-[var(--moto-muted)] md:flex-row md:text-left">
          <div className="font-mono uppercase tracking-[0.25em]">
            VahanTech · Motorsport Data Engineering
          </div>
          <div>© {new Date().getFullYear()} VahanTech. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
