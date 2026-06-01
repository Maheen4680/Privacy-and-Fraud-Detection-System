import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import PageHeader from "@/components/fraud/PageHeader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/_app/terms-summarizer")({
  component: TermsSummarizer,
});

const BULLET_POOL = [
  "Your data may be shared with third-party advertising partners.",
  "The service reserves the right to modify these terms without prior notice.",
  "Content you upload may be used to train internal models.",
  "Account termination requires a 30-day written notice.",
  "Disputes are resolved via binding arbitration in the provider's jurisdiction.",
  "Cookies and trackers are enabled by default for personalization.",
  "Refunds are not guaranteed and reviewed on a case-by-case basis.",
  "You waive class-action participation by accepting these terms.",
  "Service availability is provided on a best-effort basis without SLA.",
];

const GENERIC_POOL = [
  "This site wants to access your location.",
  "This site shares your information with third-party advertisers.",
  "Your browsing activity may be tracked across other websites.",
  "Personal data may be transferred to servers outside your country.",
  "This site uses cookies to personalize content and ads.",
  "Your account may be suspended without prior notice.",
  "Uploaded content may be used to train AI models.",
  "This service may collect your device identifier and IP address.",
  "Your microphone or camera may be accessed for certain features.",
  "You waive the right to participate in class-action lawsuits.",
  "Disputes are resolved via binding arbitration only.",
  "Push notifications are enabled by default.",
  "This site may read and write data to your clipboard.",
  "Your contact list may be uploaded to improve recommendations.",
  "Refunds are reviewed on a case-by-case basis and not guaranteed.",
  "Account data may be retained for up to 5 years after deletion.",
];

function TermsSummarizer() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState<string[] | null>(null);
  const [stage, setStage] = useState<"idle" | "tokenizing" | "extracting" | "summarizing">("idle");
  const [preview, setPreview] = useState<string[]>([]);

  const handleInput = (v: string) => {
    setText(v);
    if (v.trim()) {
      const count = 4 + Math.floor(Math.random() * 3);
      setPreview([...GENERIC_POOL].sort(() => Math.random() - 0.5).slice(0, count));
    } else {
      setPreview([]);
    }
  };

  const run = async () => {
    if (!text.trim()) return;
    setSummary(null);
    setStage("tokenizing");
    await new Promise((r) => setTimeout(r, 500));
    setStage("extracting");
    await new Promise((r) => setTimeout(r, 600));
    setStage("summarizing");
    await new Promise((r) => setTimeout(r, 600));
    const bullets = [...BULLET_POOL].sort(() => Math.random() - 0.5).slice(0, 6);
    setSummary(bullets);
    setStage("idle");
  };

  const busy = stage !== "idle";

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title={<>Decode <em>legalese</em> in seconds.</>}
        description="Paste any Terms of Service and surface the clauses that matter."
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-card/80 backdrop-blur p-6 border border-border shadow-[var(--shadow-card)]">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
            Input · paste contents
          </p>
          <Textarea
            value={text}
            onChange={(e) => handleInput(e.target.value)}
            placeholder="Paste the full Terms of Service text here…"
            className="min-h-[280px] font-mono text-xs bg-muted/40 border-border focus-visible:ring-primary"
          />
          <Button
            onClick={run}
            disabled={busy || !text.trim()}
            className="mt-4 w-full h-11 bg-[var(--gradient-accent)] text-accent-foreground hover:opacity-90 glow-violet"
          >
            {busy ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
            {busy ? `${stage}…` : "Summarize"}
          </Button>
        </div>

        <div className="rounded-2xl bg-card/80 backdrop-blur p-6 border border-border shadow-[var(--shadow-card)]">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-3">
            Output · key clauses
          </p>
          {busy && (
            <div className="space-y-3 mt-4">
              {["Tokenizing input", "Extracting clauses", "Summarizing"].map((step, i) => {
                const active = stage === ["tokenizing", "extracting", "summarizing"][i];
                const done = ["tokenizing", "extracting", "summarizing"].indexOf(stage) > i;
                return (
                  <div
                    key={step}
                    className={`flex items-center gap-3 rounded-lg border px-3 py-2 font-mono text-xs ${
                      active
                        ? "border-primary/40 bg-primary/10 text-primary"
                        : done
                          ? "border-success/40 bg-success/10 text-success"
                          : "border-border bg-muted/20 text-muted-foreground"
                    }`}
                  >
                    {active ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : done ? (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-50" />
                    )}
                    {step}
                  </div>
                );
              })}
            </div>
          )}
          {summary && !busy && (
            <ul className="space-y-3 mt-2">
              {summary.map((b, i) => (
                <li key={i} className="flex items-start gap-3 rounded-lg border border-border bg-muted/20 px-3 py-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  <span className="font-sans text-sm text-foreground leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          )}
          {!busy && !summary && (
            preview.length > 0 ? (
              <ul className="space-y-3 mt-2">
                {preview.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 rounded-lg border border-border bg-muted/20 px-3 py-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    <span className="font-sans text-sm text-foreground leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-10">
                <p className="font-display text-xl text-foreground/70 italic">Awaiting input…</p>
                <p className="font-mono text-xs text-muted-foreground mt-2">
                  Start typing to see common Terms of Service clauses.
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}