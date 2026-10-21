import React from "react";
import { colors, Badge, Button } from "@d4/design-system";

function initialsOf(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function TopBar({ user, onLogout }) {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 24px",
        borderBottom: `1px solid ${colors.border}`,
        background: colors.surface,
      }}
    >
      <span style={{ fontSize: 16, fontWeight: 700, color: colors.text }}>
        D4 Insight
      </span>
      {user ? (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Badge variant="info">{user.role}</Badge>
          <span style={{ fontSize: 14, color: colors.textMuted }}>{user.name}</span>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: colors.primary,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {initialsOf(user.name)}
          </div>
          <Button variant="ghost" onClick={onLogout}>
            Logout
          </Button>
        </div>
      ) : null}
    </header>
  );
}
