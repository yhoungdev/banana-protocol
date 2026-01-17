import { Card } from "@/components/ui/card"
import { Wifi, Snowflake } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  subtitle: string
  icon: "network" | "peers"
  trend?: "positive" | "negative"
}

export function StatCard({ title, value, subtitle, icon, trend }: StatCardProps) {
  const Icon = icon === "network" ? Wifi : Snowflake

  return (
    <Card className="flex-1">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs text-gray-500 uppercase tracking-wider">{title}</span>
        <Icon size={18} className="text-[#E5FF00]" />
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p
        className={cn(
          "text-xs mt-1",
          trend === "positive" && "text-[#4ADE80]",
          trend === "negative" && "text-[#F87171]",
          !trend && "text-gray-500"
        )}
      >
        {subtitle}
      </p>
    </Card>
  )
}

interface StatsRowProps {
  networkHealth: number
  stabilityChange: number
  activePeers: number
  disconnected: number
}

export function StatsRow({ networkHealth, stabilityChange, activePeers, disconnected }: StatsRowProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <StatCard
        title="Network Health"
        value={`${networkHealth}%`}
        subtitle={`+${stabilityChange}% Stability`}
        icon="network"
        trend="positive"
      />
      <StatCard
        title="Active Nodes"
        value={`${activePeers} Peers`}
        subtitle={`-${disconnected} Disconnected`}
        icon="peers"
        trend="negative"
      />
    </div>
  )
}
