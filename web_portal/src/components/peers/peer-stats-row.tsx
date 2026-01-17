import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Gauge, Clock, ArrowUpDown } from "lucide-react"

interface StatItemProps {
  icon: "ping" | "uptime" | "transfer"
  label: string
  value: string | number
  unit: string
  change: string
  trend: "positive" | "negative"
}

const iconMap = {
  ping: Gauge,
  uptime: Clock,
  transfer: ArrowUpDown,
}

export function StatItem({ icon, label, value, unit, change, trend }: StatItemProps) {
  const Icon = iconMap[icon]

  return (
    <Card className="flex-1 p-3">
      <div className="flex items-center gap-1.5 mb-2">
        <Icon size={14} className="text-[#E5FF00]" />
        <span className="text-[10px] text-gray-500 uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p className="text-xl font-bold text-white">
        {value}
        <span className="text-sm text-gray-400">{unit}</span>
      </p>
      <p
        className={cn(
          "text-[10px] mt-0.5",
          trend === "positive" ? "text-[#4ADE80]" : "text-[#F87171]"
        )}
      >
        {change}
      </p>
    </Card>
  )
}

interface PeerStatsRowProps {
  ping: { value: number; unit: string; change: string; trend: "positive" | "negative" }
  uptime: { value: number; unit: string; change: string; trend: "positive" | "negative" }
  transfer: { value: number; unit: string; change: string; trend: "positive" | "negative" }
}

export function PeerStatsRow({ ping, uptime, transfer }: PeerStatsRowProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <StatItem
        icon="ping"
        label="Ping"
        value={ping.value}
        unit={ping.unit}
        change={ping.change}
        trend={ping.trend}
      />
      <StatItem
        icon="uptime"
        label="Uptime"
        value={uptime.value}
        unit={uptime.unit}
        change={uptime.change}
        trend={uptime.trend}
      />
      <StatItem
        icon="transfer"
        label="Transfer"
        value={transfer.value}
        unit={transfer.unit}
        change={transfer.change}
        trend={transfer.trend}
      />
    </div>
  )
}
