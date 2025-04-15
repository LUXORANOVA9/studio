import React from 'react';
import Dashboard from '../components/Dashboard';

const SuperAdminDashboard: React.FC = () => {
    return (
        <Dashboard>
            <div className="bg-white p-4 rounded shadow">
                <h2>SuperAdmin Specific Content</h2>
                <p>Manage system settings, view global analytics, etc.</p>
            </div>
        </Dashboard>
    );
};

export default SuperAdminDashboard;
