import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserContext } from './UserContext';

import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Invoices from './pages/Invoices';
import ClientBilling from './pages/ClientBilling';
import Clients from './pages/Clients';
import BenchAnalysis from './pages/BenchAnalysis';

// The host shell owns the single sidebar (built from ./navConfig); this
// component only renders whichever Finance page is routed to, at whatever
// base path the shell mounts it under (e.g. /finance/*).
export default function App({ user }) {
  return (
    <UserContext.Provider value={user}>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="reports" element={<Reports />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="billing" element={<ClientBilling />} />
        <Route path="clients" element={<Clients />} />
        <Route path="bench" element={<BenchAnalysis />} />
      </Routes>
    </UserContext.Provider>
  );
}
