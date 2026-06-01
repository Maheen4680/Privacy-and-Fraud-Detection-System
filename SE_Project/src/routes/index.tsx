import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useSession } from "@/lib/session";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "M7 Privacy & Fraud Detection System" },
      { name: "description", content: "Privacy-first fraud detection for consumers and businesses." },
    ],
  }),
  component: Index,
});

function Index() {
  const { session, ready } = useSession();
  const navigate = useNavigate();
  useEffect(() => {
    if (!ready) return;
    navigate({ to: session ? "/dashboard" : "/login" });
  }, [ready, session, navigate]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
        routing…
      </div>
    </div>
  );
}
