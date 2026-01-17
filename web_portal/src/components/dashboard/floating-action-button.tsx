import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface FloatingActionButtonProps {
  onClick?: () => void
  className?: string
}

export function FloatingActionButton({ onClick, className }: FloatingActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "fixed bottom-24 right-4 md:bottom-6 md:right-6 w-14 h-14 rounded-full",
        "bg-[#E5FF00] text-black shadow-lg shadow-[#E5FF00]/20",
        "flex items-center justify-center",
        "hover:bg-[#D4EE00] active:scale-95 transition-all",
        className
      )}
    >
      <Plus size={24} strokeWidth={2.5} />
    </button>
  )
}
