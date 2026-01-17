export interface NodeInfo {
  nodeId: string
  storageUsed: number
  storageTotal: number
  contributed: number
}

export interface NetworkHealth {
  percentage: number
  stabilityChange: number
}

export interface PeerStats {
  active: number
  disconnected: number
}

export interface Peer {
  id: string
  address: string
  location: {
    lat: number
    lng: number
  }
  status: "connected" | "disconnected"
}

export interface FileFragment {
  id: string
  name: string
  type: "backup" | "image" | "document"
  size: string
  fragments: {
    current: number
    total: number
  }
  status: "complete" | "partial" | "degraded"
  timestamp: string
  encrypted: boolean
}
