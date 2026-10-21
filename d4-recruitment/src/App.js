import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserContext } from './UserContext';

import Overview from './pages/Overview';
import Opportunities from './pages/Opportunities';
import Profiles from './pages/Profiles';
import Recruiters from './pages/Recruiters';
import TeamKpis from './pages/TeamKpis';
import Pipeline from './pages/Pipeline';
import Sourcers from './pages/Sourcers';
import JdBuilder from './pages/JdBuilder';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

// The host shell owns the single sidebar (built from ./navConfig); this
// component only renders whichever Recruitment page is routed to, at
// whatever base path the shell mounts it under (e.g. /recruitment/*).
export default function App({ user }) {
  return (
    <UserContext.Provider value={user}>
      <Routes>
        <Route index element={<Overview />} />
        <Route path="opportunities" element={<Opportunities />} />
        <Route path="profiles" element={<Profiles />} />
        <Route path="recruiters" element={<Recruiters />} />
        <Route path="kpis" element={<TeamKpis />} />
        <Route path="pipeline" element={<Pipeline />} />
        <Route path="sourcers" element={<Sourcers />} />
        <Route path="jd-builder" element={<JdBuilder />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </UserContext.Provider>
  );
}
