import * as React from "react";

// Corrected import path
import {
  useToast as useShadcnToast,
  ToastProps, // Import ToastProps if you need to type the toast function
} from "@/components/ui/toast"; // Correct import path

export function useToast() {
  const { toast } = useShadcnToast();

  return { toast };
}
