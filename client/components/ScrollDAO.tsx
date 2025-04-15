'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

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
    const [isSyndicateDialogOpen, setIsSyndicateDialogOpen] = useState(false);
    const [syndicateName, setSyndicateName] = useState('');
    const [syndicateDescription, setSyndicateDescription] = useState('');

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

    const handleCreateSyndicate = () => {
        // TODO: Implement syndicate creation logic (API call)
        console.log(`Creating syndicate with name: ${syndicateName} and description: ${syndicateDescription}`);
        setIsSyndicateDialogOpen(false);
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>ScrollDAO Governance</CardTitle>
                <CardDescription>Participate in voting on proposals to shape the future of LuxoraNova and form elite scroll syndicates.</CardDescription>
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

                {/* Create Syndicate Button and Dialog */}
                <Dialog open={isSyndicateDialogOpen} onOpenChange={setIsSyndicateDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>Create Syndicate</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Create New Syndicate</DialogTitle>
                            <DialogDescription>
                                Enter the details for your new investment syndicate.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Syndicate Name
                                </Label>
                                <Input
                                    id="name"
                                    value={syndicateName}
                                    onChange={(e) => setSyndicateName(e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">
                                    Description
                                </Label>
                                <Input
                                    id="description"
                                    value={syndicateDescription}
                                    onChange={(e) => setSyndicateDescription(e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <Button onClick={handleCreateSyndicate}>Create syndicate</Button>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
};

export default ScrollDAO;
