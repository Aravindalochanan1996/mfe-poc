import React from 'react';
import { Card, colors } from '@d4/design-system';
import { pipelineStages } from '../data/pipeline';

export default function Pipeline() {
  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Pipeline</h2>
      <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8 }}>
        {pipelineStages.map((stage) => (
          <div key={stage.stage} style={{ minWidth: 220, flexShrink: 0 }}>
            <div
              style={{
                fontWeight: 600,
                color: colors.text,
                marginBottom: 10,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>{stage.stage}</span>
              <span
                style={{
                  background: colors.surfaceAlt,
                  color: colors.textMuted,
                  borderRadius: 12,
                  padding: '2px 8px',
                  fontSize: 12,
                }}
              >
                {stage.candidates.length}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {stage.candidates.map((candidate) => (
                <Card key={candidate.name}>
                  <div style={{ fontWeight: 600 }}>{candidate.name}</div>
                  <div style={{ color: colors.textMuted, fontSize: 13 }}>{candidate.role}</div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
