import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import PageHeader from "@/components/fraud/PageHeader";
import { Button } from "@/components/ui/button";
import { RefreshCw, ShieldCheck, ShieldAlert, ShieldOff } from "lucide-react";

export const Route = createFileRoute("/_app/trust-score")({
  component: TrustScore,
});

function TrustScore() {
  const [score, setScore] = useState(82);
  const [rolling, setRolling] = useState(false);

  const tone = score >= 75 ? "primary" : score >= 50 ? "warning" : "destructive";
  const Label = score >= 75 ? ShieldCheck : score >= 50 ? ShieldAlert : ShieldOff;
  const verdict = score >= 75 ? "Low Risk" : score >= 50 ? "Moderate Risk" : "High Risk";

  const circumference = 2 * Math.PI * 80;
  const offset = circumference * (1 - score / 100);

  const refresh = () => {
    setRolling(true);
    setTimeout(() => {
      setScore(Math.floor(40 + Math.random() * 60));
      setRolling(false);
    }, 700);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title={<>Your live <em>trust</em> reading.</>}
        description="A composite of recent browsing exposure, privacy posture, and threat intel."
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="relative overflow-hidden rounded-2xl bg-card/80 backdrop-blur p-8 border border-border shadow-[var(--shadow-elevated)]">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
          <div className="flex flex-col items-center">
            <div className="relative h-64 w-64">
              <div className="absolute inset-0 rounded-full border border-primary/15" />
              <div className="absolute inset-6 rounded-full border border-primary/10" />
              <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full -rotate-90">
                <circle cx="100" cy="100" r="80" strokeWidth="10" fill="none" className="stroke-muted/60" />
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  className={`transition-all duration-700 ${
                    tone === "primary"
                      ? "stroke-primary"
                      : tone === "warning"
                        ? "stroke-warning"
                        : "stroke-destructive"
                  }`}
                  style={{
                    filter:
                      tone === "destructive"
                        ? "drop-shadow(0 0 10px oklch(0.68 0.24 18 / 0.6))"
                        : "drop-shadow(0 0 10px oklch(0.82 0.16 210 / 0.6))",
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-7xl text-foreground leading-none">{score}</span>
                <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  / 100
                </span>
              </div>
            </div>

            <div
              className={`mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border ${
                tone === "primary"
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : tone === "warning"
                    ? "border-warning/40 bg-warning/10 text-warning"
                    : "border-destructive/40 bg-destructive/10 text-destructive"
              }`}
            >
              <Label className="h-4 w-4" />
              <span className="font-display text-lg">{verdict}</span>
            </div>

            <Button
              onClick={refresh}
              disabled={rolling}
              className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${rolling ? "animate-spin" : ""}`} />
              Recompute Score
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { label: "Phishing exposure (30d)", value: 92, hint: "No malicious URLs visited" },
            { label: "Tracker density", value: 64, hint: "Avg 8 trackers per site" },
            { label: "Credential hygiene", value: 78, hint: "2 reused passwords detected" },
            { label: "Permission overreach", value: 71, hint: "3 apps with location access" },
          ].map((m) => (
            <div key={m.label} className="rounded-2xl bg-card/70 backdrop-blur p-5 border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {m.label}
                </span>
                <span className="font-display text-xl text-foreground">{m.value}</span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--gradient-primary)]"
                  style={{ width: `${m.value}%` }}
                />
              </div>
              <p className="font-mono text-[10px] text-muted-foreground/70 mt-2">{m.hint}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}