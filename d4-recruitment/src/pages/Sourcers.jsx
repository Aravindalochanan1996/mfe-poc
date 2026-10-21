import React from 'react';
import { Card, Table } from '@d4/design-system';
import { sourcers } from '../data/sourcers';

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'sourced', header: 'Candidates Sourced' },
];

export default function Sourcers() {
  return (
    <Card title="Sourcers">
      <Table columns={columns} rows={sourcers} rowKey="id" />
    </Card>
  );
}
