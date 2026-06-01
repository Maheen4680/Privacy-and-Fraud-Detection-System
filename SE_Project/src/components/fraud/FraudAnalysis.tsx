import { useState } from "react";
import { ShieldCheck, ShieldAlert, Search, Loader2, Radar } from "lucide-react";
import maliciousData from "@/data/maliciousUrls.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ScanResult = {
  malicious: boolean;
  score: number;
  message: string;
  url: string;
};

export default function FraudAnalysis({
  onScanComplete,
}: {
  onScanComplete?: (r: ScanResult) => void;
}) {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    if (!url.trim()) return;
    setScanning(true);
    setResult(null);
    setTimeout(() => {
      // Preserved core logic
      const isMalicious = (maliciousData as string[]).includes(url.toLowerCase());
      const score = isMalicious ? 18 : 92;
      const r: ScanResult = {
        malicious: isMalicious,
        score,
        message: isMalicious
          ? "CRITICAL: Malicious URL detected!"
          : "SAFE: URL is clean.",
        url,
      };
      setResult(r);
      setScanning(false);
      onScanComplete?.(r);
    }, 650);
  };

  const ring =
    result == null
      ? "stroke-muted"
      : result.malicious
        ? "stroke-destructive"
        : "stroke-accent";

  const circumference = 2 * Math.PI * 52;
  const offset = result ? circumference * (1 - result.score / 100) : circumference;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-card/80 backdrop-blur p-6 lg:p-8 shadow-[var(--shadow-elevated)] border border-border">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
      <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between mb-6 relative">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-[var(--gradient-primary)] flex items-center justify-center text-primary-foreground glow-cyan">
            <Search className="h-5 w-5" />
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">Primary Module</p>
            <h2 className="font-display text-3xl text-foreground leading-none mt-1">
              Fraud <em>Analysis</em> Engine
            </h2>
          </div>
        </div>
        {scanning && (
          <div className="flex items-center gap-2 text-xs font-mono text-primary">
            <Radar className="h-3 w-3 animate-spin" />
            scanning…
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        <div className="flex-1 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-muted-foreground">›</span>
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleScan()}
            placeholder="evil-phishing.com"
            className="h-12 pl-7 font-mono bg-muted/40 border-border focus-visible:ring-primary focus-visible:border-primary"
          />
        </div>
        <Button
          onClick={handleScan}
          disabled={scanning}
          className="h-12 px-6 bg-primary text-primary-foreground hover:bg-primary/90 font-medium tracking-wide glow-cyan"
        >
          {scanning ? <Loader2 className="h-4 w-4 animate-spin" /> : "Run Hybrid Scan"}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-center">
        <div className="relative h-48 w-48 shrink-0">
          {/* Radar rings */}
          <div className="absolute inset-0 rounded-full border border-primary/20" />
          <div className="absolute inset-4 rounded-full border border-primary/15" />
          <div className="absolute inset-8 rounded-full border border-primary/10" />
          <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full -rotate-90">
            <circle cx="60" cy="60" r="52" strokeWidth="6" fill="none" className="stroke-muted/60" />
            <circle
              cx="60"
              cy="60"
              r="52"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className={`${ring} transition-all duration-700`}
              style={{
                filter: result?.malicious
                  ? "drop-shadow(0 0 8px oklch(0.68 0.24 18 / 0.7))"
                  : "drop-shadow(0 0 8px oklch(0.82 0.16 210 / 0.7))",
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-5xl text-foreground leading-none">
              {result ? `${result.score}` : "--"}
            </span>
            <span className="mt-1 font-mono text-[10px] text-muted-foreground uppercase tracking-[0.25em]">
              Trust Score
            </span>
          </div>
        </div>

        <div className="flex-1 w-full">
          {result ? (
            <div
              className={`rounded-xl p-5 border animate-fade-in ${
                result.malicious
                  ? "bg-destructive/10 border-destructive/40"
                  : "bg-primary/10 border-primary/40"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                {result.malicious ? (
                  <ShieldAlert className="h-6 w-6 text-destructive" />
                ) : (
                  <ShieldCheck className="h-6 w-6 text-primary" />
                )}
                <span
                  className={`font-display text-2xl ${result.malicious ? "text-destructive" : "text-primary"}`}
                >
                  {result.message}
                </span>
              </div>
              <p className="font-mono text-xs text-muted-foreground break-all">→ {result.url}</p>
            </div>
          ) : (
            <div className="rounded-xl p-6 border border-dashed border-border/60 bg-muted/20">
              <p className="font-display text-xl text-foreground/80 italic mb-2">
                Awaiting target…
              </p>
              <p className="font-mono text-xs text-muted-foreground">
                Enter a URL above to initiate hybrid threat scan against the
                M7 intelligence database.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}