import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import PageHeader from "@/components/fraud/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, ShieldAlert, ShieldQuestion, Loader2, Lock, Globe } from "lucide-react";

export const Route = createFileRoute("/_app/extension")({
  component: ExtensionMockup,
});

type Verdict = "green" | "yellow" | "red";
type Result = {
  verdict: Verdict;
  source: "trusted" | "dangerous" | "secondary";
  label: string;
  detail: string;
};

const TRUSTED = ["google.com", "wikipedia.org", "github.com", "apple.com", "microsoft.com", "amazon.com"];
const DANGEROUS = ["evil-phishing.com", "malware-host.net", "fake-bank-login.io", "free-prize-now.cc", "verify-account-secure.ru"];

function ExtensionMockup() {
  const [url, setUrl] = useState("");
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const check = () => {
    if (!url.trim()) return;
    setChecking(true);
    setResult(null);
    setTimeout(() => {
      const lower = url.toLowerCase();
      const isTrusted = TRUSTED.some((d) => lower.includes(d));
      const isDangerous = DANGEROUS.some((d) => lower.includes(d));
      let r: Result;
      if (isTrusted) {
        r = { verdict: "green", source: "trusted", label: "Trusted", detail: "Listed in trusted site registry." };
      } else if (isDangerous) {
        r = { verdict: "red", source: "dangerous", label: "Dangerous", detail: "Listed in known threat registry." };
      } else {
        r = {
          verdict: "yellow",
          source: "secondary",
          label: "Unknown Site",
          detail: "This site is not in our registry. Proceed with caution.",
        };
      }
      setResult(r);
      setChecking(false);
    }, 700);
  };

  const verdict = result?.verdict ?? null;

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title={<>The <em>popup</em>, previewed.</>}
        description="A mockup of the M7 Detector browser extension popup. Try a URL — it checks live."
      />

      <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-start">
        {/* Faux browser chrome */}
        <div className="rounded-2xl border border-border bg-card/40 backdrop-blur p-6">
          {/* URL input at top of preview */}
          <div className="flex gap-2 mb-4">
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && check()}
              placeholder="Enter a URL to scan (e.g. evil-phishing.com)"
              className="h-10 font-mono text-xs bg-muted/40 border-border"
            />
            <Button
              onClick={check}
              disabled={checking}
              className="h-10 px-5 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {checking ? <Loader2 className="h-4 w-4 animate-spin" /> : "Check Site"}
            </Button>
          </div>
          <div className="rounded-xl border border-border bg-background overflow-hidden">
            <div className="flex items-center gap-2 px-3 h-9 border-b border-border bg-muted/40">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
              <div className="ml-3 flex-1 flex items-center gap-2 rounded-md bg-background px-3 py-1 border border-border">
                <Lock className="h-3 w-3 text-muted-foreground" />
                <span className="font-mono text-[11px] text-muted-foreground truncate">
                  {url || "https://your-target.com"}
                </span>
              </div>
              <div className="h-6 w-6 rounded-md bg-[var(--gradient-primary)] flex items-center justify-center text-primary-foreground">
                <ShieldCheck className="h-3 w-3" />
              </div>
            </div>
            <div className="aspect-[16/9] flex items-center justify-center text-muted-foreground/40">
              <div className="relative w-full h-full overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.28_0.05_260/.45),transparent_60%)]" />
                <div className="absolute inset-0 bg-cyber-grid opacity-30" />
                <div className="absolute top-6 left-6 right-6 h-6 rounded bg-muted/40" />
                <div className="absolute top-16 left-6 w-1/3 h-32 rounded bg-muted/30" />
                <div className="absolute top-16 left-1/2 right-6 h-4 rounded bg-muted/30" />
                <div className="absolute top-24 left-1/2 right-6 h-4 rounded bg-muted/20" />
                <div className="absolute top-32 left-1/2 right-1/4 h-4 rounded bg-muted/20" />
                <div className="absolute bottom-6 left-6 right-6 h-10 rounded bg-muted/25" />
                <Globe className="absolute bottom-6 right-6 h-10 w-10 text-muted-foreground/30" />
              </div>
            </div>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-4 text-center">
            Hosted page · preview only
          </p>

          {/* Known sites reference list */}
          <div className="mt-6 grid sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-success/30 bg-success/5 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-success mb-2">
                Safe sites
              </p>
              <ul className="space-y-1">
                {TRUSTED.map((d) => (
                  <li key={d} className="font-mono text-xs text-foreground/80">● {d}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-destructive mb-2">
                Unsafe sites
              </p>
              <ul className="space-y-1">
                {DANGEROUS.map((d) => (
                  <li key={d} className="font-mono text-xs text-foreground/80">● {d}</li>
                ))}
              </ul>
            </div>
            <div className="sm:col-span-2 rounded-xl border border-warning/30 bg-warning/5 p-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-warning">
                Unknown site · any URL not listed above is flagged yellow as "Unknown Site"
              </p>
            </div>
          </div>
        </div>

        {/* Extension popup */}
        <div className="w-full lg:w-[340px] rounded-2xl bg-card border border-border shadow-[var(--shadow-elevated)] overflow-hidden">
          <div className="bg-sidebar text-sidebar-foreground px-4 py-3 flex items-center gap-2 border-b border-sidebar-border">
            <div className="h-7 w-7 rounded-md bg-[var(--gradient-primary)] flex items-center justify-center text-primary-foreground">
              <ShieldCheck className="h-3.5 w-3.5" />
            </div>
            <div>
              <div className="font-display text-sm leading-none">M7 Detector</div>
              <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-sidebar-foreground/50 mt-0.5">
                v1.0 · popup
              </div>
            </div>
          </div>

          <div className="p-4 space-y-3">
            {/* Color risk bar */}
            <div className="rounded-md overflow-hidden border border-border">
              <div className="flex h-3">
                <div className={`flex-1 transition-opacity ${verdict === "green" ? "bg-success" : "bg-success/20"}`} />
                <div className={`flex-1 transition-opacity ${verdict === "yellow" ? "bg-warning" : "bg-warning/20"}`} />
                <div className={`flex-1 transition-opacity ${verdict === "red" ? "bg-destructive" : "bg-destructive/20"}`} />
              </div>
              <div className="flex justify-between font-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground px-1 py-1">
                <span>Safe</span>
                <span>Middle</span>
                <span>Dangerous</span>
              </div>
            </div>

            <div
              className={`rounded-xl border p-4 flex items-center gap-3 transition-all ${
                verdict === "green"
                  ? "border-success/40 bg-success/10 text-success"
                  : verdict === "yellow"
                    ? "border-warning/40 bg-warning/10 text-warning"
                    : verdict === "red"
                      ? "border-destructive/40 bg-destructive/10 text-destructive"
                      : "border-border bg-muted/20 text-muted-foreground"
              }`}
            >
              {verdict === "green" ? (
                <ShieldCheck className="h-6 w-6 shrink-0" />
              ) : verdict === "yellow" ? (
                <ShieldAlert className="h-6 w-6 shrink-0" />
              ) : verdict === "red" ? (
                <ShieldAlert className="h-6 w-6 shrink-0" />
              ) : (
                <ShieldQuestion className="h-6 w-6 shrink-0" />
              )}
              <div className="min-w-0">
                <div className="font-display text-base leading-none">
                  {result ? result.label : "Awaiting scan"}
                </div>
                <div className="font-mono text-[10px] tracking-wide mt-1 opacity-80 normal-case">
                  {result ? result.detail : "Enter URL to check"}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground pt-2">
              <span>Realtime · ON</span>
              <span className="text-primary">●</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}