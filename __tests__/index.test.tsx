import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { readFile } from 'fs/promises';
import Page from '../src/app/page';

describe('README.md Content', () => {
  it('should render the main heading', async () => {
    const readmeContent = await readFile('./README.md', 'utf-8');
    expect(readmeContent).toContain('# Firebase Studio');
  });
  it('should render the description paragraph', async () => {
    const readmeContent = await readFile('./README.md', 'utf-8');
    expect(readmeContent).toContain('This is a NextJS starter in Firebase Studio.');
    expect(readmeContent).toContain('To get started, take a look at src/app/page.tsx.');
  });
});

describe('Page Component', () => {
  it('should render initial UI elements', () => {
    render(<Page />);
    expect(screen.getByText('SaaS Landing Page Generator')).toBeInTheDocument();
    expect(screen.getByText('Enter your GitHub repository URL to generate a landing page.')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('GitHub Repository URL')).toBeInTheDocument();
    expect(screen.getByText('Analyze Repository')).toBeInTheDocument();
  });

  it('should accept a repository URL in the input field', () => {
    render(<Page />);
    const inputElement = screen.getByPlaceholderText('GitHub Repository URL');
    fireEvent.change(inputElement, { target: { value: 'https://github.com/example/repo' } });
    expect(inputElement).toHaveValue('https://github.com/example/repo');
  });

  it('should disable the "Analyze Repository" button while analyzing', async () => {
    render(<Page />);
    const analyzeButton = screen.getByText('Analyze Repository');

    // Simulate analysis (disable button immediately)
    fireEvent.click(analyzeButton);
    expect(analyzeButton).toBeDisabled();

    // Re-enable after a timeout to simulate analysis completion
    await waitFor(() => {
      expect(analyzeButton).not.toBeDisabled();
    }, { timeout: 2000 }); 
  });

  it('should enable "Generate Landing Page Copy" button after successful repository analysis', async () => {
    render(<Page />);
    const analyzeButton = screen.getByText('Analyze Repository');
    // Simulate a successful analysis (in a real scenario, we would mock the API call and state update)
    fireEvent.click(analyzeButton);
    // We'll assume the button is re-enabled after a timeout, as in the component logic.
    await waitFor(() => expect(analyzeButton).not.toBeDisabled(), { timeout: 2000 });

    const generateCopyButton = screen.getByText('Generate Landing Page Copy');

    // Initially disabled
    expect(generateCopyButton).toBeDisabled();

    // Simulate a successful analysis (in a real scenario, we would mock the API call)
    fireEvent.click(analyzeButton);
    await waitFor(() => expect(generateCopyButton).not.toBeDisabled(), { timeout: 2000 });
  });

  it('should render generated copy elements after generating copy', async () => {
    render(<Page />);
    const analyzeButton = screen.getByText('Analyze Repository');
    const generateCopyButton = screen.getByText('Generate Landing Page Copy');
    
    //Simulate a successful analysis
    fireEvent.click(analyzeButton);
    await waitFor(() => expect(analyzeButton).not.toBeDisabled(), { timeout: 2000 });

    //Simulate enabling of "Generate Landing Page Copy" button
    await waitFor(() => expect(generateCopyButton).not.toBeDisabled(), { timeout: 2000 });

    //Click the "Generate Landing Page Copy" button
    await waitFor(() => {
      expect(generateCopyButton).not.toBeDisabled();
    }, { timeout: 3000 });

    fireEvent.click(generateCopyButton);

    // Wait for the copy to be generated and elements to appear
    await waitFor(() => {
      expect(screen.getByLabelText('Headline')).toBeInTheDocument();
      expect(screen.getByLabelText('Subheadline')).toBeInTheDocument();
      expect(screen.getByLabelText('Feature Descriptions')).toBeInTheDocument();
      expect(screen.getByLabelText('Call to Action')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('should show "Generate HTML" button after generating copy', async () => {
    render(<Page />);
    const analyzeButton = screen.getByText('Analyze Repository');
    const generateCopyButton = screen.getByText('Generate Landing Page Copy');

    // Simulate a successful analysis and copy generation
    fireEvent.click(analyzeButton);
    await waitFor(() => expect(generateCopyButton).not.toBeDisabled(), { timeout: 2000 });
    fireEvent.click(generateCopyButton);
    await waitFor(() => expect(screen.getByLabelText('Headline')).toBeInTheDocument(), { timeout: 3000 });

    expect(screen.getByText('Generate HTML')).toBeInTheDocument();
  });

  it('should render HTML code and "Copy HTML" button after generating HTML', async () => {
    render(<Page />);
    const analyzeButton = screen.getByText('Analyze Repository');
    const generateCopyButton = screen.getByText('Generate Landing Page Copy');

    // Simulate a successful analysis, copy generation and HTML generation
    fireEvent.click(analyzeButton);
    await waitFor(() => expect(generateCopyButton).not.toBeDisabled(), { timeout: 2000 });
    fireEvent.click(generateCopyButton);
    await waitFor(() => expect(screen.getByLabelText('Headline')).toBeInTheDocument(), { timeout: 2000 });
    fireEvent.click(screen.getByText('Generate HTML'));

    // Wait for HTML to be generated
    await waitFor(() => {
      expect(screen.getByLabelText('Generated HTML')).toBeInTheDocument();
      expect(screen.getByText('Copy HTML')).toBeInTheDocument();
    }, { timeout: 2000 });
  });
  
  it('should show and be able to click the headline regeneration button after generating copy', async () => {
    render(<Page />);
    const analyzeButton = screen.getByText('Analyze Repository');
    const generateCopyButton = screen.getByText('Generate Landing Page Copy');

    // Simulate a successful analysis and copy generation
    fireEvent.click(analyzeButton);
    await waitFor(() => expect(generateCopyButton).not.toBeDisabled(), { timeout: 2000 });
    fireEvent.click(generateCopyButton);
    await waitFor(() => expect(screen.getByLabelText('Headline')).toBeInTheDocument(), { timeout: 2000 });

    // Check if the regenerate button exists
    const regenerateButton = await screen.findByRole('button', {
      name: /regenerate/i,
    }, { timeout: 2000 }); // Increased timeout
    expect(regenerateButton).toBeInTheDocument();

    // Check if it's clickable (will only test if the event fires, we are not testing the functionality)
    fireEvent.click(regenerateButton);

    // Add more assertions here if needed to check for UI changes after the button click.
    await waitFor(() => expect(generateCopyButton).not.toBeDisabled(), { timeout: 2000 });
    fireEvent.click(generateCopyButton);
    await waitFor(() => expect(screen.getByLabelText('Headline')).toBeInTheDocument(), { timeout: 3000 });
  });

  it('should copy HTML to clipboard when "Copy HTML" button is clicked', async () => {
    render(<Page />);
    const analyzeButton = screen.getByText('Analyze Repository');
    const generateCopyButton = screen.getByText('Generate Landing Page Copy');

    // Simulate a successful analysis, copy generation and HTML generation
    fireEvent.click(analyzeButton);
    await waitFor(() => expect(generateCopyButton).not.toBeDisabled(), { timeout: 2000 });
    fireEvent.click(generateCopyButton);
    await waitFor(() => expect(screen.getByLabelText('Headline')).toBeInTheDocument(), { timeout: 2000 });
    fireEvent.click(screen.getByText('Generate HTML'));

    // Wait for HTML to be generated
    await waitFor(() => {
      expect(screen.getByLabelText('Generated HTML')).toBeInTheDocument();
      expect(screen.getByText('Copy HTML')).toBeInTheDocument();
    }, { timeout: 2000 });

    const copyHtmlButton = screen.getByText('Copy HTML');
    fireEvent.click(copyHtmlButton);

    // Assert that the toast appears (you might need to adjust the selector based on your toast implementation)
    await waitFor(() => {
      expect(screen.getByText('HTML copied to clipboard!')).toBeInTheDocument();
    }, { timeout: 2000 });
  });
});
