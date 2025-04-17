'use client';

import React from 'react';
import { useAuth } from './AuthContext'; // Assuming you have an AuthContext
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface DashboardProps {
    children: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
    const { userRole, user } = useAuth();

    const generateReferralLink = () => {
        if (user) {
            return `${window.location.origin}/signup?referral=${user.uid}`;
        }
        return '';
    };

    const referralLink = generateReferralLink();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">
                {userRole ? `${userRole.toUpperCase()} Dashboard` : 'Dashboard'}
            </h1>
            {/* Referral Link Display (Brokers and Admins) */}
            {(userRole === 'broker' || userRole === 'admin' || userRole === 'superadmin') && (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Referral Link:</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                            type="text"
                            className="flex-1 focus:ring-primary focus:border-primary block w-full min-w-0 rounded-none rounded-l-md sm:text-sm border-gray-300"
                            value={referralLink}
                            readOnly
                        />
                        <Button
                            className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                            onClick={() => {
                                navigator.clipboard.writeText(referralLink);
                                alert('Referral link copied to clipboard!');
                            }}
                        >
                            <span>Copy</span>
                        </Button>
                    </div>
                    <p className="text-sm text-gray-500">Share this link to refer new users.</p>
                </div>
            )}

            {/* LuxoraNova Academy Link */}
            <div className="mb-4">
                <Link href="/academy">
                    <Button>
                        Visit LuxoraNova Academy
                    </Button>
                </Link>
            </div>

            {/* ScrollDAO Link */}
            {(userRole === 'broker' || userRole === 'admin' || userRole === 'superadmin' || userRole === 'client') && (
                <div className="mb-4">
                    <Link href="/scrolldao">
                        <Button>
                            Participate in ScrollDAO Governance
                        </Button>
                    </Link>
                </div>
            )}

              {/* LuxVerse Link */}
              {(userRole === 'broker' || userRole === 'admin' || userRole === 'superadmin' || userRole === 'client') && (
                  <div className="mb-4">
                      <Link href="/luxverse">
                          <Button>
                              Enter LuxVerse
                          </Button>
                      </Link>
                  </div>
              )}
               {/* Saas Landing Page Generator Link */}
               <div className="mb-4">
                  <Link href="/">
                     <Button>
                        Landing Page Generator
                     </Button>
                  </Link>
               </div>

            {children}
        </div>
    );
};

export default Dashboard;

