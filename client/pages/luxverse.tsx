'use client';

import React from 'react';
import Dashboard from '../components/Dashboard';
import LuxVerseDashboard from '@/components/luxverse/LuxVerseDashboard';

const LuxVersePage: React.FC = () => {
  return (
    <Dashboard>
      <div>
        <h1>Welcome to the LuxVerse</h1>
        <LuxVerseDashboard />
      </div>
    </Dashboard>
  );
};

export default LuxVersePage;
