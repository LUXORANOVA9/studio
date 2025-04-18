import { useCoreToast } from '@/components/ui/toast';

/**
 * High-level hook for toast notifications.
 * Returns an object containing `notify` to trigger toasts.
 */
export function useToastHook() {
  return useCoreToast();
}