import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import PageHeader from "@/components/fraud/PageHeader";
import { Button } from "@/components/ui/button";
import { CUSTOMERS } from "@/data/customers";
import { Award, Send, Crown } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/loyalty")({
  component: Loyalty,
});

function Loyalty() {
  const top = [...CUSTOMERS]
    .filter((c) => c.trustScore >= 75)
    .sort((a, b) => b.trustScore - a.trustScore);
  const [sent, setSent] = useState<Record<string, boolean>>({});

  const sendPromo = (id: string, name: string) => {
    setSent((s) => ({ ...s, [id]: true }));
    toast.success("Promo sent", { description: `Loyalty offer dispatched to ${name}.` });
  };

  const sendAll = () => {
    const next: Record<string, boolean> = {};
    top.forEach((c) => (next[c.id] = true));
    setSent(next);
    toast.success("Bulk promo sent", { description: `${top.length} top customers notified.` });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <PageHeader
        title={<>Reward your <em>top</em> customers.</>}
        description="High-trust customers pulled live from the fraud-detection ledger (score ≥ 75)."
      />

      <div className="flex items-center justify-between rounded-2xl bg-card/70 backdrop-blur p-5 border border-border">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-[var(--gradient-accent)] flex items-center justify-center text-accent-foreground glow-violet">
            <Crown className="h-5 w-5" />
          </div>
          <div>
            <div className="font-display text-2xl text-foreground leading-none">{top.length} eligible</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">
              High-score customers
            </div>
          </div>
        </div>
        <Button onClick={sendAll} className="h-11 bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan">
          <Send className="h-4 w-4 mr-2" />
          Send Promo to All
        </Button>
      </div>

      <div className="rounded-2xl bg-card/80 backdrop-blur border border-border shadow-[var(--shadow-card)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground bg-muted/30">
                <th className="px-5 py-3">Customer</th>
                <th className="px-5 py-3">Account Age</th>
                <th className="px-5 py-3">Trust Score</th>
                <th className="px-5 py-3">Tier</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {top.map((c) => {
                const tier =
                  c.trustScore >= 90 ? "Platinum" : c.trustScore >= 80 ? "Gold" : "Silver";
                return (
                  <tr key={c.id} className="border-t border-border hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3">
                      <div className="font-display text-base text-foreground leading-none">{c.name}</div>
                      <div className="font-mono text-[10px] text-muted-foreground mt-1">{c.email}</div>
                    </td>
                    <td className="px-5 py-3 font-mono text-xs text-foreground">{c.accountAgeDays} days</td>
                    <td className="px-5 py-3 font-display text-lg text-foreground">{c.trustScore}</td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest">
                        <Award className="h-3 w-3" />
                        {tier}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Button
                        size="sm"
                        disabled={sent[c.id]}
                        onClick={() => sendPromo(c.id, c.name)}
                        className="bg-[var(--gradient-accent)] text-accent-foreground hover:opacity-90 disabled:opacity-50"
                      >
                        <Send className="h-3.5 w-3.5 mr-1.5" />
                        {sent[c.id] ? "Sent" : "Send Promo"}
                      </Button>
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