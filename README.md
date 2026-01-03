# 🍌Banana Protocol - Peer-Assisted Local Memory

**PALM** is a purely peer-to-peer, local-first distributed storage system that allows devices within the same network to pool disk resources and store large data objects **without centralized servers**.

Data is fragmented using **threshold-based encoding** and distributed across multiple nodes such that **no single node can reconstruct the original data alone**. As long as a minimum number of fragments remain accessible, the data can always be recovered — even in the presence of node churn or partial network failure.

---

##  Key Features

- **Pure P2P (No Central Server)**  
  Every node is equal. No coordinators, no single point of failure.

- **Local-First Storage**  
  Optimized for LANs, campuses, communities, and offline-friendly environments.

- **Threshold-Based Encoding (k-of-n)**  
  Files are split into `n` fragments; any `k` fragments can reconstruct the original file.

- **Privacy by Design**  
  Individual fragments are meaningless on their own.

- **Fault Tolerant**  
  Tolerates node failures, disconnects, and churn.

- **Bandwidth Efficient**  
  Uses local network speeds instead of cloud round-trips.

---

## Conceptual Overview

Think of PALM like a **palm fruit bunch**:

- The **entire bunch** represents the original file  
- Each **fruit** is a data fragment  
- Losing a few fruits doesn’t matter  
- You only need *enough* fruits to extract the oil (recover the file)

No single fruit tells you anything useful on its own.

---

## How It Works

### 1. Fragmentation
- A file is split and encoded into `n` fragments using erasure coding.
- A threshold `k` is chosen such that `k ≤ n`.

### 2. Distribution
- Fragments are distributed across different peers in the local network.
- Placement is decentralized and adaptive.

### 3. Storage
- Each peer stores fragments contributed by other peers.
- No peer holds enough data to reconstruct the file alone.

### 4. Recovery
- When a file is requested, the node fetches fragments from peers.
- Once `k` valid fragments are collected, the file is reconstructed.

---

## 📐 Architecture (High Level)

- No master node  
- No global index  
- Discovery happens locally  

---

## 🛠️ Tech Stack (Planned)

- **Language:** Rust  
- **Encoding:** Reed–Solomon / Fountain Codes  
- **Networking:** QUIC / TCP / UDP (TBD)  
- **Discovery:** mDNS / gossip-based peer discovery  
- **Storage:** Content-addressed fragments  

---

## 🚀 Use Cases

- Local campus or community storage
- Disaster-resilient data sharing
- Low-bandwidth or offline environments
- Edge computing clusters
- Research & distributed systems learning

---

## 🆚 Similar Systems

| System       | Difference                         |
|--------------|------------------------------------|
| IPFS         | Internet-oriented, global           |
| Storj        | Central coordination                |
| Tahoe-LAFS   | Heavier setup                       |
| **PALM**     | Local-first, lightweight, no servers|

---

## 📍 Project Status

🚧 **Early design / prototype phase**

- [ ] Fragment encoding  
- [ ] Local peer discovery  
- [ ] Fragment placement strategy  
- [ ] Recovery mechanism  
- [ ] CLI interface  

---

## 🤝 Contributing

Contributions, ideas, and discussions are welcome.  
This project is exploratory and research-driven.




