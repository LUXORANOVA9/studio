import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";

export function useToast() {
  const context = React.useContext(ToastPrimitives.ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}
