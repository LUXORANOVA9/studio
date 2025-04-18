// src/components/ui/toast.tsx
// Run "npm install react-toastify" or "yarn add react-toastify"
import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface ToastOptions {
  type?: 'success' | 'error' | 'info' | 'warning';
  autoClose?: number;
}

// Core toast hook implementation
export function useCoreToast() {
  const notify = React.useCallback((message: string, options?: ToastOptions) => {
    toast(message, {
      type: options?.type,
      autoClose: options?.autoClose ?? 3000,
    });
  }, []);

  return { notify };
}

// Alias export: allow importing useToast directly
export { useCoreToast as useToast };

// Provider to mount the toast container
export const ToastProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <>
    {children}
    <ToastContainer />
  </>
);
