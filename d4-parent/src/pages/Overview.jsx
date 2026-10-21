import React from "react";
import { Card, StatCard } from "@d4/design-system";

const STATS = [
  { label: "Total Headcount", value: "312", trend: "+4%" },
  { label: "Open Roles", value: "27", trend: "+9%" },
  { label: "Revenue MTD", value: "$482,300", trend: "+6%" },
  { label: "Active Clients", value: "18", trend: "+2%" },
];

export function Overview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
        }}
      >
        {STATS.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
      <Card title="Welcome to D4 Insight">
        <p style={{ margin: 0, color: "var(--color-text-muted)", fontSize: 14, lineHeight: 1.6 }}>
          This is the shell application. Use the sidebar to jump into Finance
          or Recruitment — each section is an independently deployed
          micro-frontend loaded at runtime via Webpack Module Federation.
        </p>
      </Card>
    </div>
  );
}
