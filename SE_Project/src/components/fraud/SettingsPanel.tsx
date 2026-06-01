import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

export default function SettingsPanel() {
  const [realTime, setRealTime] = useState(true);
  const [aiFilter, setAiFilter] = useState(true);
  const [autoBlock, setAutoBlock] = useState(false);
  const [sensitivity, setSensitivity] = useState([45]);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-card/70 backdrop-blur p-6 lg:p-8 shadow-[var(--shadow-card)] border border-border">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="mb-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">Configuration</p>
        <h2 className="font-display text-3xl text-foreground mt-1">Detection <em>Settings</em></h2>
      </div>

      <div className="rounded-xl bg-muted/30 border border-border/60 p-5 mb-6">
        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Risk Threshold</div>
            <div className="font-display text-xl text-foreground mt-1">Sensitivity</div>
          </div>
          <div className="font-display text-4xl text-primary leading-none">{sensitivity[0]}<span className="text-base text-muted-foreground ml-1">%</span></div>
        </div>
        <Slider value={sensitivity} onValueChange={setSensitivity} max={100} step={1} />
        <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70 mt-3">
          <span>Low Sensitivity</span>
          <span>High Sensitivity</span>
        </div>
      </div>

      <div className="space-y-1">
        <Row
          title="Real-Time Monitoring"
          desc="Continuously inspect outgoing traffic"
          checked={realTime}
          onChange={setRealTime}
        />
        <Row
          title="AI Transaction Filtering"
          desc="Use machine learning to detect suspicious patterns"
          checked={aiFilter}
          onChange={setAiFilter}
        />
        <Row
          title="Auto-block High Risk"
          desc="Immediately block sites scoring above threshold"
          checked={autoBlock}
          onChange={setAutoBlock}
        />
      </div>
    </div>
  );
}

function Row({
  title,
  desc,
  checked,
  onChange,
}: {
  title: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div>
        <div className="text-sm font-medium text-foreground">{title}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}