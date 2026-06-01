import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import AppSidebar from "@/components/fraud/AppSidebar";
import { useSession } from "@/lib/session";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  const { session, ready } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (ready && !session) navigate({ to: "/login" });
  }, [ready, session, navigate]);

  if (!ready || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          initializing…
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background relative">
      <div className="pointer-events-none fixed inset-0 bg-cyber-grid opacity-40" />
      <div className="pointer-events-none fixed -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none fixed top-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />

      <AppSidebar role={session.role} name={session.name} />

      <div className="flex-1 min-w-0 relative">
        <main className="px-6 lg:px-10 py-8 pl-20 lg:pl-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}