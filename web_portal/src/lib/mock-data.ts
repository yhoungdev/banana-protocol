import type { FileFragment, NetworkHealth, NodeInfo, Peer, PeerStats } from "./types"

export const mockNodeInfo: NodeInfo = {
  nodeId: "8x-F9...2301",
  storageUsed: 650,
  storageTotal: 1000,
  contributed: 12,
}

export const mockNetworkHealth: NetworkHealth = {
  percentage: 99.8,
  stabilityChange: 0.2,
}

export const mockPeerStats: PeerStats = {
  active: 14,
  disconnected: 1,
}

export const mockPeers: Peer[] = [
  { id: "peer-001", address: "192.168.1.1:8080", location: { lat: 37.7749, lng: -122.4194 }, status: "connected" },
  { id: "peer-002", address: "192.168.1.2:8080", location: { lat: 34.0522, lng: -118.2437 }, status: "connected" },
  { id: "peer-003", address: "192.168.1.3:8080", location: { lat: 40.7128, lng: -74.006 }, status: "connected" },
]

export const mockFiles: FileFragment[] = [
  {
    id: "file-001",
    name: "backup_v04.palm",
    type: "backup",
    size: "1.2GB",
    fragments: { current: 8, total: 10 },
    status: "partial",
    timestamp: "2m ago",
    encrypted: true,
  },
  {
    id: "file-002",
    name: "asset_bundle_09.png",
    type: "image",
    size: "245MB",
    fragments: { current: 10, total: 10 },
    status: "complete",
    timestamp: "1h ago",
    encrypted: true,
  },
  {
    id: "file-003",
    name: "keys_encrypted.txt",
    type: "document",
    size: "1.2KB",
    fragments: { current: 3, total: 10 },
    status: "degraded",
    timestamp: "5h ago",
    encrypted: true,
  },
]
