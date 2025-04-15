'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Proposal {
    id: number;
    title: string;
    description: string;
    votesFor: number;
    votesAgainst: number;
    voted: boolean;
}

const ScrollDAO: React.FC = () => {
    const { userRole } = useAuth();
    const [proposals, setProposals] = useState<Proposal[]>([]);

    useEffect(() => {
        // Placeholder: Fetch proposals from backend or smart contract
        const initialProposals: Proposal[] = [
            {
                id: 1,
                title: 'Launch LuxoraNova Nigeria',
                description: 'Should we launch a new clone in Nigeria?',
                votesFor: 100,
                votesAgainst: 50,
                voted: false,
            },
            {
                id: 2,
                title: 'Treasury Usage: Marketing Campaign',
                description: 'Allocate treasury funds for a new marketing campaign?',
                votesFor: 75,
                votesAgainst: 25,
                voted: false,
            },
        ];
        setProposals(initialProposals);
    }, []);

    const handleVote = (proposalId: number, vote: 'for' | 'against') => {
        setProposals(proposals =>
            proposals.map(proposal => {
                if (proposal.id === proposalId) {
                    return {
                        ...proposal,
                        votesFor: vote === 'for' ? proposal.votesFor + 1 : proposal.votesFor,
                        votesAgainst: vote === 'against' ? proposal.votesAgainst + 1 : proposal.votesAgainst,
                        voted: true,
                    };
                }
                return proposal;
            })
        );
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>ScrollDAO Governance</CardTitle>
                <CardDescription>Participate in voting on proposals to shape the future of LuxoraNova.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                {proposals.map(proposal => (
                    <Card key={proposal.id} className="mb-4">
                        <CardHeader>
                            <CardTitle>{proposal.title}</CardTitle>
                            <CardDescription>{proposal.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                            <div>
                                Votes For: {proposal.votesFor} | Votes Against: {proposal.votesAgainst}
                            </div>
                            {!proposal.voted ? (
                                <div>
                                    <Button onClick={() => handleVote(proposal.id, 'for')}>Vote For</Button>
                                    <Button onClick={() => handleVote(proposal.id, 'against')}>Vote Against</Button>
                                </div>
                            ) : (
                                <div>Voted!</div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </CardContent>
        </Card>
    );
};

export default ScrollDAO;
