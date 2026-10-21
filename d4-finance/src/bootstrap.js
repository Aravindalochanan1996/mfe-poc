import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useNavigate, useLocation } from 'react-router-dom';
import { Sidebar, SidebarItem, colors } from '@d4/design-system';
import App from './App';
import navConfig from './navConfig';

// Only used when running this remote standalone (`npm start` here, port 3001)
// for local development. When federated into the host shell, the host
// provides the sidebar (from this same navConfig) and the logged-in user —
// this file and its fake user are never part of the composed product.
const STANDALONE_USER = {
  name: 'Standalone Dev',
  role: 'admin',
  permissions: ['finance:view', 'recruitment:view', 'recruitment:kpi:view_all'],
};

function StandaloneNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const activePath = location.pathname.replace(/^\/+/, '');

  return (
    <Sidebar>
      {navConfig.map((item) => (
        <SidebarItem
          key={item.key}
          label={item.label}
          active={activePath === item.path}
          onClick={() => navigate(`/${item.path}`)}
        />
      ))}
    </Sidebar>
  );
}

function StandaloneShell() {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div
        style={{
          width: 220,
          flexShrink: 0,
          borderRight: `1px solid ${colors.border}`,
          background: colors.surface,
        }}
      >
        <StandaloneNav />
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: 24, background: colors.surfaceAlt }}>
        <App user={STANDALONE_USER} />
      </div>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <StandaloneShell />
  </BrowserRouter>
);
