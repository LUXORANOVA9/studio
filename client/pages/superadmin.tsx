'use client';

import React, { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard';
import { generateResponse } from '@/ai/luxbot';
import { analyzeMarketSentiment } from '@/ai/sora';
import { useAuth } from '../components/AuthContext'; // Import useAuth hook
import { useRouter } from 'next/navigation';
import WhiteLabelDeployer from '@/components/WhiteLabelDeployer';
import TreasuryDashboard from '@/components/TreasuryDashboard';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const SuperAdminDashboard: React.FC = () => {
    const [luxBotResponse, setLuxBotResponse] = useState<string>('');
    const [soraAnalysis, setSoraAnalysis] = useState<string>('');
    const { userRole, loading } = useAuth(); // Use the useAuth hook
    const router = useRouter();
    const [autopilotEnabled, setAutopilotEnabled] = useState(false);

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
            <div className="bg-white p-4 rounded shadow mt-4">
                <TreasuryDashboard />
            </div>
            {/* Autopilot Control Section */}
            <div className="bg-white p-4 rounded shadow mt-4">
                <h2>Autopilot Mode</h2>
                <div className="flex items-center space-x-2">
                    <Switch id="autopilot" checked={autopilotEnabled} onCheckedChange={setAutopilotEnabled} />
                    <Label htmlFor="autopilot">Enable Full Autopilot</Label>
                </div>
                <p>Engage AI-driven operations for wealth generation and expansion.</p>
                <p>Note: DAO-style investor governance can be optionally deployed.</p>
            </div>
            {/* ZYVAH Venture Link */}
            <div className="bg-white p-4 rounded shadow mt-4">
                <h2>ZYVAH by LuxoraNova</h2>
                <p>Begin building the next empire.</p>
                <a href="#" className="text-blue-500">Learn More about ZYVAH</a>
            </div>
        </Dashboard>
    );
};

export default SuperAdminDashboard;
