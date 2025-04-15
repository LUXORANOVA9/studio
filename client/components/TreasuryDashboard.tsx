'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Chart } from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const TreasuryDashboard: React.FC = () => {
    const [mrr, setMrr] = useState<number>(0);
    const [roi, setRoi] = useState<number>(0);
    const [ltv, setLtv] = useState<number>(0);
    const [walletAddress, setWalletAddress] = useState<string>('');
    const [withdrawalAmount, setWithdrawalAmount] = useState<number>(0);

    useEffect(() => {
        // Placeholder: Fetch actual analytics data and revenue streams from backend.
        // Replace with your actual data fetching logic.
        setMrr(150000); // Monthly Recurring Revenue
        setRoi(25);    // Return on Investment (%)
        setLtv(500000); // Lifetime Value
    }, []);

    const handleConnectWallet = () => {
        // Placeholder: Implement logic to connect to crypto wallets (e.g., using MetaMask).
        // Replace with your actual wallet connection logic.
        alert('Connecting to crypto wallet...');
    };

    const handleWithdrawal = () => {
        // Placeholder: Implement logic to initiate a withdrawal.
        // Replace with your actual withdrawal logic.
        alert(`Withdrawing ${withdrawalAmount} to ${walletAddress}...`);
    };

    // Sample chart data
    const chartData = [
        { name: 'Jan', revenue: 120000 },
        { name: 'Feb', revenue: 130000 },
        { name: 'Mar', revenue: 140000 },
        { name: 'Apr', revenue: 150000 },
        { name: 'May', revenue: 160000 },
    ];

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Treasury &amp; Analytics Chamber</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Monthly Recurring Revenue</CardTitle>
                        </CardHeader>
                        <CardContent>₹{mrr.toLocaleString()}</CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Return on Investment</CardTitle>
                        </CardHeader>
                        <CardContent>{roi}%</CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Lifetime Value</CardTitle>
                        </CardHeader>
                        <CardContent>₹{ltv.toLocaleString()}</CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Revenue Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Placeholder: Replace with actual chart component. */}
                        <Chart data={chartData} />
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Connect Crypto Wallet</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Button onClick={handleConnectWallet}>Connect Wallet</Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Withdraw Funds</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-2">
                            <Input
                                type="text"
                                placeholder="Wallet Address"
                                value={walletAddress}
                                onChange={(e) => setWalletAddress(e.target.value)}
                            />
                            <Input
                                type="number"
                                placeholder="Amount to Withdraw"
                                value={withdrawalAmount}
                                onChange={(e) => setWithdrawalAmount(Number(e.target.value))}
                            />
                            <Button onClick={handleWithdrawal}>Initiate Withdrawal</Button>
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
        </Card>
    );
};

export default TreasuryDashboard;
