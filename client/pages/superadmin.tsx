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
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, UserPlus, Mail, Send, TrendingUp, ShoppingBag } from 'lucide-react';

const SuperAdminDashboard: React.FC = () => {
    const [luxBotResponse, setLuxBotResponse] = useState<string>('');
    const [soraAnalysis, setSoraAnalysis] = useState<string>('');
    const { userRole, loading } = useAuth(); // Use the useAuth hook
    const router = useRouter();
    const [autopilotEnabled, setAutopilotEnabled] = useState(false);
    const [teamButlers, setTeamButlers] = useState([
        { id: 1, name: 'Alpha', tasks: 'Lead Generation', performance: '95%' },
    ]);
    const [campaignName, setCampaignName] = useState('');
    const [campaignContent, setCampaignContent] = useState('');

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

    const handleAddButler = () => {
        setTeamButlers([...teamButlers, { id: teamButlers.length + 1, name: 'New Butler', tasks: '', performance: '0%' }]);
    };

    const handleCampaignLaunch = () => {
        alert(`Launching campaign "${campaignName}" with content: ${campaignContent}`);
    };

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

            {/* LuxoraNova OS */}
            <Card className="w-full mt-4">
                <CardHeader>
                    <CardTitle>LuxoraNova OS: Internal Tools</CardTitle>
                    <CardDescription>Manage team, campaigns, and empire analytics.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    {/* Team AI Butlers */}
                    <div>
                        <CardTitle>Team AI Butlers <Button variant="ghost" size="icon" onClick={handleAddButler}><PlusCircle className="h-4 w-4" /></Button></CardTitle>
                        <CardDescription>Assign tasks and track performance of your AI team.</CardDescription>
                        <ul className="list-none p-0">
                            {teamButlers.map(butler => (
                                <li key={butler.id} className="flex items-center justify-between py-2">
                                    <span>{butler.name}: {butler.tasks} ({butler.performance})</span>
                                    {/* Add controls for task assignment, performance review, etc. */}
                                </li>
                            ))}
                        </ul>
                        
                    </div>

                    {/* Drag-Drop Campaign Creator */}
                    <div>
                        <CardTitle>Campaign Creator</CardTitle>
                        <CardDescription>Launch marketing campaigns across multiple channels.</CardDescription>
                        <Input
                            type="text"
                            placeholder="Campaign Name"
                            value={campaignName}
                            onChange={(e) => setCampaignName(e.target.value)}
                            className="mb-2"
                        />
                        <Textarea
                            placeholder="Campaign Content"
                            value={campaignContent}
                            onChange={(e) => setCampaignContent(e.target.value)}
                            className="mb-2"
                        />
                        <div className="flex space-x-2">
                            <Button variant="outline"><UserPlus className="h-4 w-4 mr-2" />Reels</Button>
                            <Button variant="outline"><Mail className="h-4 w-4 mr-2" />Email</Button>
                            <Button variant="outline"><Send className="h-4 w-4 mr-2" />Telegram</Button>
                        </div>
                        <Button onClick={handleCampaignLaunch} className="mt-2">Launch Campaign</Button>
                    </div>

                    {/* Revenue KPI Dashboards */}
                    <div>
                        <CardTitle>Revenue KPI Dashboard</CardTitle>
                        <CardDescription>Track key performance indicators across your empire.</CardDescription>
                        {/* Placeholder: Implement charts, graphs, tables, etc. */}
                        <Button variant="secondary"><TrendingUp className="h-4 w-4 mr-2" />View Analytics</Button>
                    </div>

                    {/* Clone Creation Wizard */}
                    <div>
                        <CardTitle>Clone Creation Wizard</CardTitle>
                        <CardDescription>Create new white-label instances with ease.</CardDescription>
                        <Button variant="secondary">Create New Clone</Button>
                    </div>

                     {/* Clone Store Link */}
                     <div>
                        <CardTitle>International Cloning Accelerator</CardTitle>
                        <CardDescription>Launch new clones worldwide.</CardDescription>
                        <Button variant="secondary"><ShoppingBag className="h-4 w-4 mr-2" />View Clones</Button>
                    </div>
                </CardContent>
            </Card>
        </Dashboard>
    );
};

export default SuperAdminDashboard;
