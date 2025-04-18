import * as React from "react";

// Corrected import path
import { useToast } from "@/components/ui/toast";

export function useToastHook() {
  // Use the toast function from the shadcn/ui hook
  const { toast } = useToast();

  return { toast };
}
