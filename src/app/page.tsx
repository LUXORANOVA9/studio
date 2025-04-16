'use client';

import React from 'react';
import {toast} from '@/hooks/use-toast';
import {Copy, RefreshCw} from 'lucide-react';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {Github} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const Page = () => {
  const [repoUrl, setRepoUrl] = React.useState('');
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [generatedCopy, setGeneratedCopy] = React.useState({
    headline: '',
    subheadline: '',
    featureDescriptions: [''],
    callToAction: '',
  });
  const [isCopyGenerated, setIsCopyGenerated] = React.useState(false);
  const [htmlCode, setHtmlCode] = React.useState('');
  const [isHtmlGenerated, setIsHtmlGenerated] = React.useState(false);
  const [isCopying, setIsCopying] = React.useState(false);

  const handleRepoUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepoUrl(event.target.value);
  };

  const handleAnalyzeRepository = async () => {
    setIsAnalyzing(true);
    // Simulate analyzing repository (replace with actual API call)
    setTimeout(() => {
      setIsAnalyzing(false);
      setIsCopyGenerated(false); // Reset copy generation state
      toast({
        title: "Repository analyzed!",
        description: "Successfully analyzed the repository. You can now generate landing page copy.",
      })
    }, 2000);
  };

  const handleGenerateCopy = async () => {
    setIsCopyGenerated(true);
    // Simulate generating copy (replace with actual API call)
    setTimeout(() => {
      setGeneratedCopy({
        headline: 'Launch Your SaaS Idea Faster',
        subheadline: 'A production-ready landing page template built with TypeScript.',
        featureDescriptions: [
          'Clean, modern design built with TypeScript for optimal performance.',
          'Fully responsive layout ensures a seamless experience on any device.',
          'Easily customizable to match your brand\'s unique identity.',
          'Scalable architecture designed to grow with your business.',
          'Well-documented codebase for easy understanding and maintenance.',
        ],
        callToAction: 'Get Started Today!',
      });
      toast({
        title: "Landing page copy generated!",
        description: "Check out the generated copy below.",
      })
    }, 2000);
  };

  const handleRegenerateHeadline = async () => {
    // Simulate regenerating headline (replace with actual API call)
    setTimeout(() => {
      setGeneratedCopy(prev => ({
        ...prev,
        headline: 'New Headline Generated!',
      }));
      toast({
        title: "Headline Regenerated!",
        description: "A new headline has been generated.",
      });
    }, 1500);
  };
  
  const handleGenerateHTML = () => {
    setIsHtmlGenerated(true);
    // Generate basic HTML structure based on the generated copy
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Headline Generated!</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; color: #333; }
          .container { width: 80%; margin: auto; overflow: hidden; }
          header { background: #1A237E; color: white; padding-top: 30px; min-height: 70px; border-bottom: #00BCD4 3px solid; }
          header h1 { text-align: center; }
          header p { text-align: center; }
          section { padding: 20px; }
          .feature { border: 1px solid #ddd; margin-bottom: 10px; padding: 10px; background: white; }
          footer { text-align: center; padding: 10px; margin-top: 20px; color: white; background-color: #1A237E; }
        </style>
      </head>
      <body>
        <header>
          <div class="container">
            <h1>New Headline Generated!</h1>
            <p>A production-ready landing page template built with TypeScript.</p>
          </div>
        </header>
        <section class="container">
          <h2>Key Features</h2>
          ${generatedCopy.featureDescriptions.map(feature => `<div class="feature">${feature}</div>`).join('')}
        </section>
        <footer>
          <div class="container">
            <p>${generatedCopy.callToAction}</p>
          </div>
        </footer>
      </body>
      </html>
    `;
    setHtmlCode(html);
    toast({
      title: "HTML generated!",
      description: "The HTML code for your landing page has been generated.",
    })
  };

  const handleCopyHTML = async () => {
    setIsCopying(true);
    try {
      await navigator.clipboard.writeText(htmlCode);
      toast({
        title: "HTML copied to clipboard!",
        description: "The HTML code has been successfully copied to your clipboard.",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Failed to copy HTML!",
        description: "There was an error copying the HTML code to your clipboard.",
      });
    } finally {
      setIsCopying(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">SaaS Landing Page Generator</h1>
      <p>Enter your GitHub repository URL to generate a landing page.</p>

      <div className="flex items-center mb-4">
        <Input
          type="text"
          placeholder="GitHub Repository URL"
          className="mr-2"
          value={repoUrl}
          onChange={handleRepoUrlChange}
        />
        <Button onClick={handleAnalyzeRepository} disabled={isAnalyzing}>
          {isAnalyzing ? 'Analyzing...' : 'Analyze Repository'}
        </Button>
      </div>

      {isAnalyzing && (
        <Alert>
          <AlertTitle>Analyzing Repository...</AlertTitle>
          <AlertDescription>Please wait while we analyze the repository.</AlertDescription>
        </Alert>
      )}
        {/* Display the "Generate Landing Page Copy" button */}
        {!isAnalyzing && (
          <Button
            onClick={handleGenerateCopy}
            disabled={isAnalyzing || isCopyGenerated}
          >
            Generate Landing Page Copy
          </Button>
        )}

      {isCopyGenerated && (
        <div className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Generated Copy</CardTitle>
              <CardDescription>Review and regenerate sections as needed.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="headline">Headline</Label>
                <div className="flex items-center">
                  <Input id="headline" defaultValue={generatedCopy.headline} aria-label="Headline" readOnly />
                  <Button variant="outline" size="icon" onClick={handleRegenerateHeadline} aria-label="Regenerate Headline">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subheadline">Subheadline</Label>
                <Input id="subheadline" defaultValue={generatedCopy.subheadline} aria-label="Subheadline" readOnly />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="feature-descriptions">Feature Descriptions</Label>
                {generatedCopy.featureDescriptions.map((feature, index) => (
                  <Textarea
                    key={index}
                    defaultValue={feature}
                    className="min-h-[80px]"
                    aria-label="Feature Descriptions"
                    readOnly
                  />
                ))}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="call-to-action">Call to Action</Label>
                <Input id="call-to-action" defaultValue={generatedCopy.callToAction} aria-label="Call to Action" readOnly />
              </div>
            </CardContent>
              <CardFooter className="flex justify-between items-center">
                <Button onClick={handleGenerateHTML}>Generate HTML</Button>
              </CardFooter>
          </Card>
        </div>
      )}
       {isHtmlGenerated && (
        <div className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Generated HTML</CardTitle>
              <CardDescription>Copy the HTML code below.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="generated-html">Generated HTML</Label>
                <Textarea
                  id="generated-html"
                  defaultValue={htmlCode}
                  className="min-h-[200px] font-mono text-sm"
                  aria-label="Generated HTML"
                  readOnly
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleCopyHTML} disabled={isCopying}>
                {isCopying ? 'Copying...' : 'Copy HTML'}
                <Copy className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Page;
