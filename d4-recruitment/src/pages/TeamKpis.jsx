import React from 'react';
import { StatCard, Card, colors, Badge } from '@d4/design-system';
import { recruiters as allRecruiters } from '../data/recruiters';
import { useCurrentUser, can, KPI_VIEW_ALL } from '../UserContext';

export default function TeamKpis() {
  const user = useCurrentUser();
  const canViewAll = can(user, KPI_VIEW_ALL);

  // Managers/admins see every recruiter's numbers; an individual recruiter
  // only sees their own row (matched by name against the logged-in user —
  // a real system would key this off a stable user id, not a display name).
  const recruiters = canViewAll
    ? allRecruiters
    : allRecruiters.filter((r) => r.name === user?.name);

  const totalPlacements = recruiters.reduce((sum, r) => sum + r.placements, 0);
  const totalActiveReqs = recruiters.reduce((sum, r) => sum + r.activeReqs, 0);
  const avgPlacements = recruiters.length ? (totalPlacements / recruiters.length).toFixed(1) : '0';
  const topRecruiter = recruiters.length
    ? recruiters.reduce((top, r) => (r.placements > top.placements ? r : top), recruiters[0])
    : null;

  const maxPlacements = Math.max(1, ...recruiters.map((r) => r.placements));

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
        <h2 style={{ margin: 0 }}>Team KPIs</h2>
        <Badge variant={canViewAll ? 'info' : 'neutral'}>
          {canViewAll ? 'All recruiters' : 'My KPIs only'}
        </Badge>
      </div>
      <p style={{ marginTop: 4, marginBottom: 20, color: colors.textMuted, fontSize: 13 }}>
        {canViewAll
          ? 'You can view KPIs for the whole team.'
          : "You can view your own KPIs. Ask a manager for team-wide visibility."}
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 16,
          marginBottom: 20,
        }}
      >
        <StatCard label="Total Placements" value={String(totalPlacements)} />
        <StatCard label="Total Active Reqs" value={String(totalActiveReqs)} />
        <StatCard label="Avg Placements / Recruiter" value={avgPlacements} />
        <StatCard label={canViewAll ? 'Top Recruiter' : 'You'} value={topRecruiter ? topRecruiter.name : '—'} />
      </div>
      <Card title="Placements by Recruiter">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {recruiters.map((r) => (
            <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 120, flexShrink: 0 }}>{r.name}</span>
              <div style={{ flex: 1, background: colors.surfaceAlt, borderRadius: 4, overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${(r.placements / maxPlacements) * 100}%`,
                    background: colors.primary,
                    height: 14,
                    borderRadius: 4,
                  }}
                />
              </div>
              <span style={{ width: 24, textAlign: 'right' }}>{r.placements}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
