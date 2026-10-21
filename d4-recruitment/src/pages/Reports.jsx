import React, { useState } from 'react';
import { Card, Table, Badge, Button } from '@d4/design-system';
import { existingReports, aiReports } from '../data/reports';

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'date', header: 'Date' },
  { key: 'type', header: 'Type' },
  { key: 'status', header: 'Status', render: (value) => <Badge>{value}</Badge> },
];

export default function Reports() {
  const [tab, setTab] = useState('existing');

  const rows = tab === 'existing' ? existingReports : aiReports;
  const title = tab === 'existing' ? 'Existing Reports' : 'AI Reports';

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Reports</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <Button variant={tab === 'existing' ? 'primary' : 'ghost'} onClick={() => setTab('existing')}>
          Existing
        </Button>
        <Button variant={tab === 'ai' ? 'primary' : 'ghost'} onClick={() => setTab('ai')}>
          AI
        </Button>
      </div>
      <Card title={title}>
        <Table columns={columns} rows={rows} rowKey="id" />
      </Card>
    </div>
  );
}
