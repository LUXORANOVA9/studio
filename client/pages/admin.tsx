import React, { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard';
import { generateResponse } from '@/ai/luxbot';
import { analyzeMarketSentiment } from '@/ai/sora';
import { useAuth } from '../components/AuthContext'; // Import useAuth hook
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminDashboard: React.FC = () => {
    const [luxBotResponse, setLuxBotResponse] = useState<string>('');
    const [soraAnalysis, setSoraAnalysis] = useState<string>('');
    const { userRole, loading } = useAuth(); // Use the useAuth hook
    const router = useRouter();
    const [versionLogs, setVersionLogs] = useState<string>('');

    useEffect(() => {
        if (!loading && userRole !== 'admin' && userRole !== 'superadmin') {
            router.push('/'); // Redirect if not authorized
        }
    }, [userRole, loading, router]);

    useEffect(() => {
        const fetchLuxBotResponse = async () => {
            const response = await generateResponse("Summarize key metrics for Admin.");
            setLuxBotResponse(response);
        };

        const fetchSoraAnalysis = async () => {
            const analysis = await analyzeMarketSentiment("Provide a risk management analysis for the next month.");
            setSoraAnalysis(analysis);
        };

        const fetchVersionLogs = async () => {
          // Replace with your actual version log retrieval logic
          // This could involve reading a file, calling an API, etc.
          const logs = "v1.0: Initial release\nv1.1: Added SORA AI integration\nv1.2: Improved LUXBot performance";
          setVersionLogs(logs);
        };

        fetchLuxBotResponse();
        fetchSoraAnalysis();
        fetchVersionLogs();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Loading state
    }

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
            <Card className="w-full mt-4">
              <CardHeader>
                <CardTitle>Version Comparison Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="whitespace-pre-wrap">{versionLogs || 'Loading version logs...'}</pre>
              </CardContent>
            </Card>
        </Dashboard>
    );
};

export default AdminDashboard;
