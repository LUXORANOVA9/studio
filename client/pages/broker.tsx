import React from 'react';
import Dashboard from '../components/Dashboard';

const BrokerDashboard: React.FC = () => {
    return (
        <Dashboard>
            <div className="bg-white p-4 rounded shadow">
                <h2>Broker Specific Content</h2>
                <p>View client portfolios, manage referrals, etc.</p>
            </div>
        </Dashboard>
    );
};

export default BrokerDashboard;
