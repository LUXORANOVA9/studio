import * as React from "react";

// Import the useToast hook from the Shadcn UI toast component
import { useToast } from "@/components/ui/use-toast";

export function useToastHook() {
  // Use the toast function from the shadcn/ui hook
  const { toast } = useToast();

  // Return the toast function
  return { toast };
}
