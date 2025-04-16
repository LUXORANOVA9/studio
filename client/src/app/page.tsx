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
import { analyzeRepoContent } from '@/ai/flows/analyze-repo-content';
import {generateLandingPageCopy} from '@/ai/flows/generate-landing-page-copy';

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

    try {
      const analysisResult = await analyzeRepoContent({repoUrl: repoUrl});
      setAnalysisResult(analysisResult);
      setIsAnalyzing(false);
    } catch (error) {
      console.error("Error during repository analysis:", error);
      setIsAnalyzing(false);
      toast({
        title: "Error during repository analysis",
        description: "Please check the repository URL and try again.",
        variant: "destructive",
      })
    }
  };

  const handleGenerateCopy = async () => {
    setIsGeneratingCopy(true);
    try {
      if (analysisResult) {
        const landingPageCopy = await generateLandingPageCopy({
          repoInfo: {
            name: analysisResult.name,
            description: analysisResult.description,
            url: repoUrl,
            language: analysisResult.technologies.join(', '),
            readmeContent: analysisResult.description,
          },
        });
        setGeneratedCopy(landingPageCopy);
        setIsGeneratingCopy(false);
      }
    } catch (error) {
      console.error("Error generating landing page copy:", error);
       setIsGeneratingCopy(false);
        toast({
          title: "Error generating landing page copy",
          description: "Please try again.",
          variant: "destructive",
        })
    }
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
    
      
        
          
            
              <CardTitle>SaaS Landing Page Generator</CardTitle>
            
          
        
        
          
            Enter your GitHub repository URL to generate a landing page.
          
          
            
              
            
            
              
            
          
        
        
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
        
      
    
  );
};

export default Page;
