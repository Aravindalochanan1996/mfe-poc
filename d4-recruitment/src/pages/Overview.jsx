import React from 'react';
import { StatCard } from '@d4/design-system';
import { overviewStats } from '../data/overview';

export default function Overview() {
  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Overview</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 16,
        }}
      >
        {overviewStats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} trend={stat.trend} />
        ))}
      </div>
    </div>
  );
}
