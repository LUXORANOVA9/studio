import React from 'react';
import { render, screen, waitFor, act, fireEvent, queryByText } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import ClientDashboard from '../client';
import {  useRouter } from 'next/navigation';
import { useAuth } from '../../components/AuthContext';

import generateResponse from '@/ai/luxbot'
import analyzeMarketSentiment from '@/ai/sora';
import * as api from '@/services/github';


jest.mock('next/navigation', () => ({
  
  useRouter: jest.fn(),
}));

jest.mock('../../components/AuthContext', () => ({
  useAuth: jest.fn(),
}));

const mockEthereum = {
  request: jest.fn(),
};
Object.defineProperty(window, 'ethereum', {
  value: mockEthereum,
});
describe('ClientDashboard', () => {
  const mockOnboardClient = jest.spyOn(api, 'onboardClient');
  mockOnboardClient.mockResolvedValue({
    success: true,
    message: 'Client onboarded successfully',
    });
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    
    });
    (generateResponse as jest.Mock).mockResolvedValue('LUXBot response'); // Mocking generateResponse to return 'LUXBot response'
    (analyzeMarketSentiment as jest.Mock).mockResolvedValue('SORA analysis'); // Mocking analyzeMarketSentiment to return 'SORA analysis'
          jest.mock('@/ai/luxbot', () => ({
            default: jest.fn()
          }));
          jest.mock('@/ai/sora', () => ({ default: jest.fn() }));
    mockEthereum.request.mockResolvedValue(['0xmockedaddress']);
  });

  it('renders without errors', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      userRole: 'client',
      loading: false,
      user: null
    });
    await act(async () => {
        render(<ClientDashboard />);
    });
    
    expect(screen.getByText('Client Specific Content')).toBeInTheDocument();
    expect(screen.getByText("Onboard Me!")).toBeInTheDocument();
        expect(screen.getByText("Submit")).toBeInTheDocument();
    
  });

  it('renders main content sections', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      userRole: 'client',
      loading: false,
      user: null
    });
     await act(async () => {
        render(<ClientDashboard />);
    });

    expect(screen.getByText('Client Specific Content')).toBeInTheDocument();// Check if 'Client Specific Content' is displayed
    expect(screen.getByText('LUXBot Response:')).toBeInTheDocument();
     expect(screen.getByText('SORA AI Analysis:')).toBeInTheDocument();
    expect(screen.getByText('Connect Your Wallet:')).toBeInTheDocument();
    expect(screen.getByTestId('luxbot-card')).toBeInTheDocument();
    expect(screen.getByTestId('billing-component')).toBeInTheDocument();
  });


  it('displays loading state', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      userRole: 'client',
      loading: true,
      user: null
    });
    await act(async () => {
        render(<ClientDashboard />);
    });

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('redirects if not authorized', async () => {
    const push = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({
      push: push,
    });
    (useAuth as jest.Mock).mockReturnValue({
      userRole: 'unauthorized',
      loading: false,
      user: null
    });
    await act(async () => {
        render(<ClientDashboard />);
    });
    

    
    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/');
    });
  });

  it('calls luxBot and SORA', async () => {
       (useAuth as jest.Mock).mockReturnValue({
           userRole: 'client',
           loading: false,
           user: null
           
       });
    await act(async () => {
        render(<ClientDashboard />);
    });

    await waitFor(() => {
        expect(generateResponse).toHaveBeenCalled();// Check if generateResponse was called
        expect(analyzeMarketSentiment).toHaveBeenCalled();
    });
  });

   it('handles LUXBot failure', async () => {
        (useAuth as jest.Mock).mockReturnValue({
            userRole: 'client',
            loading: false,
            user: null,
        });
        (generateResponse as jest.Mock).mockRejectedValue(new Error('LUXBot error'));

        await act(async () => {
            render(<ClientDashboard />);
        });

        await waitFor(() => {
            expect(screen.getByText('Error calling LUXBot')).toBeInTheDocument();
        });
    });

    it('handles SORA failure', async () => {
        (useAuth as jest.Mock).mockReturnValue({
            userRole: 'client',
        loading: false,
        user: null,
    });

        (analyzeMarketSentiment as jest.Mock).mockRejectedValue(new Error('SORA error'));
      await act(async () => {

          render(<ClientDashboard />);
        });

        await waitFor(() => {
            expect(screen.getByText('Error calling SORA')).toBeInTheDocument();
        });
    });

    it('does not call onboardClient if user is not logged in', async () => {
        (useAuth as jest.Mock).mockReturnValue({ userRole: 'client', loading: false, user: null });
        await act(async () => render(<ClientDashboard />));
        fireEvent.click(screen.getByText('Onboard Me!'));
      expect(mockOnboardClient).not.toHaveBeenCalled();
      
  });

  it('clicks connect wallet', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      userRole: 'client',
      loading: false,
      user: {
        uid: "testuid"
      }
    });
    
    await act(async () => {
      render(<ClientDashboard />);
  });
      const connectWalletButton = screen.getByText('Connect Wallet');
      await act(async () => {
          fireEvent.click(connectWalletButton);
      });
    await waitFor(() => {
          expect(mockEthereum.request).toHaveBeenCalledWith({ method: 'eth_requestAccounts' });
    })
  });


 it('onboardClient gets called', async () => {
        (useAuth as jest.Mock).mockReturnValue({
            userRole: 'client',
            loading: false,
            user: {
                uid: 'test-user-id',
            },
        });
        const mockOnboardClient = jest.spyOn(api, 'onboardClient');
        mockOnboardClient.mockResolvedValue({
            success: true,
            message: 'Client onboarded successfully',
        });
        await act(async () => render(<ClientDashboard />));
        const onboardMeButton = screen.getByText('Onboard Me!');
        await act(async () => fireEvent.click(onboardMeButton));


        await waitFor(() => {
            expect(mockOnboardClient).toHaveBeenCalledWith('test-user-id');
        });
        await waitFor(() => {
            expect(queryByText(screen.baseElement, 'Client onboarded successfully')).toBeTruthy();
        });
    });

  it('onboardClient fails', async () => {
    (useAuth as jest.Mock).mockReturnValue({ userRole: 'client', loading: false, user: { uid: 'test-user-id' } });
    mockOnboardClient.mockRejectedValue(new Error('Client onboarding failed')); // Simulate failure
    await act(async () => render(<ClientDashboard />));

    await waitFor(() => {
        expect(mockOnboardClient).toHaveBeenCalledWith('test-user-id');
    });
    // Check for error message
    await waitFor(() => {
        expect(screen.getByText('Error onboarding client')).toBeInTheDocument();
    });
    // Ensure other components still render
        expect(screen.getByText('Client Specific Content')).toBeInTheDocument();
        expect(screen.getByText('LUXBot Response:')).toBeInTheDocument();
        expect(screen.getByText('SORA AI Analysis:')).toBeInTheDocument();
        expect(screen.getByText('Connect Your Wallet:')).toBeInTheDocument();
});

  it('submits the form', async () => {
      const mockSubmitHandler = jest.fn();
        (useAuth as jest.Mock).mockReturnValue({
            userRole: 'client',
            loading: false,
            user: null,
             onSubmit: mockSubmitHandler
        });
        await act(async () => {
            render(<ClientDashboard />);
        });
      const inputElement = screen.getByPlaceholderText('Enter your message here');
        await act(async () => {
            userEvent.type(inputElement, 'This is a test message');
        });

        expect(inputElement.value).toBe('This is a test message');
        const submitButton = screen.getByText('Submit');
        await act(async () => fireEvent.click(submitButton));
          await waitFor(() => {
             expect(mockSubmitHandler).not.toHaveBeenCalled();
          });
    });
});