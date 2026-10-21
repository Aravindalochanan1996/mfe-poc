import React, { useState } from 'react';
import { Card, Table, Button, colors } from '@d4/design-system';
import { reports } from '../data/reports';

// Read from runtime config (window.__D4_CONFIG__, injected via config.js —
// see d4-finance/public/config.js and d4-parent/public/config.js) so this
// same build can point at QA/UAT/prod's finance-api without a rebuild.
// Falls back to localhost only so standalone dev still works if config.js
// somehow didn't load.
const FINANCE_API_BASE =
  (typeof window !== 'undefined' && window.__D4_CONFIG__ && window.__D4_CONFIG__.FINANCE_API_URL) ||
  'http://localhost:8001';
const DEMO_RECIPIENT = 'cfo@example.com';

export default function Reports() {
  const [sendState, setSendState] = useState({}); // { [reportId]: 'sending' | 'sent' | 'error' }

  async function handleSend(reportId) {
    setSendState((prev) => ({ ...prev, [reportId]: 'sending' }));
    try {
      const response = await fetch(`${FINANCE_API_BASE}/api/reports/${reportId}/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipient_email: DEMO_RECIPIENT }),
      });
      if (!response.ok) {
        throw new Error(`API responded with ${response.status}`);
      }
      setSendState((prev) => ({ ...prev, [reportId]: 'sent' }));
    } catch (err) {
      setSendState((prev) => ({ ...prev, [reportId]: 'error' }));
    }
  }

  const columns = [
    { key: 'name', header: 'Report Name' },
    { key: 'date', header: 'Date' },
    { key: 'type', header: 'Type' },
    { key: 'status', header: 'Status' },
    {
      key: 'actions',
      header: 'Actions',
      render: (_value, row) => {
        const state = sendState[row.id];
        if (state === 'sent') {
          return <span style={{ fontSize: 13, color: '#12805c' }}>Sent to {DEMO_RECIPIENT}</span>;
        }
        if (state === 'error') {
          return (
            <span style={{ fontSize: 13, color: colors.accent }}>
              Failed — is finance-api running on :8001?
            </span>
          );
        }
        return (
          <Button variant="secondary" onClick={() => handleSend(row.id)} disabled={state === 'sending'}>
            {state === 'sending' ? 'Sending…' : 'Send Report'}
          </Button>
        );
      },
    },
  ];

  return (
    <Card title="Finance Reports">
      <Table columns={columns} rows={reports} rowKey="id" />
    </Card>
  );
}
