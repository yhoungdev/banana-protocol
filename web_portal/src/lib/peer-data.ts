export interface PeerDetails {
  id: string
  shortId: string
  status: "online" | "offline" | "syncing"
  location: string
  healthRating: number
  healthStatus: string
  ping: {
    value: number
    unit: string
    change: string
    trend: "positive" | "negative"
  }
  uptime: {
    value: number
    unit: string
    change: string
    trend: "positive" | "negative"
  }
  transfer: {
    value: number
    unit: string
    change: string
    trend: "positive" | "negative"
  }
  storage: {
    allocated: number
    total: number
    unit: string
    utilization: number
  }
  files: PeerFile[]
}

export interface PeerFile {
  id: string
  name: string
  size: string
  type: string
  status: "secure" | "syncing" | "pending"
  version: string
  icon: "data" | "metadata" | "system"
}

export const mockPeerDetails: PeerDetails = {
  id: "8f2a4b7c-9d1e-4f3a-b5c6-7d8e9f0a1b2c3e91",
  shortId: "8f2a...3e91",
  status: "online",
  location: "Frankfurt, DE",
  healthRating: 98.2,
  healthStatus: "Highly Reliable",
  ping: {
    value: 42,
    unit: "ms",
    change: "-5ms (Avg)",
    trend: "positive",
  },
  uptime: {
    value: 99.8,
    unit: "%",
    change: "+0.1%",
    trend: "positive",
  },
  transfer: {
    value: 1.2,
    unit: "TB",
    change: "+24GB",
    trend: "positive",
  },
  storage: {
    allocated: 360,
    total: 500,
    unit: "GB",
    utilization: 72,
  },
  files: [
    {
      id: "file-001",
      name: "frag_8x8_palm_alpha.bin",
      size: "64MB",
      type: "Data Fragment",
      status: "secure",
      version: "Ver. 2.4",
      icon: "data",
    },
    {
      id: "file-002",
      name: "meta_ledger_v2.json",
      size: "12MB",
      type: "Metadata",
      status: "secure",
      version: "Ver. 1.1",
      icon: "metadata",
    },
    {
      id: "file-003",
      name: "payload_x77_redundant.sys",
      size: "128MB",
      type: "System Chunk",
      status: "syncing",
      version: "Ver. 0.9",
      icon: "system",
    },
  ],
}
