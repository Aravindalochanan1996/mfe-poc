import React from 'react';
import { Card, Table, Badge } from '@d4/design-system';
import { benchEmployees } from '../data/bench';

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'daysOnBench', header: 'Days on Bench' },
  { key: 'skill', header: 'Skill' },
  { key: 'availability', header: 'Availability', render: (value) => <Badge>{value}</Badge> },
];

export default function BenchAnalysis() {
  return (
    <Card title="Bench Analysis">
      <Table columns={columns} rows={benchEmployees} rowKey="id" />
    </Card>
  );
}
