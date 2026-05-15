export function TelemetryDashboard() {
  return (
    <div className="relative rounded-2xl border border-border bg-[var(--card)] p-4 sm:p-6 shadow-[var(--shadow-card)] overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="relative">
        {/* Header bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[var(--telemetry-green)] pulse-dot" />
            <span className="font-mono text-[10px] sm:text-xs text-[var(--muted-foreground)] tracking-widest">LIVE TELEMETRY • LAP 24 / 58</span>
          </div>
          <span className="font-mono text-[10px] sm:text-xs text-[var(--muted-foreground)]">CIRCUIT_03</span>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
          <KPI label="LAP DELTA" value="-0.842" unit="s" tone="green" />
          <KPI label="TOP SPEED" value="287" unit="km/h" />
          <KPI label="LAT G" value="2.41" unit="g" tone="amber" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Chart label="THROTTLE %" color="#00E676" path="M0,40 L20,40 L25,10 L60,10 L70,38 L100,38 L110,8 L160,8 L170,40 L200,40 L210,12 L260,12 L270,40 L300,40" />
          <Chart label="BRAKE TRACE" color="#E10600" path="M0,40 L30,40 L40,15 L65,15 L75,40 L120,40 L130,18 L160,18 L170,40 L220,40 L230,12 L260,12 L270,40 L300,40" />
          <Chart label="STEERING ANGLE" color="#FFC857" path="M0,25 Q40,5 80,25 T160,25 T240,25 T300,25" />
          <Chart label="SPEED km/h" color="#A7B0C0" path="M0,40 L20,15 L60,8 L100,12 L130,30 L160,10 L200,6 L240,28 L270,12 L300,8" />
        </div>

        {/* Sector strip */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <Sector label="S1" delta="-0.21" tone="green" />
          <Sector label="S2" delta="+0.08" tone="amber" />
          <Sector label="S3" delta="-0.71" tone="green" />
        </div>
      </div>
    </div>
  );
}

function KPI({ label, value, unit, tone }: { label: string; value: string; unit: string; tone?: "green" | "amber" }) {
  const color = tone === "green" ? "text-[var(--telemetry-green)]" : tone === "amber" ? "text-[var(--warning-amber)]" : "text-[var(--foreground)]";
  return (
    <div className="rounded-lg border border-border bg-[var(--bg-2)] p-2 sm:p-3">
      <div className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[var(--muted-foreground)]">{label}</div>
      <div className={`font-mono text-base sm:text-2xl font-bold ${color}`}>{value}<span className="text-[10px] sm:text-xs ml-1 text-[var(--muted-foreground)]">{unit}</span></div>
    </div>
  );
}

function Chart({ label, color, path }: { label: string; color: string; path: string }) {
  return (
    <div className="rounded-lg border border-border bg-[var(--bg-2)] p-2 sm:p-3">
      <div className="flex items-center justify-between mb-1">
        <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[var(--muted-foreground)]">{label}</span>
        <span className="size-1.5 rounded-full" style={{ backgroundColor: color }} />
      </div>
      <svg viewBox="0 0 300 50" className="w-full h-12 sm:h-16">
        <defs>
          <linearGradient id={`g-${label}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${path} L300,50 L0,50 Z`} fill={`url(#g-${label})`} />
        <path d={path} fill="none" stroke={color} strokeWidth="1.5" className="telemetry-line" />
      </svg>
    </div>
  );
}

function Sector({ label, delta, tone }: { label: string; delta: string; tone: "green" | "amber" }) {
  const color = tone === "green" ? "text-[var(--telemetry-green)]" : "text-[var(--warning-amber)]";
  return (
    <div className="rounded-lg border border-border bg-[var(--bg-2)] px-2 py-1.5 flex items-center justify-between">
      <span className="font-mono text-[10px] text-[var(--muted-foreground)]">{label}</span>
      <span className={`font-mono text-xs sm:text-sm font-bold ${color}`}>{delta}s</span>
    </div>
  );
}
