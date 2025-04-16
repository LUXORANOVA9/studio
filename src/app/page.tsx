'use client';

import React from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Github} from 'lucide-react';
import { toast } from "@/hooks/use-toast"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const Page = () => {
  const [repoUrl, setRepoUrl] = React.useState('');
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [analysisResult, setAnalysisResult] = React.useState(null);
  const [isGeneratingCopy, setIsGeneratingCopy] = React.useState(false);
  const [generatedCopy, setGeneratedCopy] = React.useState(null);
  const [isGeneratingHtml, setIsGeneratingHtml] = React.useState(false);
  const [generatedHtml, setGeneratedHtml] = React.useState(null);

  const handleRepoUrlChange = (event) => {
    setRepoUrl(event.target.value);
  };

  const handleAnalyzeRepository = async () => {
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setAnalysisResult({
        name: 'Sample SaaS',
        description: 'A description of the SaaS project.',
        features: ['Feature 1', 'Feature 2'],
        technologies: ['React', 'Node.js'],
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleGenerateCopy = async () => {
    setIsGeneratingCopy(true);
    // Simulate API call
    setTimeout(() => {
      setGeneratedCopy({
        headline: 'Compelling Headline',
        subheadline: 'Engaging Subheadline',
        featureDescriptions: ['Feature 1 Description', 'Feature 2 Description'],
        callToAction: 'Sign Up Now',
      });
      setIsGeneratingCopy(false);
    }, 2000);
  };

  const handleGenerateHtml = async () => {
    setIsGeneratingHtml(true);
    // Simulate API call
    setTimeout(() => {
      setGeneratedHtml('<p>Generated HTML code</p>');
      setIsGeneratingHtml(false);
    }, 2000);
  };

  const handleRegenerateHeadline = async () => {
    //Simulate the headline regeneration process
    setIsGeneratingCopy(true);

    setTimeout(() => {
      setGeneratedCopy((prevCopy) => ({
        ...prevCopy,
        headline: 'A New and Improved Headline!',
      }));
      setIsGeneratingCopy(false);
    }, 2000);
  };

  const handleCopyHtml = () => {
     navigator.clipboard.writeText(generatedHtml);
      toast({
        title: "HTML copied to clipboard!",
        description: "Ready to paste into your project.",
      })
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <h1 className="text-3xl font-bold text-center w-full">
            SaaS Landing Page Generator
          </h1>
        </div>

        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white/10 to-transparent dark:from-black dark:via-black/10 dark:to-transparent lg:static lg:h-auto lg:w-auto lg:bg-none">
          <div className="pointer-events-none flex place-items-center justify-center p-8 text-center">
            
              Enter your GitHub repository URL to generate a landing page.
            
          </div>
        </div>

        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-left">
          
            
              
                GitHub Repository URL
              
            
            
              
                
                  
                
              
            
          
        </div>

        {analysisResult && (
          
            
              
                
                  Headline:
                
                
                  Subheadline:
                
                
                  Feature Descriptions:
                
                
                  Call to Action:
                
              
              
                
                  
                   Regenerate Headline
                 
                
                
                
                  
                    Generate HTML
                  
                
              
            
          
        )}

        {generatedHtml && (
          
            
              
                Generated HTML
              
            
            
              
                Copy HTML
              
            
          
        )}
      </main>
    </>
  );
};

export default Page;

