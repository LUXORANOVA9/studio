import * as React from "react";

// --- Correction is here ---
// Import `useToast` from the correct path: '@/components/ui/use-toast'
// Also, keep the alias `useShadcnToast` if you intend to use that name internally.
import { useToast as useShadcnToast } from "@/components/ui/use-toast";
// --- End of Correction ---

// Renaming the function to `useToast` assuming that's the intended export.
// If `useToast2` was intentional, keep that name.
export function useToast() {
  // Get the toast function from the shadcn/ui hook
  const { toast, ...rest } = useShadcnToast();

  // You might not need React.useContext here unless you have a specific
  // *custom* context you created elsewhere related to toasts.
  // const context = React.useContext(ToastContext); // This line is removed as ToastContext is not imported

  // Return the toast function and any other values from the original hook
  // Or add your own custom logic/functions here if needed.
  return { toast, ...rest };
}