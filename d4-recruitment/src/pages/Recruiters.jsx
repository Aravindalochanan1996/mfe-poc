import React from 'react';
import { Card, Table } from '@d4/design-system';
import { recruiters } from '../data/recruiters';

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'activeReqs', header: 'Active Reqs' },
  { key: 'placements', header: 'Placements This Month' },
];

export default function Recruiters() {
  return (
    <Card title="Recruiters">
      <Table columns={columns} rows={recruiters} rowKey="id" />
    </Card>
  );
}
