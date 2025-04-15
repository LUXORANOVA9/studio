import React from 'react';
import Dashboard from '../components/Dashboard';

const AdminDashboard: React.FC = () => {
    return (
        <Dashboard>
            <div className="bg-white p-4 rounded shadow">
                <h2>Admin Specific Content</h2>
                <p>Manage users, view analytics, etc.</p>
            </div>
        </Dashboard>
    );
};

export default AdminDashboard;
