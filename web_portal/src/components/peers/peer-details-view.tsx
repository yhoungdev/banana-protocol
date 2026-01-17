import { ChevronLeft, Share2, Copy } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { PeerAvatar } from "./peer-avatar"
import { HealthRatingCard } from "./health-rating-card"
import { PeerStatsRow } from "./peer-stats-row"
import { StorageContributionCard } from "./storage-contribution-card"
import { PeerActions } from "./peer-actions"
import { PeerFilesList } from "./peer-files-list"
import type { PeerDetails } from "@/lib/peer-data"

interface PeerDetailsViewProps {
  peer: PeerDetails
  onBack?: () => void
  onShare?: () => void
}

export function PeerDetailsView({ peer, onBack, onShare }: PeerDetailsViewProps) {
  const handleCopyId = () => {
    navigator.clipboard.writeText(peer.id)
  }

  return (
    <div className="flex flex-col min-h-full">
      <header className="flex items-center justify-between px-4 py-3 border-b border-[#2A2A2A]">
        <button
          type="button"
          onClick={onBack}
          className="p-2 -ml-2 text-white hover:text-[#E5FF00] transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-semibold text-white">Peer Details</h1>
        <button
          type="button"
          onClick={onShare}
          className="p-2 -mr-2 text-white hover:text-[#E5FF00] transition-colors"
        >
          <Share2 size={20} />
        </button>
      </header>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        <div className="flex flex-col items-center py-4">
          <PeerAvatar status={peer.status} size="lg" />
          <div className="flex items-center gap-2 mt-4">
            <h2 className="text-xl font-bold text-white">{peer.shortId}</h2>
            <button
              type="button"
              onClick={handleCopyId}
              className="text-[#E5FF00] hover:text-[#D4EE00] transition-colors"
            >
              <Copy size={16} />
            </button>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="success" className="text-[10px]">
              {peer.status.charAt(0).toUpperCase() + peer.status.slice(1)}
            </Badge>
            <span className="text-xs text-gray-400">{peer.location}</span>
          </div>
        </div>

        <HealthRatingCard rating={peer.healthRating} status={peer.healthStatus} />

        <PeerStatsRow
          ping={peer.ping}
          uptime={peer.uptime}
          transfer={peer.transfer}
        />

        <StorageContributionCard
          allocated={peer.storage.allocated}
          total={peer.storage.total}
          unit={peer.storage.unit}
          utilization={peer.storage.utilization}
        />

        <PeerActions />

        <PeerFilesList files={peer.files} />
      </div>
    </div>
  )
}
