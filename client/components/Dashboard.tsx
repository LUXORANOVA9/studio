'use client';

import React from 'react';
import { useAuth } from './AuthContext'; // Assuming you have an AuthContext

interface DashboardProps {
    children: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
    const { userRole } = useAuth();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">
                {userRole ? `${userRole.toUpperCase()} Dashboard` : 'Dashboard'}
            </h1>
            {children}
        </div>
    );
};

export default Dashboard;
