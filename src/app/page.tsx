'use client';

import React, {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Textarea} from '@/components/ui/textarea';
import {analyzeRepoContent, AnalyzeRepoContentOutput} from '@/ai/flows/analyze-repo-content';
import {generateLandingPageCopy, GenerateLandingPageCopyOutput} from '@/ai/flows/generate-landing-page-copy';
import {toast} from '@/hooks/use-toast';
import {Copy, RefreshCw} from 'lucide-react';
// import {useCopyToClipboard} from 'usehooks-ts'; // Removed import
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {Github} from 'lucide-react';

const Page = () => {
  const [repoUrl, setRepoUrl] = useState<string>('https://github.com/LUXORANOVA9/luxoranova-saas');
  const [repoInfo, setRepoInfo] = useState<AnalyzeRepoContentOutput | null>(null);
  const [landingPageCopy, setLandingPageCopy] = useState<GenerateLandingPageCopyOutput | null>(null);
  const [generatedHtml, setGeneratedHtml] = useState<string | null>(null);
  const [copyValue, setCopyValue] = useState('');
  // const [value, copy] = useCopyToClipboard(); // Removed declaration

  const handleRepoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepoUrl(e.target.value);
  };

  const handleAnalyzeRepo = async () => {
    try {
      const repoData = await analyzeRepoContent({repoUrl});
      setRepoInfo(repoData);

      toast({
        title: 'Repository analysis complete!',
        description: 'Key features and technologies identified.',
      });
    } catch (error: any) {
      console.error('Error analyzing repository:', error);
      toast({
        variant: 'destructive',
        title: 'Error analyzing repository',
        description: error.message || 'Failed to analyze the repository. Please check the URL and try again.',
      });
    }
  };

  const handleGenerateCopy = async () => {
    if (!repoInfo) {
      toast({
        variant: 'destructive',
        title: 'Error generating copy',
        description: 'Please analyze the repository first.',
      });
      return;
    }

    try {
      const landingPageData = await generateLandingPageCopy({
        repoInfo: {
          name: repoInfo.name,
          description: repoInfo.description,
          url: repoUrl,
          language: 'TypeScript', // Assuming TypeScript, adjust as needed
          readmeContent: 'This is a SaaS landing page.', // Replace with actual content if available
        },
      });
      setLandingPageCopy(landingPageData);

      toast({
        title: 'Landing page copy generated!',
        description: 'Check out the headline, subheadline, and feature descriptions.',
      });
    } catch (error: any) {
      console.error('Error generating landing page copy:', error);
      toast({
        variant: 'destructive',
        title: 'Error generating copy',
        description: error.message || 'Failed to generate landing page copy. Please try again.',
      });
    }
  };

  const handleGenerateHtml = () => {
    if (!landingPageCopy) {
      toast({
        variant: 'destructive',
        title: 'Error generating HTML',
        description: 'Please generate landing page copy first.',
      });
      return;
    }

    // Basic HTML structure generation
    const html = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${landingPageCopy.headline}</title>
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
            <h1>${landingPageCopy.headline}</h1>
            <p>${landingPageCopy.subheadline}</p>
          </div>
        </header>
        <section class="container">
          <h2>Key Features</h2>
          ${landingPageCopy.featureDescriptions.map((feature, index) => `<div class="feature">${feature}</div>`).join('')}
        </section>
        <footer>
          <div class="container">
            <p>${landingPageCopy.callToAction}</p>
          </div>
        </footer>
      </body>
      </html>
    `;

    setGeneratedHtml(html);
    setCopyValue(html);

    toast({
      title: 'HTML generated!',
      description: 'You can now view, download, or copy the HTML code.',
    });
  };

  const handleCopyHtml = () => {
    // copy(copyValue); // Removed call to copy
    navigator.clipboard.writeText(copyValue);
    toast({
      title: 'HTML copied to clipboard!',
      description: 'Paste it into your favorite editor.',
    });
  };

  const regenerateHeadline = async () => {
    if (!repoInfo) {
      toast({
        variant: 'destructive',
        title: 'Error regenerating headline',
        description: 'Please analyze the repository and generate copy first.',
      });
      return;
    }

    try {
      // Call generateLandingPageCopy again, but only update the headline
      const newLandingPageCopy = await generateLandingPageCopy({
        repoInfo: {
          name: repoInfo.name,
          description: repoInfo.description,
          url: repoUrl,
          language: 'TypeScript', // Assuming TypeScript, adjust as needed
          readmeContent: 'This is a SaaS landing page.', // Replace with actual content if available
        },
      });

      setLandingPageCopy({
        ...landingPageCopy!,
        headline: newLandingPageCopy.headline,
      });

      toast({
        title: 'Headline regenerated!',
        description: 'A new headline has been generated.',
      });
    } catch (error: any) {
      console.error('Error regenerating headline:', error);
      toast({
        variant: 'destructive',
        title: 'Error regenerating headline',
        description: error.message || 'Failed to regenerate headline. Please try again.',
      });
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>SaaS Landing Page Generator</CardTitle>
          <CardDescription>Enter your GitHub repository URL to generate a landing page.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex space-x-2">
            <Input type="url" placeholder="GitHub Repository URL" value={repoUrl} onChange={handleRepoUrlChange} />
            <Button onClick={handleAnalyzeRepo}>Analyze Repository</Button>
          </div>
          {repoInfo && (
            <Alert>
              <Github className="h-4 w-4" />
              <AlertTitle>Repository Analysis Successful!</AlertTitle>
              <AlertDescription>
                We've identified key features and technologies. Now, generate your landing page copy.
              </AlertDescription>
            </Alert>
          )}
          <Button onClick={handleGenerateCopy} disabled={!repoInfo}>Generate Landing Page Copy</Button>
        </CardContent>
      </Card>

      {landingPageCopy && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Landing Page Copy</CardTitle>
            <CardDescription>Review and regenerate sections as needed.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">Headline</label>
                <Button variant="outline" size="icon" onClick={regenerateHeadline}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              <Textarea readOnly value={landingPageCopy.headline} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subheadline</label>
              <Textarea readOnly value={landingPageCopy.subheadline} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Feature Descriptions</label>
              {landingPageCopy.featureDescriptions.map((feature, index) => (
                <Textarea key={index} readOnly value={feature} />
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Call to Action</label>
              <Textarea readOnly value={landingPageCopy.callToAction} />
            </div>
            <Button onClick={handleGenerateHtml}>Generate HTML</Button>
          </CardContent>
        </Card>
      )}

      {generatedHtml && (
        <Card>
          <CardHeader>
            <CardTitle>Generated HTML</CardTitle>
            <CardDescription>View, download, or copy the HTML code.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Textarea readOnly value={generatedHtml} />
            <Button onClick={handleCopyHtml}>
              <Copy className="h-4 w-4 mr-2" />
              Copy HTML
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Page;
