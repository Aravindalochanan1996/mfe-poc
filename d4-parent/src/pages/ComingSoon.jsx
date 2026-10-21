import React from "react";
import { Card } from "@d4/design-system";

export function ComingSoon({ label }) {
  return (
    <Card title={label}>
      <p style={{ margin: 0, color: "var(--color-text-muted)", fontSize: 14 }}>
        This section isn't part of the POC yet. Coming soon.
      </p>
    </Card>
  );
}
