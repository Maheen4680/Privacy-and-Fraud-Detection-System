import { Activity, ShieldX, ShieldCheck, TrendingUp } from "lucide-react";

type Props = {
  totalScans: number;
  threatsBlocked: number;
};

function Stat({
  label,
  value,
  icon: Icon,
  tone,
  hint,
}: {
  label: string;
  value: string | number;
  icon: typeof Activity;
  tone: "primary" | "accent" | "destructive" | "warning";
  hint?: string;
}) {
  const toneClass = {
    primary: "bg-primary/10 text-primary border-primary/30",
    accent: "bg-accent/10 text-accent border-accent/30",
    destructive: "bg-destructive/10 text-destructive border-destructive/30",
    warning: "bg-warning/10 text-warning border-warning/30",
  }[tone];
  const dot = {
    primary: "bg-primary",
    accent: "bg-accent",
    destructive: "bg-destructive",
    warning: "bg-warning",
  }[tone];
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-card/70 backdrop-blur p-5 border border-border shadow-[var(--shadow-card)] hover:border-primary/40 transition-colors">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {label}
          </span>
        </div>
        <div className={`h-9 w-9 rounded-lg border flex items-center justify-center ${toneClass}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="font-display text-5xl text-foreground leading-none">{value}</div>
      {hint && (
        <div className="mt-2 font-mono text-[10px] text-muted-foreground/70">{hint}</div>
      )}
    </div>
  );
}

export default function ReportDashboard({ totalScans, threatsBlocked }: Props) {
  const cleared = totalScans - threatsBlocked;
  const rate = totalScans > 0 ? Math.round((cleared / totalScans) * 100) : 100;
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Stat label="Total Scans" value={totalScans} icon={Activity} tone="primary" hint="lifetime" />
      <Stat label="Threats Blocked" value={threatsBlocked} icon={ShieldX} tone="destructive" hint="malicious" />
      <Stat label="Clean URLs" value={cleared} icon={ShieldCheck} tone="accent" hint="verified safe" />
      <Stat label="Safety Rate" value={`${rate}%`} icon={TrendingUp} tone="warning" hint="trust index" />
    </div>
  );
}