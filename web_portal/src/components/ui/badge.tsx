import { cn } from "@/lib/utils"

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "success" | "warning" | "danger" | "outline"
  className?: string
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    default: "bg-[#2A2A2A] text-gray-300",
    success: "bg-[#4ADE80]/20 text-[#4ADE80]",
    warning: "bg-[#E5FF00]/20 text-[#E5FF00]",
    danger: "bg-[#F87171]/20 text-[#F87171]",
    outline: "border border-[#E5FF00] text-[#E5FF00] bg-transparent",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
