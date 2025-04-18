import * as React from "react";

// Import the useToast hook from the Shadcn UI toast component
import { useToast } from "@/components/ui/toast";

export function useToast() {
  // Use the toast function from the shadcn/ui hook
  const { toast } = useToast();

  // Return the toast function
  return { toast };
}
