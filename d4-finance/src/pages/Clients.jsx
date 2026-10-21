import React from 'react';
import { Card, colors } from '@d4/design-system';
import { clients } from '../data/clients';

export default function Clients() {
  return (
    <div>
      <h2 style={{ marginTop: 0, color: colors.text }}>Clients</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 16,
        }}
      >
        {clients.map((client) => (
          <Card key={client.id} title={client.name}>
            <p style={{ margin: '0 0 8px 0', color: colors.textMuted, fontSize: 14 }}>
              {client.contact}
            </p>
            <p style={{ margin: 0, fontSize: 14 }}>
              Active contracts: <strong>{client.activeContracts}</strong>
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
