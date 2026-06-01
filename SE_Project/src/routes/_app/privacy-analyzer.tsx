import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import PageHeader from "@/components/fraud/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, MapPin, Cookie, Globe, Fingerprint, Mic, Camera, Database, Eye } from "lucide-react";

export const Route = createFileRoute("/_app/privacy-analyzer")({
  component: PrivacyAnalyzer,
});

const ALL_POINTS = [
  { key: "Location", icon: MapPin, risk: "high", note: "Geolocation API in use" },
  { key: "Cookies", icon: Cookie, risk: "medium", note: "14 third-party cookies set" },
  { key: "IP Address", icon: Globe, risk: "medium", note: "Logged for analytics" },
  { key: "Device Fingerprint", icon: Fingerprint, risk: "high", note: "Canvas + WebGL fingerprinting" },
  { key: "Microphone", icon: Mic, risk: "low", note: "Requested but not granted" },
  { key: "Camera", icon: Camera, risk: "low", note: "Not requested" },
  { key: "Local Storage", icon: Database, risk: "medium", note: "112 keys persisted" },
  { key: "Behavioral Tracking", icon: Eye, risk: "high", note: "Scroll + click events streamed" },
];

function PrivacyAnalyzer() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<typeof ALL_POINTS | null>(null);

  const analyze = () => {
    if (!url.trim()) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const count = 4 + Math.floor(Math.random() * 5);
      const shuffled = [...ALL_POINTS].sort(() => Math.random() - 0.5).slice(0, count);
      setResult(shuffled);
      setLoading(false);
    }, 900);
  };

  const toneOf = (r: string) =>
    r === "high"
      ? "border-destructive/40 bg-destructive/10 text-destructive"
      : r === "medium"
        ? "border-warning/40 bg-warning/10 text-warning"
        : "border-primary/40 bg-primary/10 text-primary";

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title={<>What this site <em>knows</em> about you.</>}
        description="Submit a URL to inspect the data points collected by the page."
      />

      <div className="rounded-2xl bg-card/80 backdrop-blur p-6 border border-border shadow-[var(--shadow-card)]">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && analyze()}
            placeholder="https://example.com"
            className="h-12 font-mono bg-muted/40 border-border focus-visible:ring-primary"
          />
          <Button
            onClick={analyze}
            disabled={loading}
            className="h-12 px-6 bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Analyze"}
          </Button>
        </div>
      </div>

      <div className="mt-6">
        {loading && (
          <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-10 text-center">
            <Loader2 className="h-6 w-6 text-primary animate-spin mx-auto mb-3" />
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Inspecting trackers · cookies · permissions…
            </p>
          </div>
        )}
        {result && (
          <>
            <div className="mb-4 flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Data Points Collected · {result.length} found
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">{url}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {result.map((p) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.key}
                    className="flex items-start gap-4 rounded-xl border border-border bg-card/70 backdrop-blur p-4"
                  >
                    <div className={`h-10 w-10 rounded-lg border flex items-center justify-center ${toneOf(p.risk)}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-display text-lg text-foreground">{p.key}</span>
                        <span className={`font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded ${toneOf(p.risk)}`}>
                          {p.risk}
                        </span>
                      </div>
                      <p className="font-mono text-[11px] text-muted-foreground mt-1">{p.note}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
        {!loading && !result && (
          <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-10 text-center">
            <p className="font-display text-xl text-foreground/80 italic">Awaiting target URL…</p>
            <p className="font-mono text-xs text-muted-foreground mt-2">
              The analyzer simulates a privacy audit against the page.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}