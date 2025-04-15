import React, { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard';
import { generateResponse } from '@/ai/luxbot';
import { analyzeMarketSentiment } from '@/ai/sora';
import { useAuth } from '../components/AuthContext'; // Import useAuth hook
import { useRouter } from 'next/navigation';
import WhiteLabelDeployer from '@/components/WhiteLabelDeployer';

const SuperAdminDashboard: React.FC = () => {
    const [luxBotResponse, setLuxBotResponse] = useState<string>('');
    const [soraAnalysis, setSoraAnalysis] = useState<string>('');
    const { userRole, loading } = useAuth(); // Use the useAuth hook
    const router = useRouter();

    useEffect(() => {
        if (!loading && userRole !== 'superadmin') {
            router.push('/'); // Redirect if not authorized
        }
    }, [userRole, loading, router]);

    useEffect(() => {
        const fetchLuxBotResponse = async () => {
            const response = await generateResponse("Summarize key metrics for SuperAdmin.");
            setLuxBotResponse(response);
        };

        const fetchSoraAnalysis = async () => {
            const analysis = await analyzeMarketSentiment("Provide a market sentiment analysis for the next quarter.");
            setSoraAnalysis(analysis);
        };

        fetchLuxBotResponse();
        fetchSoraAnalysis();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Loading state
    }

    return (
        <Dashboard>
            <div className="bg-white p-4 rounded shadow">
                <h2>SuperAdmin Specific Content</h2>
                <p>Manage system settings, view global analytics, etc.</p>
            </div>
            <div className="bg-white p-4 rounded shadow mt-4">
                <h3>LUXBot Response:</h3>
                <p>{luxBotResponse || 'Loading LUXBot response...'}</p>
            </div>
            <div className="bg-white p-4 rounded shadow mt-4">
                <h3>SORA AI Analysis:</h3>
                <p>{soraAnalysis || 'Loading SORA AI analysis...'}</p>
            </div>
            <div className="bg-white p-4 rounded shadow mt-4">
                <WhiteLabelDeployer />
            </div>
        </Dashboard>
    );
};

export default SuperAdminDashboard;

    