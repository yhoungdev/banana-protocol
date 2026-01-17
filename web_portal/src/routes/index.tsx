import { useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import {
  PoolsHeader,
  PoolStatsHeader,
  PoolActions,
  PoolList,
  JoinPoolDrawer,
} from "@/components/pools"
import { mockPoolStats, mockPools, mockNearbyPools } from "@/lib/pool-mock-data"
import type { Pool, NearbyPool } from "@/lib/pool-types"

export const Route = createFileRoute("/")({
  component: PoolsPage,
})

function PoolsPage() {
  const [joinDrawerOpen, setJoinDrawerOpen] = useState(false)

  const handleCreatePool = () => {
    console.log("Create pool")
  }

  const handleJoinPool = () => {
    setJoinDrawerOpen(true)
  }

  const handlePoolClick = (pool: Pool) => {
    console.log("Pool clicked:", pool.id)
  }

  const handleJoinConfirm = (inviteString: string) => {
    console.log("Join with invite:", inviteString)
  }

  const handleConnectNearby = (pool: NearbyPool) => {
    console.log("Connect to nearby pool:", pool.id)
  }

  return (
    <div className="flex flex-col min-h-full">
      <PoolsHeader />
      <div className="flex-1 overflow-auto">
        <div className="p-4 flex flex-col gap-4">
          <PoolStatsHeader
            totalAggregated={mockPoolStats.totalAggregated}
            aggregatedChange={mockPoolStats.aggregatedChange}
            activePeers={mockPoolStats.activePeers}
            peersOnline={mockPoolStats.peersOnline}
          />
          <PoolActions onCreatePool={handleCreatePool} onJoinPool={handleJoinPool} />
          <PoolList pools={mockPools} onPoolClick={handlePoolClick} />
        </div>
      </div>
      <JoinPoolDrawer
        open={joinDrawerOpen}
        onOpenChange={setJoinDrawerOpen}
        nearbyPools={mockNearbyPools}
        onJoin={handleJoinConfirm}
        onConnectNearby={handleConnectNearby}
      />
    </div>
  )
}
