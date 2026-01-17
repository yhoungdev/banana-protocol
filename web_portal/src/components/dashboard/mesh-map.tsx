import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface MeshMapProps {
  nodeId: string
  peerLocations?: { lat: number; lng: number }[]
}

export function MeshMap({ nodeId, peerLocations = [] }: MeshMapProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-white">Local Mesh Map</h3>
        <Badge variant="outline" className="text-[10px]">
          LIVE
        </Badge>
      </div>
      <Card className="relative overflow-hidden h-48 md:h-64">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A2A1A] to-[#1A1A1A]">
          <svg viewBox="0 0 400 200" className="w-full h-full opacity-30">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#2A2A2A" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 400 200" className="w-full h-full">
              <path
                d="M 80 100 Q 200 60 320 140"
                fill="none"
                stroke="#4ADE80"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="animate-pulse"
              />
              <circle cx="80" cy="100" r="6" fill="#4ADE80" />
              <circle cx="200" cy="80" r="6" fill="#E5FF00" />
              <circle cx="320" cy="140" r="6" fill="#4ADE80" />
              <circle cx="80" cy="100" r="12" fill="#4ADE80" fillOpacity="0.2" />
              <circle cx="200" cy="80" r="12" fill="#E5FF00" fillOpacity="0.2" />
              <circle cx="320" cy="140" r="12" fill="#4ADE80" fillOpacity="0.2" />
            </svg>
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <p className="text-xs text-gray-400">San Francisco</p>
          </div>
        </div>
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
          <span className="text-xs text-gray-400 font-mono">NODE_ID: {nodeId}</span>
        </div>
      </Card>
    </div>
  )
}
