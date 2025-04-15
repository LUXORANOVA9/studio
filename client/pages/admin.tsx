
import React, { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard';
import { generateResponse } from '@/ai/luxbot';
import { analyzeMarketSentiment } from '@/ai/sora';

const AdminDashboard: React.FC = () => {
    const [luxBotResponse, setLuxBotResponse] = useState<string>('');
    const [soraAnalysis, setSoraAnalysis] = useState<string>('');

    useEffect(() => {
        const fetchLuxBotResponse = async () => {
            const response = await generateResponse("Summarize key metrics for Admin.");
            setLuxBotResponse(response);
        };

        const fetchSoraAnalysis = async () => {
            const analysis = await analyzeMarketSentiment("Provide a risk management analysis for the next month.");
            setSoraAnalysis(analysis);
        };

        fetchLuxBotResponse();
        fetchSoraAnalysis();
    }, []);

    return (
        <Dashboard>
            <div className="bg-white p-4 rounded shadow">
                <h2>Admin Specific Content</h2>
                <p>Manage users, view analytics, etc.</p>
            </div>
            <div className="bg-white p-4 rounded shadow mt-4">
                <h3>LUXBot Response:</h3>
                <p>{luxBotResponse || 'Loading LUXBot response...'}</p>
            </div>
            <div className="bg-white p-4 rounded shadow mt-4">
                <h3>SORA AI Analysis:</h3>
                <p>{soraAnalysis || 'Loading SORA AI analysis...'}</p>
            </div>
        </Dashboard>
    );
};

export default AdminDashboard;
