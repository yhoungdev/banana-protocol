import { Card } from "@/components/ui/card"
import { ProgressRing } from "@/components/ui/progress-ring"

interface StorageCardProps {
  used: number
  total: number
}

export function StorageCard({ used, total }: StorageCardProps) {
  const percentage = Math.round((used / total) * 100)

  return (
    <Card glow className="flex flex-col items-center py-8">
      <ProgressRing value={percentage} size={180} strokeWidth={10} />
      <div className="flex items-center justify-center gap-12 mt-6">
        <div className="text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wider">Used</p>
          <p className="text-xl font-bold text-white">{used}GB</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wider">Available</p>
          <p className="text-xl font-bold text-white">{total - used}GB</p>
        </div>
      </div>
    </Card>
  )
}
