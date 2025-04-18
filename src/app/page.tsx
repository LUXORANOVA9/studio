'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { isUUID, isSlug, slugToTitle } from '../lib/utils';
import { useToastHook } from '@/hooks/use-toast';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ethers } from 'ethers';

const CONTRACT_ADDRESS = "0x984190d20714618138C8bD1E031C3678FC40dbB0";
const CONTRACT_ABI = [
  {
    inputs: [{ internalType: 'string', name: 'cloneName', type: 'string' }],
    name: 'mintLicense',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  }
];

async function connectWallet() {
  try {
    const chainId = '0x13881';
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }]
    });
  } catch (switchError) {
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x13881',
              chainName: 'Polygon Mumbai Testnet',
              nativeCurrency: {
                name: 'MATIC',
                symbol: 'MATIC',
                decimals: 18
              },
              rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
              blockExplorerUrls: ['https://mumbai.polygonscan.com/']
            }
          ]
        });
      } catch (addError) {
        console.error('Failed to add Polygon Mumbai network', addError);
      }
    } else {
      console.error('Failed to switch to the network', switchError.message);
    }
  }
}

export default function Page() {
  const router = useRouter();
  const [repoUrl, setRepoUrl] = useState('');
  const [generatedCopy, setGeneratedCopy] = useState(null);
  const [generatedHtml, setGeneratedHtml] = useState('');
  const [loading, setLoading] = useState(false);
   const [autopilotEnabled, setAutopilotEnabled] = useState(false);
    const [campaignName, setCampaignName] = useState('');
    const [campaignContent, setCampaignContent] = useState('');

  const { toast } = useToastHook()

  const handleAddButler = () => {
      // setTeamButlers([...teamButlers, { id: teamButlers.length + 1, name: 'New Butler', tasks: '', performance: '0%' }]);
   };

  const handleCampaignLaunch = () => {
       // alert(`Launching campaign "${campaignName}" with content: ${campaignContent}`);
   };

  const handleAnalyzeRepository = async () => {
    setIsAnalyzing(true);

    // Simulate some async operation.
    setTimeout(() => {
      setIsAnalyzing(false);
      setGeneratedCopy({
        headline: 'Headline',
        subheadline: 'Subheadline',
        featureDescriptions: ['Description 1', 'Description 2', 'Description 3'],
        callToAction: 'Call to action'
      });
    }, 1500);
  };

   const [isAnalyzing, setIsAnalyzing] = useState(false);
   const [isSyndicateDialogOpen, setIsSyndicateDialogOpen] = useState(false);
   const [syndicateName, setSyndicateName] = useState('');
   const [syndicateDescription, setSyndicateDescription] = useState('');

  const handleGenerateCopy = async () => {
    // Simulate generating copy and enabling "Generate HTML" button
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate async
    toast({
      title: "Copy generated!",
      description: "Landing page copy generated. Now you can generate HTML"
    });
  }

  const handleRegenerateHeadline = async () => {
    setRegenerateHeadlineLoading(true);
    try {
      // Simulate generating new headline (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Here you would update the headline state with the new value
      toast({
        title: "New headline generated!",
        description: "A new headline has been generated",
      });
    } finally {
      setRegenerateHeadlineLoading(false);
    }
  };

  const handleGenerateHTML = async () => {
    setIsGeneratingHtml(true);

    // Simulate some async operation.
    setTimeout(() => {
      setIsGeneratingHtml(false);
      setGeneratedHtml('HTML Code Generated!');
    }, 1500);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "HTML copied to clipboard!",
      description: "The generated html has been copied."
    });
  };

  const [isGeneratingHtml, setIsGeneratingHtml] = useState(false);

  const mintClone = async () => {
        try {
            const signer = await connectWallet();
            await mintLicense("AI Scheduler", signer);
        } catch (e) {
            console.error("Minting process failed", e);
        }
    };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl font-mono text-sm lg:flex flex-col gap-4 items-center">
        <h1 className="text-3xl font-bold text-center">
          SaaS Landing Page Generator
        </h1>

        

        {/* Create Syndicate Button and Dialog */}
        
            
              Create Syndicate
            
          
          
            
              
                Create New Syndicate
              
              
                Enter the details for your new investment syndicate.
              
            
            
              
                
                  Syndicate Name
                
                
              
              
                
                  Description
                
                
              
            
          
          
            Create syndicate
          
        
      </div>
    </main>
  );
}
