import { Card } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  label: string
  value: string
  change?: number
  changeLabel?: string
}

export function StatsCard({ label, value, change, changeLabel }: StatsCardProps) {
  const isPositive = change && change > 0

  return (
    <Card className="flex-1 min-w-0">
      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-xl font-bold text-white">{value}</p>
      {change !== undefined && (
        <p className={cn(
          "text-xs mt-1 flex items-center gap-1",
          isPositive ? "text-[#4ADE80]" : "text-gray-500"
        )}>
          {isPositive && <TrendingUp size={12} />}
          {isPositive ? "+" : ""}{change}{changeLabel}
        </p>
      )}
    </Card>
  )
}

interface PoolStatsHeaderProps {
  totalAggregated: string
  aggregatedChange: number
  activePeers: number
  peersOnline: number
}

export function PoolStatsHeader({ totalAggregated, aggregatedChange, activePeers, peersOnline }: PoolStatsHeaderProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <StatsCard
        label="Total Aggregated"
        value={totalAggregated}
        change={aggregatedChange}
        changeLabel="%"
      />
      <StatsCard
        label="Active Peers"
        value={String(activePeers)}
        change={peersOnline}
        changeLabel=" online"
      />
    </div>
  )
}
