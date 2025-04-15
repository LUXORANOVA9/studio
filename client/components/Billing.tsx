'use client';

import React, {useState, useEffect} from 'react';
import {useAuth} from './AuthContext';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

interface BillingProps {}

const Billing: React.FC<BillingProps> = ({}) => {
  const {user, userRole} = useAuth();
  const [subscriptionStatus, setSubscriptionStatus] = useState<string>('inactive'); // Example: 'active', 'inactive', 'pending'
  const [commission, setCommission] = useState<number>(0); // AI-tracked commission

  useEffect(() => {
    // TODO: Fetch subscription status and commission from backend
    // Example using fetch:
    // fetch('/api/billing/status')
    //   .then(res => res.json())
    //   .then(data => {
    //     setSubscriptionStatus(data.status);
    //     setCommission(data.commission);
    //   });
    // Placeholder values
    setSubscriptionStatus('active');
    setCommission(500);
  }, [user]);

  const handleSubscribe = () => {
    // TODO: Redirect to Stripe checkout page
    alert('Redirecting to Stripe for subscription...');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Billing &amp; Subscriptions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Status</CardTitle>
            </CardHeader>
            <CardContent>{subscriptionStatus}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>AI-Tracked Commission</CardTitle>
            </CardHeader>
            <CardContent>₹{commission.toLocaleString()}</CardContent>
          </Card>
        </div>
        {subscriptionStatus === 'inactive' && (
          <Button onClick={handleSubscribe}>Subscribe Now</Button>
        )}
        {/* NFT Scroll Access Info */}
        {userRole && (
          <div className="mt-4">
            <p>
              You have access to the{' '}
              <span className="font-semibold">{userRole}</span> dashboard
              through your NFT scroll.
            </p>
            {/* Add more details about NFT benefits, etc. */}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Billing;
