"use client"

import * as React from "react"
import { OTPInput, Slot, type OTPInputProps } from "input-otp"
import { Minus } from "lucide-react"

import { cn } from "@/lib/utils"

const InputOTP = React.forwardRef<React.ElementRef<typeof OTPInput>, OTPInputProps>(
  ({ className, containerClassName, ...props }, ref) => (
    <OTPInput
      ref={ref}
      containerClassName={cn("flex items-center gap-2 has-[:disabled]:opacity-50", containerClassName)}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  ),
)
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex items-center", className)} {...props} />,
)
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot> & { index: number }
>(({ index, className, ...props }, ref) => (
  <Slot
    ref={ref}
    index={index}
    className={cn(
      "relative flex h-10 w-10 items-center justify-center border border-input text-sm ring-offset-background transition-all has-[[data-slot-index]]:z-10 has-[[data-slot-index][data-filled]]:bg-accent has-[[data-slot-index][data-selected]]:bg-accent has-[[data-slot-index][data-highlighted]]:bg-accent has-[[data-slot-index][data-selected]]:ring-ring has-[[data-slot-index][data-highlighted]]:ring-ring has-[[data-slot-index][data-selected]]:ring-offset-background has-[[data-slot-index][data-highlighted]]:ring-offset-background focus-within:z-10 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 data-[filled=true]:bg-background data-[state=active]:border-primary data-[state=active]:ring-2 data-[state=active]:ring-ring data-[state=active]:ring-offset-background",
      className,
    )}
    {...props}
  >
    {props.children}
  </Slot>
))
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center justify-center", className)} {...props}>
      <Minus />
    </div>
  ),
)
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
