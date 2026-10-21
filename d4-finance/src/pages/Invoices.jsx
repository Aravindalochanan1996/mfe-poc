import React from 'react';
import { Card, Table, Badge } from '@d4/design-system';
import { invoices } from '../data/invoices';

const columns = [
  { key: 'id', header: 'Invoice #' },
  { key: 'client', header: 'Client' },
  { key: 'amount', header: 'Amount' },
  { key: 'status', header: 'Status', render: (value) => <Badge>{value}</Badge> },
  { key: 'dueDate', header: 'Due Date' },
];

export default function Invoices() {
  return (
    <Card title="Invoices">
      <Table columns={columns} rows={invoices} rowKey="id" />
    </Card>
  );
}
