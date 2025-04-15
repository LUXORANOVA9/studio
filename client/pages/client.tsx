
import React, { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard';
import { generateResponse } from '@/ai/luxbot';
import { analyzeMarketSentiment } from '@/ai/sora';
import { useAuth } from '../components/AuthContext'; // Import useAuth hook
import { useRouter } from 'next/navigation';
import Billing from '@/components/Billing';

const ClientDashboard: React.FC = () => {
    const [luxBotResponse, setLuxBotResponse] = useState<string>('');
    const [soraAnalysis, setSoraAnalysis] = useState<string>('');
    const { userRole, loading } = useAuth(); // Use the useAuth hook
    const router = useRouter();

    useEffect(() => {
        if (!loading && userRole !== 'client' && userRole !== 'broker' && userRole !== 'admin' && userRole !== 'superadmin') {
            router.push('/'); // Redirect if not authorized
        }
    }, [userRole, loading, router]);

    useEffect(() => {
        const fetchLuxBotResponse = async () => {
            const response = await generateResponse("Summarize key metrics for Client.");
            setLuxBotResponse(response);
        };

        const fetchSoraAnalysis = async () => {
            const analysis = await analyzeMarketSentiment("Provide a predictive financial modeling for the next month.");
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
                <h2>Client Specific Content</h2>
                <p>View your portfolio, AI insights, etc.</p>
            </div>
            <div className="bg-white p-4 rounded shadow mt-4">
                <h3>LUXBot Response:</h3>
                <p>{luxBotResponse || 'Loading LUXBot response...'}</p>
            </div>
            <div className="bg-white p-4 rounded shadow mt-4">
                <h3>SORA AI Analysis:</h3>
                <p>{soraAnalysis || 'Loading SORA AI analysis...'}</p>
            </div>
              {/* LUXBot Chatbot Simulation */}
              <div className="bg-white p-4 rounded shadow mt-4">
                  <h3>Ask LUXBot:</h3>
                  <input
                      type="text"
                      placeholder="Enter your question"
                      className="w-full border rounded p-2 mb-2"
                  />
                  <button className="bg-blue-500 text-white rounded p-2">Ask</button>
              </div>

              {/* User Onboarding Simulation */}
              <div className="bg-white p-4 rounded shadow mt-4">
                  <h3>Simulate User Onboarding:</h3>
                  <button className="bg-green-500 text-white rounded p-2">Onboard Me!</button>
              </div>

              {/* Lead Capture Form Simulation */}
              <div className="bg-white p-4 rounded shadow mt-4">
                  <h3>Interested in LuxoraNova?</h3>
                  <input
                      type="text"
                      placeholder="Name"
                      className="w-full border rounded p-2 mb-2"
                  />
                  <input
                      type="email"
                      placeholder="Email"
                      className="w-full border rounded p-2 mb-2"
                  />
                  <textarea
                      placeholder="Message"
                      className="w-full border rounded p-2 mb-2"
                  />
                  <button className="bg-yellow-500 text-white rounded p-2">Submit</button>
              </div>
            <Billing />
        </Dashboard>
    );
};

export default ClientDashboard;

