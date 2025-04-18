import * as React from "react";
import { ToastContext, useToast } from "@/components/ui/toast"
export  function useToast2() {
  const context = React.useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}
