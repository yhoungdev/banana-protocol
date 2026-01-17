import { cn } from "@/lib/utils"

interface ProgressBarProps {
  value: number
  max?: number
  className?: string
  showLabel?: boolean
  label?: string
}

export function ProgressBar({ value, max = 100, className, showLabel, label }: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100)

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex items-center justify-between mb-2 text-sm">
          <span className="text-white font-medium">{label}</span>
          <span className="text-[#E5FF00]">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="h-2 bg-[#2A2A2A] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#E5FF00] to-[#B8CC00] rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
