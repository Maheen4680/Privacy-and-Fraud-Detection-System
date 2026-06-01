import { createFileRoute } from "@tanstack/react-router";
import PageHeader from "@/components/fraud/PageHeader";
import { CUSTOMERS } from "@/data/customers";
import { ShieldAlert, ShieldCheck, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/_app/fraud-detection")({
  component: FraudDetection,
});

function FraudDetection() {
  const total = CUSTOMERS.length;
  const risky = CUSTOMERS.filter((c) => c.trustScore < 30).length;
  const safe = total - risky;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <PageHeader
        title={<>Customer <em>risk</em> radar.</>}
        description="Trust scores across your customer base. Accounts below 30 are flagged in red for review."
      />

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <Stat label="Total Customers" value={total} icon={ShieldCheck} tone="primary" />
        <Stat label="Flagged · Score < 30" value={risky} icon={ShieldAlert} tone="destructive" />
        <Stat label="In Good Standing" value={safe} icon={ShieldCheck} tone="accent" />
      </div>

      <div className="rounded-2xl bg-card/80 backdrop-blur border border-border shadow-[var(--shadow-card)] overflow-hidden">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">Customer Ledger</p>
            <h2 className="font-display text-2xl text-foreground mt-1">Trust <em>Scoreboard</em></h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-destructive">
            <AlertTriangle className="h-3 w-3" />
            Auto-flag · score &lt; 30
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground bg-muted/30">
                <th className="px-5 py-3">Customer</th>
                <th className="px-5 py-3">Account Age</th>
                <th className="px-5 py-3">Returns Count</th>
                <th className="px-5 py-3">Trust Score</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {CUSTOMERS.map((c) => {
                const flagged = c.trustScore < 30;
                return (
                  <tr
                    key={c.id}
                    className={`border-t border-border transition-colors ${
                      flagged
                        ? "bg-destructive/15 text-destructive hover:bg-destructive/20"
                        : "hover:bg-muted/20"
                    }`}
                  >
                    <td className="px-5 py-3">
                      <div className="font-display text-base leading-none">{c.name}</div>
                      <div className="font-mono text-[10px] opacity-70 mt-1">{c.email} · {c.id}</div>
                    </td>
                    <td className="px-5 py-3 font-mono text-xs">{c.accountAgeDays} days</td>
                    <td className="px-5 py-3 font-mono text-xs">{c.returnsCount}</td>
                    <td className="px-5 py-3 font-display text-lg">{c.trustScore}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest ${
                          flagged
                            ? "border-destructive/50 bg-destructive/20"
                            : "border-primary/30 bg-primary/10 text-primary"
                        }`}
                      >
                        {flagged ? <ShieldAlert className="h-3 w-3" /> : <ShieldCheck className="h-3 w-3" />}
                        {flagged ? "Flagged" : "OK"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  icon: Icon,
  tone,
}: {
  label: string;
  value: number;
  icon: typeof ShieldCheck;
  tone: "primary" | "accent" | "destructive";
}) {
  const cls = {
    primary: "bg-primary/10 text-primary border-primary/30",
    accent: "bg-accent/10 text-accent border-accent/30",
    destructive: "bg-destructive/10 text-destructive border-destructive/30",
  }[tone];
  return (
    <div className="rounded-2xl bg-card/70 backdrop-blur p-5 border border-border shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
        <div className={`h-9 w-9 rounded-lg border flex items-center justify-center ${cls}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="font-display text-5xl text-foreground leading-none">{value}</div>
    </div>
  );
}