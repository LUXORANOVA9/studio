import React from 'react';
import Dashboard from '../components/Dashboard';

const AcademyPage: React.FC = () => {
    return (
        <Dashboard>
            <div className="bg-white p-4 rounded shadow">
                <h2>Welcome to LuxoraNova Academy</h2>
                <p>Learn and earn rewards by completing our courses!</p>
                {/* Add course listings, progress trackers, etc. here */}
            </div>
        </Dashboard>
    );
};

export default AcademyPage;
