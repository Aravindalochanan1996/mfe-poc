import React from 'react';
import { StatCard, Card, colors } from '@d4/design-system';
import { stats, revenueTrend } from '../data/dashboard';

export default function Dashboard() {
  const maxValue = Math.max(...revenueTrend.map((m) => m.value));

  return (
    <div>
      <h2 style={{ marginTop: 0, color: colors.text }}>Finance Dashboard</h2>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 16,
          marginBottom: 20,
        }}
      >
        {stats.map((stat) => (
          <div key={stat.label} style={{ flex: '1 1 200px', minWidth: 200 }}>
            <StatCard label={stat.label} value={stat.value} trend={stat.trend} />
          </div>
        ))}
      </div>

      <Card title="Revenue Trend">
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 16,
            height: 180,
            padding: '8px 4px 0',
          }}
        >
          {revenueTrend.map((entry) => (
            <div
              key={entry.month}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                height: '100%',
                justifyContent: 'flex-end',
              }}
            >
              <div
                title={`$${entry.value.toLocaleString()}`}
                style={{
                  width: '60%',
                  minWidth: 24,
                  height: `${(entry.value / maxValue) * 100}%`,
                  background: colors.primary,
                  borderRadius: '4px 4px 0 0',
                }}
              />
              <span style={{ fontSize: 12, color: colors.textMuted }}>{entry.month}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
