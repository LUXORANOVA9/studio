import * as React from "react";

// --- Correction is here ---
// Import `useToast` from the correct path: '@/components/ui/toast'
// Also, keep the alias `useShadcnToast` if you intend to use that name internally.
import useShadcnToast from "@/components/ui/toast";
// --- End of Correction ---

// Assuming the rest of your hook implementation follows, for example:
export function useToast() {
  const { toast } = useShadcnToast(); // Use the aliased import

  // Your custom hook logic might go here, or you might just re-export
  // For example, just re-exporting the functionality:
  return { toast };

  // Or add custom logic if needed:
  // const showMyCustomToast = () => {
  //   toast({ title: "My Custom Toast", description: "Hello!" });
  // };
  // return { toast, showMyCustomToast };
}

// Note: If this entire file's purpose was ONLY to re-export the hook
// under the same name 'useToast', you might not need this custom hook file
// at all. You could potentially import directly from '@/components/ui/use-toast'
// where needed. However, if you plan to add custom logic here, this structure is fine.
