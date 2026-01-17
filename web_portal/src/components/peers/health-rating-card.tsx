import { Card } from "@/components/ui/card"
import { CircleCheck } from "lucide-react"

interface HealthRatingCardProps {
  rating: number
  status: string
}

export function HealthRatingCard({ rating, status }: HealthRatingCardProps) {
  const percentage = rating
  const circumference = 2 * Math.PI * 36
  const offset = circumference - (percentage / 100) * circumference

  return (
    <Card className="p-4">
      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">
        Health Rating
      </p>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold text-white">
            {rating}
            <span className="text-gray-500">/100</span>
          </p>
          <p className="text-xs text-[#4ADE80] flex items-center gap-1 mt-1">
            <span>📈</span> {status}
          </p>
        </div>
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 -rotate-90" viewBox="0 0 80 80">
            <circle
              cx="40"
              cy="40"
              r="36"
              strokeWidth="6"
              stroke="#2A2A2A"
              fill="none"
            />
            <circle
              cx="40"
              cy="40"
              r="36"
              strokeWidth="6"
              stroke="#E5FF00"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <CircleCheck size={24} className="text-[#E5FF00]" />
          </div>
        </div>
      </div>
    </Card>
  )
}
