// Owned by the Recruitment team, exposed to the host shell via Module
// Federation (`recruitmentMfe/navConfig`) so the shell's single sidebar can
// render Recruitment's sub-menu without the host needing to hardcode
// Recruitment's route structure.
export default [
  { key: 'overview', label: 'Overview', path: '' },
  { key: 'opportunities', label: 'Opportunities', path: 'opportunities' },
  { key: 'profiles', label: 'Profiles', path: 'profiles' },
  { key: 'recruiters', label: 'Recruiters', path: 'recruiters' },
  { key: 'kpis', label: 'Team KPIs', path: 'kpis' },
  { key: 'pipeline', label: 'Pipeline', path: 'pipeline' },
  { key: 'sourcers', label: 'Sourcers', path: 'sourcers' },
  { key: 'jd-builder', label: 'JD Builder', path: 'jd-builder' },
  { key: 'reports', label: 'Reports', path: 'reports' },
  { key: 'settings', label: 'Settings', path: 'settings' },
];
