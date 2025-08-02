"use client"

import * as React from "react"
import type { ToastProps, ToastActionElement } from "@radix-ui/react-toast"
import { cva } from "class-variance-authority"
import { X } from "lucide-react"
import { ToasPrimitive } from "@radix-ui/react-toast"
import type { VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const ToastProvider = ToasPrimitive.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToasPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToasPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToasPrimitive.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className,
    )}
    {...props}
  />
))
ToastViewport.displayName = ToasPrimitive.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToasPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToasPrimitive.Root> & VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return <ToasPrimitive.Root ref={ref} className={cn(toastVariants({ variant }), className)} {...props} />
})
Toast.displayName = ToasPrimitive.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToasPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof ToasPrimitive.Action>
>(({ className, ...props }, ref) => (
  <ToasPrimitive.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className,
    )}
    {...props}
  />
))
ToastAction.displayName = ToasPrimitive.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToasPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof ToasPrimitive.Close>
>(({ className, ...props }, ref) => (
  <ToasPrimitive.Close
    ref={ref}
    className={cn(
      "absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400",
      className,
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToasPrimitive.Close>
))
ToastClose.displayName = ToasPrimitive.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToasPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToasPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToasPrimitive.Title ref={ref} className={cn("text-sm font-semibold [&+div]:text-xs", className)} {...props} />
))
ToastTitle.displayName = ToasPrimitive.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToasPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToasPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToasPrimitive.Description ref={ref} className={cn("text-sm opacity-90", className)} {...props} />
))
ToastDescription.displayName = ToasPrimitive.Description.displayName

type Toast = ToastProps & { id: string }

type ToasPrimitiveElement = React.ElementRef<typeof ToasPrimitive.Root>

type ToasPrimitiveProps = React.ComponentPropsWithoutRef<typeof ToasPrimitive.Root>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  type Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
