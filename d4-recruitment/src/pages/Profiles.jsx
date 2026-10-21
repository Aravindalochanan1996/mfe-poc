import React from 'react';
import { Card, Badge, colors } from '@d4/design-system';
import { profiles } from '../data/profiles';

export default function Profiles() {
  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Profiles</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
        }}
      >
        {profiles.map((profile) => (
          <Card key={profile.id} title={profile.name}>
            <p style={{ margin: '0 0 8px', color: colors.textMuted }}>{profile.role}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
              {profile.skills.map((skill) => (
                <Badge key={skill} variant="neutral">
                  {skill}
                </Badge>
              ))}
            </div>
            <Badge>{profile.status}</Badge>
          </Card>
        ))}
      </div>
    </div>
  );
}
