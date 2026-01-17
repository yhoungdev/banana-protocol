import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { PeerDetailsView } from "@/components/peers"
import { mockPeerDetails } from "@/lib/peer-data"

export const Route = createFileRoute("/peers")({
  component: PeersPage,
})

function PeersPage() {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate({ to: "/" })
  }

  return (
    <div className="h-full">
      <PeerDetailsView peer={mockPeerDetails} onBack={handleBack} />
    </div>
  )
}
