'use server';
/**
 * @fileOverview Analyzes a GitHub repository to extract key features, technologies, and the overall purpose of the SaaS project.
 *
 * - analyzeRepoContent - A function that handles the repository content analysis process.
 * - AnalyzeRepoContentInput - The input type for the analyzeRepoContent function.
 * - AnalyzeRepoContentOutput - The return type for the analyzeRepoContent function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {getGitHubRepoInfo, GitHubRepo} from '@/services/github';

const AnalyzeRepoContentInputSchema = z.object({
  repoUrl: z.string().describe('The URL of the GitHub repository.'),
});
export type AnalyzeRepoContentInput = z.infer<typeof AnalyzeRepoContentInputSchema>;

const AnalyzeRepoContentOutputSchema = z.object({
  name: z.string().describe('The name of the repository.'),
  description: z.string().describe('A summary of the repository and its purpose.'),
  features: z.array(z.string()).describe('Key features of the SaaS project.'),
  technologies: z.array(z.string()).describe('Technologies used in the project.'),
});
export type AnalyzeRepoContentOutput = z.infer<typeof AnalyzeRepoContentOutputSchema>;

export async function analyzeRepoContent(input: AnalyzeRepoContentInput): Promise<AnalyzeRepoContentOutput> {
  return analyzeRepoContentFlow(input);
}

const analyzeRepoContentPrompt = ai.definePrompt({
  name: 'analyzeRepoContentPrompt',
  input: {
    schema: z.object({
      repoName: z.string().describe('The name of the repository.'),
      repoDescription: z.string().describe('The description of the repository.'),
      readmeContent: z.string().describe('The content of the README file.'),
      repoUrl: z.string().describe('The URL of the GitHub repository.'),
      language: z.string().describe('The language used in the repository.'),
    }),
  },
  output: {
    schema: z.object({
      name: z.string().describe('The name of the repository.'),
      description: z.string().describe('A summary of the repository and its purpose.'),
      features: z.array(z.string()).describe('Key features of the SaaS project.'),
      technologies: z.array(z.string()).describe('Technologies used in the project.'),
    }),
  },
  prompt: `You are an AI expert in analyzing software repositories.

  Analyze the following GitHub repository to extract key information about a SaaS project.
  The user will provide a repository name, description, its README content, URL and the language used. You should summarize the description, key features, technologies used in the repository based on the information provided.

  Repository Name: {{{repoName}}}
  Repository Description: {{{repoDescription}}}
  README Content: {{{readmeContent}}}
  URL: {{{repoUrl}}}
  Language: {{{language}}}

  Based on the information above, please provide the following information:
  - A concise summary that describes the repository.
  - Key features of the SaaS project.
  - Technologies used in the project.

  Please structure your output as a JSON object.
  `,
});

const analyzeRepoContentFlow = ai.defineFlow<
  typeof AnalyzeRepoContentInputSchema,
  typeof AnalyzeRepoContentOutputSchema
>({
  name: 'analyzeRepoContentFlow',
  inputSchema: AnalyzeRepoContentInputSchema,
  outputSchema: AnalyzeRepoContentOutputSchema,
}, async input => {
  const repoInfo: GitHubRepo = await getGitHubRepoInfo(input.repoUrl);

  const {output} = await analyzeRepoContentPrompt({
    repoName: repoInfo.name,
    repoDescription: repoInfo.description,
    readmeContent: repoInfo.readmeContent,
    repoUrl: repoInfo.url,
    language: repoInfo.language,
  });

  return output!;
});
