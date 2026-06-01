import { useState } from "react";
import {
  ShieldCheck,
  LayoutDashboard,
  UploadCloud,
  Search,
  Award,
  Settings as SettingsIcon,
  Menu,
  X,
} from "lucide-react";
import { toast } from "sonner";

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, active: true },
  { id: "upload", label: "Upload Center", icon: UploadCloud, active: true },
  { id: "fraud", label: "Fraud Engine", icon: Search, active: true },
  { id: "loyalty", label: "Loyalty Rewards", icon: Award, active: false },
  { id: "settings", label: "Settings", icon: SettingsIcon, active: true },
];

export default function Sidebar() {
  const [active, setActive] = useState("dashboard");
  const [open, setOpen] = useState(false);

  const handleClick = (item: (typeof NAV)[number]) => {
    setActive(item.id);
    setOpen(false);
    if (!item.active) {
      toast.info("Feature coming soon", { description: `${item.label} is on the roadmap.` });
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 h-10 w-10 rounded-lg bg-sidebar text-sidebar-foreground flex items-center justify-center shadow-lg"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-sidebar text-sidebar-foreground z-50 border-r border-sidebar-border transform transition-transform lg:transform-none ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />
        <div className="relative p-5 flex items-center justify-between border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[var(--gradient-primary)] flex items-center justify-center text-primary-foreground glow-cyan">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="font-display text-lg leading-none">M7 <em className="text-primary">Detector</em></div>
              <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-sidebar-foreground/50 mt-1">
                Trust · Fraud · OS
              </div>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden text-sidebar-foreground/70"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="relative px-3 mt-5 space-y-1">
          <div className="px-3 mb-2 font-mono text-[9px] uppercase tracking-[0.25em] text-sidebar-foreground/40">Navigation</div>
          {NAV.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleClick(item)}
                className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground border border-primary/30"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                }`}
              >
                {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 bg-primary rounded-r glow-cyan" />}
                <Icon className="h-4 w-4" />
                <span className="flex-1 text-left">{item.label}</span>
                {!item.active && (
                  <span className="font-mono text-[9px] uppercase tracking-widest bg-accent/15 text-accent px-1.5 py-0.5 rounded">
                    Soon
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-5 left-5 right-5 rounded-xl bg-sidebar-accent/60 border border-sidebar-border p-4 backdrop-blur">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse-ring" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">System Active</span>
          </div>
          <p className="font-display text-sm text-sidebar-foreground/80 italic">
            Real-time protection enabled.
          </p>
        </div>
      </aside>
    </>
  );
}