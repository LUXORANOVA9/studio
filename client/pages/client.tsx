import React from 'react';
import Dashboard from '../components/Dashboard';

const ClientDashboard: React.FC = () => {
    return (
        <Dashboard>
            <div className="bg-white p-4 rounded shadow">
                <h2>Client Specific Content</h2>
                <p>View your portfolio, AI insights, etc.</p>
            </div>
        </Dashboard>
    );
};

export default ClientDashboard;
