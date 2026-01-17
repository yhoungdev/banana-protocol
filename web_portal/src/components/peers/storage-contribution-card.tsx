import { Card } from "@/components/ui/card"
import { Database } from "lucide-react"

interface StorageContributionCardProps {
  allocated: number
  total: number
  unit: string
  utilization: number
}

export function StorageContributionCard({
  allocated,
  total,
  unit,
  utilization,
}: StorageContributionCardProps) {
  const percentage = (allocated / total) * 100

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-white">Storage Contribution</h3>
        <Database size={18} className="text-[#E5FF00]" />
      </div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-400">Disk Space Allocated</span>
        <span className="text-sm">
          <span className="text-[#E5FF00] font-semibold">
            {allocated}
            {unit}
          </span>
          <span className="text-gray-500"> / {total}{unit}</span>
        </span>
      </div>
      <div className="h-2 bg-[#2A2A2A] rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-gradient-to-r from-[#E5FF00] to-[#B8CC00] rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-gray-500">Node utilization active</span>
        <span className="text-[10px] text-gray-400">{utilization}% Full</span>
      </div>
    </Card>
  )
}
