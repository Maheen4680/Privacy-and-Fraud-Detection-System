import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShieldCheck, ArrowRight, User, Briefcase, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSession, setSession, type Role } from "@/lib/session";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "Sign in · M7 Detector" }],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState("abc");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("consumer");

  useEffect(() => {
    if (getSession()) navigate({ to: "/dashboard" });
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter your username");
      return;
    }
    if (!password) {
      toast.error("Please enter your password");
      return;
    }
    setSession({ name: name.trim(), role });
    toast.success(`Welcome, ${name.trim()}`, { description: `Signed in as ${role}.` });
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden px-4">
      <div className="pointer-events-none absolute inset-0 bg-cyber-grid opacity-50" />
      <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-accent/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/15 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <div className="h-14 w-14 rounded-2xl bg-[var(--gradient-primary)] flex items-center justify-center text-primary-foreground glow-cyan">
            <ShieldCheck className="h-7 w-7" />
          </div>
        </div>
        <div className="text-center mb-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-2">
            Privacy · Fraud · OS
          </p>
          <h1 className="font-display text-5xl text-foreground leading-tight">
            Enter the <em className="text-primary">Detector</em>
          </h1>
          <p className="font-sans text-sm text-muted-foreground mt-3">
            Choose your role to access the modules built for you.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-card/80 backdrop-blur p-7 border border-border shadow-[var(--shadow-elevated)] space-y-6"
        >
          <div>
            <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2 block">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ada.lovelace"
                className="h-12 pl-10 font-sans bg-muted/40 border-border focus-visible:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2 block">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-12 pl-10 font-sans bg-muted/40 border-border focus-visible:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3 block">
              Role
            </label>
            <div className="grid grid-cols-2 gap-3">
              {(
                [
                  { id: "consumer" as Role, label: "Consumer", icon: User, hint: "Personal trust tools" },
                  { id: "business" as Role, label: "Business", icon: Briefcase, hint: "Threat ops dashboard" },
                ]
              ).map((opt) => {
                const Icon = opt.icon;
                const active = role === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setRole(opt.id)}
                    className={`relative text-left rounded-xl border p-4 transition-all ${
                      active
                        ? "border-primary bg-primary/10 glow-cyan"
                        : "border-border bg-muted/20 hover:border-primary/40"
                    }`}
                  >
                    <Icon className={`h-5 w-5 mb-2 ${active ? "text-primary" : "text-muted-foreground"}`} />
                    <div className="font-display text-lg text-foreground">{opt.label}</div>
                    <div className="font-mono text-[10px] text-muted-foreground/70 mt-0.5">
                      {opt.hint}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan font-medium tracking-wide"
          >
            Continue
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </form>
      </div>
    </div>
  );
}