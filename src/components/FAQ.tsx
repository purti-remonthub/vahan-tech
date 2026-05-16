import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "What is the workshop fee?", a: "The workshop fee is ₹999." },
  { q: "What is the duration?", a: "The workshop duration is 6 hours." },
  { q: "Is this live or recorded?", a: "The workshop is planned as a live weekend session. Recorded sessions will be shared with students who attend the workshop." },
  // { q: "Is the date fixed?", a: "The next batch date and time are yet to be announced. Registered participants will receive the final schedule on WhatsApp and email. If the announced slot does not work for you, you can move to the next batch." },
  { q: "Will I get a certificate?", a: "Yes, a certificate of participation will be provided." },
  { q: "Do I need prior motorsport experience?", a: "No. Basic automotive interest is enough. However, the workshop is best for serious learners who want to understand race car data practically." },
  { q: "Do I need a laptop?", a: "A laptop is recommended because the workshop includes practical data-analysis walkthroughs and real-time data." },
  { q: "Will real-time data be provided?", a: "Yes. Participants will receive real-time data for practice." },
  { q: "Which tools will be used?", a: "Industry-standard tools commonly used in motorsport data analysis and practical engineering workflows will be covered throughout the course." },
  { q: "Is this useful for Formula Student or Baja teams?", a: "Yes. The workshop is highly relevant for students working on Formula Student, Baja, go-karting, vehicle dynamics, testing, and telemetry-related projects." },
  // { q: "Is this a replacement for the full course?", a: "No. This is a focused 6-hour practical workshop. The full Data Analysis in Motorsports course covers the subject in much greater depth." },
  { q: "Will someone call me after registration?", a: "No, you will receive confirmation and batch details through WhatsApp/email after payment." },
  { q: "What if I cannot attend the announced batch?", a: "You can shift to the next batch." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {faqs.map((f, i) => (
        <div key={i} className="rounded-xl border border-border bg-[var(--card)] overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/[0.02] transition"
          >
            <span className="font-medium text-[var(--foreground)]">{f.q}</span>
            <ChevronDown className={`size-5 text-[var(--muted-foreground)] shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
          </button>
          {open === i && (
            <div className="px-5 pb-5 text-[var(--muted-foreground)] text-sm leading-relaxed border-t border-border pt-4">
              {f.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
