"use client"

import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "gold" | "whatsapp"
  size?: "sm" | "md" | "lg"
  asChild?: boolean
}

export function Button({
  variant = "primary",
  size = "md",
  asChild = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center gap-2 font-[var(--font-montserrat)] font-medium tracking-widest uppercase transition-all duration-300 cursor-pointer",
        {
          "text-xs": size === "sm",
          "text-xs md:text-sm": size === "md",
          "text-sm md:text-base": size === "lg",
        },
        {
          "px-6 py-2.5": size === "sm",
          "px-8 py-3.5": size === "md",
          "px-10 py-4": size === "lg",
        },
        {
          "bg-[#1A1A1A] text-white hover:bg-[#3D3D3D]": variant === "primary",
          "border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white": variant === "outline",
          "text-[#1A1A1A] hover:text-[#C9A96E]": variant === "ghost",
          "bg-[#C9A96E] text-white hover:bg-[#A8864F]": variant === "gold",
          "bg-[#25D366] text-white hover:bg-[#1FAD54]": variant === "whatsapp",
        },
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}
