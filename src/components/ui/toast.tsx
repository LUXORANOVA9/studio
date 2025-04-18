import * as React from "react"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast" // Corrected path
//import { useToast as useToastOriginal } from "@/hooks/use-toast" // importing here breaks
// as it creates a circular dependency
const ToastDemo = () => {
  //const { toast } = useToastOriginal()
  return (
    <>
      ToasterDemo
    </>
  )
}
export default ToastDemo
export {
  //useToast, // re-exporting here breaks the import
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
}
