import * as React from "react";

import { useToast } from "@/components/ui/use-toast"

export function useToastHook() {
  // Use the toast function from the shadcn/ui hook
  const { toast } = useToast();

  return { toast };
}
