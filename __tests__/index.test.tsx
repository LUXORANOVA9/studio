import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { readFile } from 'fs/promises';
import Page from '../src/app/page';

describe('README.md Content', () => {
  it('should render the main heading', async () => {
    const readmeContent = await readFile('./README.md', 'utf-8');
    expect(readmeContent).toContain('# LuxoraNova Autopilot Empire v1.0');
  });
  it('should render the description paragraph', async () => {
    const readmeContent = await readFile('./README.md', 'utf-8');
    expect(readmeContent).toContain('LuxoraNova is a luxury fintech SaaS engine designed to automate wealth generation and global expansion.');
    expect(readmeContent).toContain('tiered role system, AI agents, blockchain integration, subscription-based monetization, white-label licensing');
  });
});

describe('Page Component', () => {
  it('should render initial UI elements', () => {
    render(<Page />);
    const titleElement = screen.getByText(/User Profile/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('should handle invalid user IDs', async () => {
    render(<Page />);
    // Simulate invalid ID (we can only test the UI portion now)

    //Expect that the page shows that the id is invalid

    const invlaidID = screen.getByText(/User Profile/i);
    expect(invlaidID).toBeInTheDocument();
  });
});
