import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Settings } from "lucide-react"
import type { Pool } from "@/lib/pool-types"
import { cn } from "@/lib/utils"

interface PoolCardProps {
  pool: Pool
  onClick?: () => void
}

export function PoolCard({ pool, onClick }: PoolCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:border-[#E5FF00]/30",
        pool.status === "healthy" && "border-[#4ADE80]/20"
      )}
      onClick={onClick}
    >
      <div className="relative mb-3">
        <div className="h-20 bg-gradient-to-br from-[#1A2A1A] to-[#0D0D0D] rounded-lg overflow-hidden">
          <svg viewBox="0 0 200 80" className="w-full h-full opacity-50">
            <defs>
              <pattern id="miniGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#2A2A2A" strokeWidth="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#miniGrid)" />
            <path
              d="M 20 50 Q 60 30 100 45 T 180 40"
              fill="none"
              stroke="#4ADE80"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
            <circle cx="20" cy="50" r="3" fill="#4ADE80" />
            <circle cx="100" cy="45" r="3" fill="#E5FF00" />
            <circle cx="180" cy="40" r="3" fill="#4ADE80" />
          </svg>
        </div>
        <Badge
          variant={pool.status === "healthy" ? "success" : pool.status === "degraded" ? "warning" : "danger"}
          className="absolute top-2 right-2 text-[10px]"
        >
          {pool.status === "healthy" ? "● HEALTHY" : pool.status === "degraded" ? "● DEGRADED" : "● OFFLINE"}
        </Badge>
      </div>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-white">{pool.name}</h3>
          <p className="text-xs text-gray-500 font-mono">ID: {pool.id}</p>
        </div>
        <button
          type="button"
          className="p-1.5 text-gray-500 hover:text-white transition-colors"
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <Settings size={16} />
        </button>
      </div>
      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#2A2A2A]">
        <div>
          <p className="text-[10px] text-gray-500 uppercase">Peers</p>
          <p className="text-sm font-medium text-white">{pool.peers} Active</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-500 uppercase">Storage</p>
          <p className="text-sm font-medium text-white">{pool.storage}</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-500 uppercase">My Health</p>
          <p className="text-sm font-medium text-[#4ADE80]">{pool.health}%</p>
        </div>
      </div>
    </Card>
  )
}

interface PoolListProps {
  pools: Pool[]
  onPoolClick?: (pool: Pool) => void
  onViewAll?: () => void
}

export function PoolList({ pools, onPoolClick, onViewAll }: PoolListProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-white">Active Pools</h2>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs text-[#E5FF00] hover:underline"
        >
          View All
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {pools.map((pool) => (
          <PoolCard key={pool.id} pool={pool} onClick={() => onPoolClick?.(pool)} />
        ))}
      </div>
    </div>
  )
}
