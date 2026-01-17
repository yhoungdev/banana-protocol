import { cn } from "@/lib/utils"
import type { ReactNode, MouseEventHandler } from "react"

interface CardProps {
  children: ReactNode
  className?: string
  glow?: boolean
  onClick?: MouseEventHandler<HTMLDivElement>
}

export function Card({ children, className, glow, onClick }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] p-4",
        glow && "border-[#E5FF00]/30",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps {
  children: ReactNode
  className?: string
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return <div className={cn("mb-4", className)}>{children}</div>
}

interface CardTitleProps {
  children: ReactNode
  className?: string
}

export function CardTitle({ children, className }: CardTitleProps) {
  return <h3 className={cn("text-sm font-medium text-gray-400 uppercase tracking-wider", className)}>{children}</h3>
}

interface CardContentProps {
  children: ReactNode
  className?: string
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn(className)}>{children}</div>
}
