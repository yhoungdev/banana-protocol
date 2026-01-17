import { createFileRoute } from "@tanstack/react-router"
import {
  StorageCard,
  StatsRow,
  MeshMap,
  RecentFiles,
  FloatingActionButton,
} from "@/components/dashboard"
import { mockNodeInfo, mockNetworkHealth, mockPeerStats, mockFiles } from "@/lib/mock-data"

export const Route = createFileRoute("/files")({
  component: FilesPage,
})

function FilesPage() {
  return (
    <div className="flex flex-col min-h-full">
      <div className="p-4 md:p-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StorageCard
                used={mockNodeInfo.storageUsed}
                total={mockNodeInfo.storageTotal}
              />
              <div className="flex flex-col gap-3">
                <StatsRow
                  networkHealth={mockNetworkHealth.percentage}
                  stabilityChange={mockNetworkHealth.stabilityChange}
                  activePeers={mockPeerStats.active}
                  disconnected={mockPeerStats.disconnected}
                />
              </div>
            </div>
            <MeshMap nodeId={mockNodeInfo.nodeId} />
          </div>
          <div className="lg:col-span-1">
            <RecentFiles files={mockFiles} />
          </div>
        </div>
      </div>
      <FloatingActionButton />
    </div>
  )
}
