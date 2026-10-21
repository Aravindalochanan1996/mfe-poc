import React from "react";
import { colors } from "@d4/design-system";

export function RemoteFallback({ label }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        minHeight: 300,
        color: colors.textMuted,
        fontSize: 14,
      }}
    >
      Loading {label}…
    </div>
  );
}
