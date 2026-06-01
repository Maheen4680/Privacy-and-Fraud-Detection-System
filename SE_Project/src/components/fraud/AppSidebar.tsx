import { useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  ShieldCheck,
  LayoutDashboard,
  Gauge,
  Eye,
  FileText,
  AppWindow,
  Award,
  Search,
  UploadCloud,
  BarChart3,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { clearSession, type Role } from "@/lib/session";

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard };

const CONSUMER_NAV: NavItem[] = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/trust-score", label: "Trust Score", icon: Gauge },
  { to: "/privacy-analyzer", label: "Privacy Analyzer", icon: Eye },
  { to: "/terms-summarizer", label: "T&C Summarizer", icon: FileText },
  { to: "/extension", label: "Browser Extension", icon: AppWindow },
];

const BUSINESS_NAV: NavItem[] = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/fraud-detection", label: "Fraud Detection", icon: Search },
  { to: "/data-processing", label: "Data Cleaning", icon: UploadCloud },
  { to: "/loyalty", label: "Loyalty", icon: Award },
  { to: "/reporting", label: "Analytics", icon: BarChart3 },
];

export default function AppSidebar({ role, name }: { role: Role; name: string }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const items = role === "business" ? BUSINESS_NAV : CONSUMER_NAV;

  const handleLogout = () => {
    clearSession();
    navigate({ to: "/login" });
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
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setOpen(false)} />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-sidebar text-sidebar-foreground z-50 border-r border-sidebar-border transform transition-transform lg:transform-none flex flex-col ${
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
              <div className="font-display text-lg leading-none">
                M7 <em className="text-primary">Detector</em>
              </div>
              <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-sidebar-foreground/50 mt-1">
                Privacy · Fraud · OS
              </div>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="lg:hidden text-sidebar-foreground/70">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative px-5 py-4 border-b border-sidebar-border">
          <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-sidebar-foreground/40 mb-1">
            Signed in
          </div>
          <div className="font-display text-base text-sidebar-foreground truncate">{name}</div>
          <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
              {role}
            </span>
          </div>
        </div>

        <nav className="relative px-3 mt-4 space-y-1 flex-1 overflow-y-auto">
          <div className="px-3 mb-2 font-mono text-[9px] uppercase tracking-[0.25em] text-sidebar-foreground/40">
            Modules
          </div>
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = path === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground border border-primary/30"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 bg-primary rounded-r glow-cyan" />
                )}
                <Icon className="h-4 w-4" />
                <span className="flex-1 text-left">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="relative p-4 border-t border-sidebar-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}