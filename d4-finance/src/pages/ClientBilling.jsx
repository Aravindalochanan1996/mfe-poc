import React from 'react';
import { Card, Table, Badge } from '@d4/design-system';
import { billingRecords } from '../data/billing';

const columns = [
  { key: 'client', header: 'Client' },
  { key: 'period', header: 'Period' },
  { key: 'amount', header: 'Amount' },
  { key: 'status', header: 'Status', render: (value) => <Badge>{value}</Badge> },
];

export default function ClientBilling() {
  return (
    <Card title="Client Billing">
      <Table columns={columns} rows={billingRecords} rowKey="id" />
    </Card>
  );
}
