import { useEffect, useState } from "react";

export type Role = "consumer" | "business";
export type Session = { name: string; role: Role };

const KEY = "m7.session";

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function setSession(s: Session) {
  localStorage.setItem(KEY, JSON.stringify(s));
  window.dispatchEvent(new Event("m7:session"));
}

export function clearSession() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("m7:session"));
}

export function useSession() {
  const [session, setLocal] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setLocal(getSession());
    setReady(true);
    const handler = () => setLocal(getSession());
    window.addEventListener("m7:session", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("m7:session", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
  return { session, ready };
}