'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { toast } from '@/hooks/use-toast';
import {Copy, RefreshCw} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {Github} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React from "react"
import { motion } from "framer-motion";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

async function copyText(textToCopy) {
  if (!navigator.clipboard) {
    return alert('Clipboard not supported')
  }

  try {
    await navigator.clipboard.writeText(textToCopy)
    toast({
      title: "Copied!",
      description: "URL copied to clipboard."
    })
  } catch (error) {
    console.log("ERR", error)
    return alert('Copy failed')
  }
}

async function generateOpenGraphImage() {
  const response = await fetch(
    `/api/og?title=${encodeURIComponent('asdf')}`
  );

  if (response.ok) {
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
  }
}

export default function Page() {
  const [repoUrl, setRepoUrl] = React.useState('');
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [generatedCopy, setGeneratedCopy] = React.useState(null);
  const [generatedHtml, setGeneratedHtml] = React.useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [isGeneratingHtml, setIsGeneratingHtml] = React.useState(false);
  const [regenerateHeadlineLoading, setRegenerateHeadlineLoading] = React.useState(false);

  const handleUrlChange = (event) => {
    setRepoUrl(event.target.value);
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

  return (
    
       
        
          SaaS Landing Page Generator
        
      

      
        
          Subheadline
        
        
          Build and deploy beautiful landing pages in seconds with AI-powered templates and one-click integrations.
        
        
          Feature Descriptions
        
        
          <li>Drag &amp; drop builder</li>
          <li>Mobile-responsive out of the box</li>
          <li>AI-generated content suggestions</li>
        
      
    

      
        Enter your GitHub repository URL to generate a landing page.
      
     

      
        Analyze Repository
      
     

      
        Subheadline:
      
    
    
       Feature Descriptions:
      
    
    
       Call to Action:
      
    

      
        Generate HTML
      
    

      
        Generated HTML
      
    
    
       Copy HTML
      
    

    
       Regenerate
      
    
  );
}
