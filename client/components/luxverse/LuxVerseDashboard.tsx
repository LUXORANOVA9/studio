'use client';

import React from 'react';
import { useAuth } from '../AuthContext';
import SuperAdminLuxVerse from './SuperAdminLuxVerse';
import AdminLuxVerse from './AdminLuxVerse';
import BrokerLuxVerse from './BrokerLuxVerse';
import ClientLuxVerse from './ClientLuxVerse';

const LuxVerseDashboard: React.FC = () => {
  const { userRole } = useAuth();

  return (
    <div>
      {userRole === 'superadmin' && <SuperAdminLuxVerse />}
      {userRole === 'admin' && <AdminLuxVerse />}
      {userRole === 'broker' && <BrokerLuxVerse />}
      {userRole === 'client' && <ClientLuxVerse />}
      {!userRole && <div>Please log in to access the LuxVerse.</div>}
    </div>
  );
};

export default LuxVerseDashboard;
