import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, colors } from "@d4/design-system";
import { useAuth } from "@d4/auth";

const DEMO_ACCOUNTS = [
  { label: "Admin", username: "admin", password: "admin123" },
  { label: "Finance", username: "finance", password: "finance123" },
  { label: "Recruiter", username: "recruiter", password: "recruiter123" },
];

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: `1px solid ${colors.border}`,
  fontSize: 14,
  fontFamily: "inherit",
  boxSizing: "border-box",
};

const labelStyle = {
  display: "block",
  fontSize: 13,
  fontWeight: 600,
  color: colors.text,
  marginBottom: 6,
};

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const result = await login(username, password);
    if (!result.ok) {
      setError(result.error);
      setSubmitting(false);
      return;
    }
    // Always land on the dashboard after signing in, rather than resuming
    // whatever URL happened to be in the address bar (e.g. left over from a
    // previous user's session on the same tab, or a restricted deep link).
    navigate("/", { replace: true });
  }

  function fillDemo(account) {
    setUsername(account.username);
    setPassword(account.password);
    setError("");
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: colors.surfaceAlt,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div style={{ width: 360 }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: colors.text }}>D4 Insight</div>
          <div style={{ fontSize: 13, color: colors.textMuted }}>Sign in to continue</div>
        </div>
        <Card>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={labelStyle} htmlFor="login-username">
                Username
              </label>
              <input
                id="login-username"
                style={inputStyle}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
                autoComplete="username"
              />
            </div>
            <div>
              <label style={labelStyle} htmlFor="login-password">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                style={inputStyle}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
            {error ? <div style={{ fontSize: 13, color: colors.accent }}>{error}</div> : null}
            <Button type="submit" variant="primary" disabled={submitting}>
              {submitting ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        </Card>
        <div style={{ marginTop: 16, fontSize: 12, color: colors.textMuted, textAlign: "center" }}>
          Demo accounts (POC only) — click to fill:
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 8, flexWrap: "wrap" }}>
          {DEMO_ACCOUNTS.map((account) => (
            <button
              key={account.username}
              type="button"
              onClick={() => fillDemo(account)}
              style={{
                fontSize: 12,
                padding: "4px 10px",
                borderRadius: 999,
                border: `1px solid ${colors.border}`,
                background: colors.surface,
                color: colors.textMuted,
                cursor: "pointer",
              }}
            >
              {account.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
