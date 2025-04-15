// Using server actions in Next.js
'use server';

/**
 * @fileOverview Generates compelling landing page copy based on repository information.
 *
 * - generateLandingPageCopy - A function that generates landing page copy.
 * - GenerateLandingPageCopyInput - The input type for the generateLandingPageCopy function.
 * - GenerateLandingPageCopyOutput - The return type for the generateLandingPageCopy function.
 */

import {ai} from '@/ai/ai-instance';
import {GitHubRepo} from '@/services/github';
import {z} from 'genkit';

const GenerateLandingPageCopyInputSchema = z.object({
  repoInfo: z.object({
    name: z.string().describe('The name of the repository.'),
    description: z.string().describe('The description of the repository.'),
    url: z.string().describe('The URL of the repository.'),
    language: z.string().describe('The programming language used in the repository.'),
    readmeContent: z.string().describe('The README content of the repository.'),
  }).describe('The GitHub repository information.'),
});
export type GenerateLandingPageCopyInput = z.infer<typeof GenerateLandingPageCopyInputSchema>;

const GenerateLandingPageCopyOutputSchema = z.object({
  headline: z.string().describe('The main headline for the landing page.'),
  subheadline: z.string().describe('The subheadline for the landing page.'),
  featureDescriptions: z.array(z.string()).describe('Descriptions for the key features of the SaaS project.'),
  callToAction: z.string().describe('The call to action for the landing page.'),
});
export type GenerateLandingPageCopyOutput = z.infer<typeof GenerateLandingPageCopyOutputSchema>;

export async function generateLandingPageCopy(input: GenerateLandingPageCopyInput): Promise<GenerateLandingPageCopyOutput> {
  return generateLandingPageCopyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLandingPageCopyPrompt',
  input: {
    schema: z.object({
      repoInfo: z.object({
        name: z.string().describe('The name of the repository.'),
        description: z.string().describe('The description of the repository.'),
        url: z.string().describe('The URL of the repository.'),
        language: z.string().describe('The programming language used in the repository.'),
        readmeContent: z.string().describe('The README content of the repository.'),
      }).describe('The GitHub repository information.'),
    }),
  },
  output: {
    schema: z.object({
      headline: z.string().describe('The main headline for the landing page.'),
      subheadline: z.string().describe('The subheadline for the landing page.'),
      featureDescriptions: z.array(z.string()).describe('Descriptions for the key features of the SaaS project.'),
      callToAction: z.string().describe('The call to action for the landing page.'),
    }),
  },
  prompt: `You are an expert copywriter specializing in creating landing page copy for SaaS products.

  Based on the following repository information, generate compelling landing page copy, including a headline, subheadline, feature descriptions, and a call to action. Ensure the copy is concise, engaging, and accurately reflects the project's purpose and key features.

  Repository Name: {{{repoInfo.name}}}
  Repository Description: {{{repoInfo.description}}}
  Repository URL: {{{repoInfo.url}}}
  Repository Language: {{{repoInfo.language}}}
  README Content: {{{repoInfo.readmeContent}}}

  Headline: A catchy and concise headline that grabs the user's attention.
  Subheadline: A brief explanation of the project's value proposition.
  Feature Descriptions: A list of 3-5 key features with brief descriptions.
  Call to Action: A clear and compelling call to action that encourages users to sign up or learn more.
  `,
});

const generateLandingPageCopyFlow = ai.defineFlow<
  typeof GenerateLandingPageCopyInputSchema,
  typeof GenerateLandingPageCopyOutputSchema
>(
  {
    name: 'generateLandingPageCopyFlow',
    inputSchema: GenerateLandingPageCopyInputSchema,
    outputSchema: GenerateLandingPageCopyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
