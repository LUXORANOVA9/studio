import * as React from "react";

import { useToast as useShadcnToast } from "@/components/ui/toaster";

export function useToast() {
  const { toast } = useShadcnToast();

  return { toast };
}
