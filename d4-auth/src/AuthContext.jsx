import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getAuthApiUrl } from "./config";

const STORAGE_KEY = "d4_auth_session"; // { token, user }

const AuthContext = createContext(null);

function readStoredSession() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, re-validate any stored token against the auth API rather than
  // trusting localStorage blindly — a token can expire or the server's
  // secret can rotate between visits, and we want that to show the login
  // screen again, not a stale "logged in" user with a dead session.
  useEffect(() => {
    let cancelled = false;

    async function checkStoredSession() {
      const stored = readStoredSession();
      if (!stored || !stored.token) {
        if (!cancelled) setLoading(false);
        return;
      }
      try {
        const response = await fetch(`${getAuthApiUrl()}/api/auth/me`, {
          headers: { Authorization: `Bearer ${stored.token}` },
        });
        if (!response.ok) throw new Error("session invalid");
        const user = await response.json();
        if (!cancelled) setSession({ token: stored.token, user });
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    checkStoredSession();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (username, password) => {
    try {
      const response = await fetch(`${getAuthApiUrl()}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        return { ok: false, error: body.detail || "Invalid username or password." };
      }
      const data = await response.json();
      setSession({ token: data.token, user: data.user });
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: data.token, user: data.user }));
      return { ok: true, user: data.user };
    } catch {
      return {
        ok: false,
        error: `Couldn't reach the auth service at ${getAuthApiUrl()}. Make sure it's running.`,
      };
    }
  }, []);

  const logout = useCallback(() => {
    setSession(null);
    window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({ user: session?.user ?? null, loading, login, logout }),
    [session, loading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth() must be used within an <AuthProvider>");
  }
  return ctx;
}
