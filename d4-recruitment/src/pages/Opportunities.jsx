import React from 'react';
import { Card, Table, Badge } from '@d4/design-system';
import { opportunities } from '../data/opportunities';

const columns = [
  { key: 'title', header: 'Title' },
  { key: 'client', header: 'Client' },
  { key: 'status', header: 'Status', render: (value) => <Badge>{value}</Badge> },
  { key: 'candidates', header: 'Candidates' },
];

export default function Opportunities() {
  return (
    <Card title="Opportunities">
      <Table columns={columns} rows={opportunities} rowKey="id" />
    </Card>
  );
}
