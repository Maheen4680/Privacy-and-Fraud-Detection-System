import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import PageHeader from "@/components/fraud/PageHeader";
import { Button } from "@/components/ui/button";
import { UploadCloud, FileCheck2, CheckCircle2, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/data-processing")({
  component: DataProcessing,
});

const SAMPLE_CSV = `id,name,email,amount
1001,Ada Lovelace,ada@enigma.io,120
1002,Grace Hopper,grace@cobol.dev,85
1003,Linus Torvalds,linus@kernel.org,40
1001,Ada Lovelace,ada@enigma.io,120
1004,Margaret Hamilton,mh@apollo.space,200
1005,Anonymous User,user_8821@mail.ru,9
1002,Grace Hopper,grace@cobol.dev,85
1006,John Doe,jdoe1939@temp.email,15
1007,Alan Turing,turing@bletchley.uk,300
1003,Linus Torvalds,linus@kernel.org,40
1008,Rapid Buyer,buy.fast@quickmail.cc,12
1009,Katherine Johnson,kj@nasa.gov,250
1010,Hedy Lamarr,hedy@spread.fm,60
1005,Anonymous User,user_8821@mail.ru,9
1011,Dennis Ritchie,dmr@bell-labs.com,180`;

type Row = Record<string, string>;

function parseCsv(text: string): { headers: string[]; rows: Row[] } {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (lines.length === 0) return { headers: [], rows: [] };
  const headers = lines[0].split(",").map((h) => h.trim());
  const rows = lines.slice(1).map((line) => {
    const cells = line.split(",").map((c) => c.trim());
    const r: Row = {};
    headers.forEach((h, i) => (r[h] = cells[i] ?? ""));
    return r;
  });
  return { headers, rows };
}

function dedupe(rows: Row[]): Row[] {
  const seen = new Set<string>();
  const out: Row[] = [];
  for (const r of rows) {
    const key = JSON.stringify(r);
    if (!seen.has(key)) {
      seen.add(key);
      out.push(r);
    }
  }
  return out;
}

function DataProcessing() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [rawText, setRawText] = useState<string | null>(null);
  const [parsed, setParsed] = useState<{ headers: string[]; rows: Row[]; clean: Row[] } | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleFile = (f: File | null | undefined) => {
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      setFileName(f.name);
      setRawText(String(reader.result ?? ""));
      setParsed(null);
      toast.success(`Loaded ${f.name}`);
    };
    reader.readAsText(f);
  };

  const loadSample = () => {
    setFileName("sample_15_rows.csv");
    setRawText(SAMPLE_CSV);
    setParsed(null);
    toast.success("Loaded sample CSV", { description: "15 rows with intentional duplicates." });
  };

  const process = () => {
    if (!rawText) return;
    setProcessing(true);
    setTimeout(() => {
      const { headers, rows } = parseCsv(rawText);
      const clean = dedupe(rows);
      setParsed({ headers, rows, clean });
      setProcessing(false);
      toast.success("Cleaning complete", {
        description: `${rows.length - clean.length} duplicates removed.`,
      });
    }, 500);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title={<>Upload customer account data</>}
        description="Upload a CSV. The pipeline parses every row, removes duplicates, and shows the unique entries."
      />

      <div className="rounded-2xl bg-card/80 backdrop-blur p-6 lg:p-8 border border-border shadow-[var(--shadow-card)]">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            handleFile(e.dataTransfer.files?.[0]);
          }}
          onClick={() => inputRef.current?.click()}
          className={`cursor-pointer rounded-xl border-2 border-dashed p-12 flex flex-col items-center justify-center text-center transition-all ${
            dragging
              ? "border-accent bg-accent/10"
              : "border-border/60 hover:border-accent/60 hover:bg-accent/5"
          }`}
        >
          {fileName ? (
            <FileCheck2 className="h-12 w-12 text-accent mb-3" />
          ) : (
            <UploadCloud className="h-12 w-12 text-accent/70 mb-3" />
          )}
          <p className="font-display text-2xl text-foreground">
            {fileName ?? "Drop CSV file"}
          </p>
          <p className="font-mono text-xs text-muted-foreground mt-2">
            {fileName ? "Ready for cleaning" : "or click to browse"}
          </p>
          <p className="font-mono text-[10px] text-muted-foreground/60 mt-3 uppercase tracking-widest">
            .csv · max 25MB
          </p>
          <input
            ref={inputRef}
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button
            onClick={process}
            disabled={!rawText || processing}
            className="flex-1 h-12 bg-[var(--gradient-accent)] text-accent-foreground hover:opacity-90 glow-violet disabled:opacity-40"
          >
            {processing ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Trash2 className="h-4 w-4 mr-2" />}
            {processing ? "Cleaning…" : "Parse & Remove Duplicates"}
          </Button>
          <Button
            variant="outline"
            onClick={loadSample}
            className="h-12 border-border text-foreground hover:bg-muted/40"
          >
            Load Sample CSV
          </Button>
        </div>
      </div>

      {parsed && (
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <Stat label="Rows In" value={parsed.rows.length} tone="primary" />
            <Stat label="Duplicates Removed" value={parsed.rows.length - parsed.clean.length} tone="destructive" />
            <Stat label="Unique Entries" value={parsed.clean.length} tone="accent" />
          </div>

          <div className="rounded-2xl bg-card/80 backdrop-blur border border-border shadow-[var(--shadow-card)] overflow-hidden">
            <div className="p-5 border-b border-border flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-success">
                Cleaned dataset · {parsed.clean.length} unique rows
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground bg-muted/30">
                    {parsed.headers.map((h) => (
                      <th key={h} className="px-5 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {parsed.clean.map((row, i) => (
                    <tr key={i} className="border-t border-border hover:bg-muted/20 transition-colors">
                      {parsed.headers.map((h) => (
                        <td key={h} className="px-5 py-3 font-mono text-xs text-foreground">{row[h]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: number; tone: "primary" | "accent" | "destructive" }) {
  const cls = { primary: "text-primary", accent: "text-accent", destructive: "text-destructive" }[tone];
  return (
    <div className="rounded-2xl bg-card/70 backdrop-blur p-5 border border-border shadow-[var(--shadow-card)]">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">{label}</div>
      <div className={`font-display text-5xl leading-none ${cls}`}>{value}</div>
    </div>
  );
}