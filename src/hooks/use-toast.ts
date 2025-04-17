'use client'

import * as React from "react"

import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export function ToastDemo() {
  const { toast } = useToast()

  return (
    <>
      <span>Add to portfolio</span>
    </>
  )
}
