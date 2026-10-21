import React, { useState } from 'react';
import { Card, Button } from '@d4/design-system';

export default function Settings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    newCandidateAlerts: true,
    weeklyDigest: false,
    showSampleCandidates: true,
    showSampleReports: false,
  });

  const toggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    console.log('Settings saved', settings);
  };

  const checkboxRow = (key, label) => (
    <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, cursor: 'pointer' }}>
      <input type="checkbox" checked={settings[key]} onChange={() => toggle(key)} />
      {label}
    </label>
  );

  return (
    <div style={{ maxWidth: 480 }}>
      <h2 style={{ marginTop: 0 }}>Settings</h2>
      <Card title="Notifications">
        {checkboxRow('emailNotifications', 'Email notifications')}
        {checkboxRow('newCandidateAlerts', 'New candidate alerts')}
        {checkboxRow('weeklyDigest', 'Weekly digest')}
      </Card>
      <div style={{ height: 16 }} />
      <Card title="Sample Data">
        {checkboxRow('showSampleCandidates', 'Show sample candidates')}
        {checkboxRow('showSampleReports', 'Show sample reports')}
      </Card>
      <div style={{ height: 16 }} />
      <Button variant="primary" onClick={handleSave}>
        Save Settings
      </Button>
    </div>
  );
}
