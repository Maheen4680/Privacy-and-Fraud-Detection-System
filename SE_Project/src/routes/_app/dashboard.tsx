import { createFileRoute, Link } from "@tanstack/react-router";
import { useSession } from "@/lib/session";
import PageHeader from "@/components/fraud/PageHeader";
import {
  Gauge,
  Eye,
  FileText,
  AppWindow,
  Award,
  Search,
  UploadCloud,
  BarChart3,
  ArrowUpRight,
  ShieldCheck,
  Activity,
} from "lucide-react";

export const Route = createFileRoute("/_app/dashboard")({
  component: Dashboard,
});

const CONSUMER_TILES = [
  { to: "/trust-score", label: "Trust Score", icon: Gauge, hint: "Live risk gauge" },
  { to: "/privacy-analyzer", label: "Privacy Analyzer", icon: Eye, hint: "Audit data points" },
  { to: "/terms-summarizer", label: "T&C Summarizer", icon: FileText, hint: "Decode legalese" },
  { to: "/extension", label: "Browser Extension", icon: AppWindow, hint: "Live site check" },
];

const BUSINESS_TILES = [
  { to: "/fraud-detection", label: "Fraud Detection", icon: Search, hint: "Customer risk scan" },
  { to: "/data-processing", label: "Data Cleaning", icon: UploadCloud, hint: "CSV dedupe pipeline" },
  { to: "/loyalty", label: "Loyalty", icon: Award, hint: "Reward top customers" },
  { to: "/reporting", label: "Analytics", icon: BarChart3, hint: "Threat analytics" },
];

function Dashboard() {
  const { session } = useSession();
  if (!session) return null;
  const isBusiness = session.role === "business";
  const tiles = isBusiness ? BUSINESS_TILES : CONSUMER_TILES;

  return (
    <div className="max-w-7xl mx-auto">
      <section className="relative overflow-hidden rounded-3xl border border-border bg-[var(--gradient-hero)] p-8 lg:p-12 mb-10">
        <div className="absolute inset-0 bg-cyber-grid opacity-40" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/40 bg-accent/10 text-accent font-mono text-[10px] uppercase tracking-[0.25em] mb-5">
            <ShieldCheck className="h-3 w-3" />
            {isBusiness ? "Business Console" : "Consumer Hub"}
          </div>
          <h1 className="font-display text-5xl lg:text-6xl leading-[0.95] text-foreground max-w-3xl">
            Welcome, <em className="text-gradient not-italic">{session.name}</em>.
          </h1>
          <p className="mt-5 max-w-xl text-muted-foreground text-base lg:text-lg leading-relaxed">
            {isBusiness
              ? "Run fraud scans, process datasets, and monitor threats across your perimeter."
              : "Audit the sites you visit, decode terms of service, and earn trust points."}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge icon={Activity} label="System Active" tone="primary" />
            <Badge icon={ShieldCheck} label="Threat DB synced" tone="accent" />
          </div>
        </div>
      </section>

      <PageHeader title={<><em>Features</em></>} description="Each tile is a live module — click to enter." />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tiles.map((t) => {
          const Icon = t.icon;
          return (
            <Link
              key={t.to}
              to={t.to}
              className="group relative overflow-hidden rounded-2xl bg-card/70 backdrop-blur p-6 border border-border shadow-[var(--shadow-card)] hover:border-primary/50 transition-all"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-start justify-between mb-6">
                <div className="h-11 w-11 rounded-xl bg-[var(--gradient-primary)] flex items-center justify-center text-primary-foreground glow-cyan">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="font-display text-2xl text-foreground mb-1">{t.label}</div>
              <div className="font-mono text-[11px] text-muted-foreground/80">{t.hint}</div>
              <ArrowUpRight className="absolute bottom-5 right-5 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function Badge({ icon: Icon, label, tone }: { icon: typeof Activity; label: string; tone: "primary" | "accent" }) {
  const cls =
    tone === "primary"
      ? "border-primary/30 bg-primary/10 text-primary"
      : "border-accent/30 bg-accent/10 text-accent";
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${cls}`}>
      <Icon className="h-3 w-3" />
      <span className="font-mono text-[10px] uppercase tracking-[0.2em]">{label}</span>
    </span>
  );
}