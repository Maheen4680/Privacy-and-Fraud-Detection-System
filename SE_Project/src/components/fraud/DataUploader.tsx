import { useRef, useState } from "react";
import { UploadCloud, FileCheck2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function DataUploader() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (f: File | null | undefined) => {
    if (!f) return;
    setFileName(f.name);
    toast.success(`Loaded ${f.name}`, { description: "Dataset queued for scan." });
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-card/70 backdrop-blur p-6 shadow-[var(--shadow-card)] border border-border">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      <div className="mb-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">Batch · CSV</p>
        <h2 className="font-display text-2xl text-foreground mt-1">Upload <em>Center</em></h2>
      </div>

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
        className={`cursor-pointer rounded-xl border-2 border-dashed p-8 flex flex-col items-center justify-center text-center transition-all ${
          dragging
            ? "border-accent bg-accent/10 scale-[1.01]"
            : "border-border/60 hover:border-accent/60 hover:bg-accent/5"
        }`}
      >
        {fileName ? (
          <FileCheck2 className="h-10 w-10 text-accent mb-3" />
        ) : (
          <UploadCloud className="h-10 w-10 text-accent/70 mb-3" />
        )}
        <p className="font-display text-lg text-foreground">
          {fileName ?? "Drag and Drop CSV Data File"}
        </p>
        <p className="font-mono text-xs text-muted-foreground mt-2">
          {fileName ? "Ready to scan" : "or click to browse files"}
        </p>
        <p className="font-mono text-[10px] text-muted-foreground/60 mt-3 uppercase tracking-widest">
          .csv · max 25MB
        </p>
        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>

      {fileName && (
        <Button
          className="mt-4 w-full bg-[var(--gradient-accent)] text-accent-foreground hover:opacity-90 glow-violet h-11"
          onClick={() => toast.info("Batch scan started", { description: fileName })}
        >
          Upload & Scan
        </Button>
      )}
    </div>
  );
}