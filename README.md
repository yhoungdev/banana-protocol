# 🍌 Banana Protocol - Peer-Assisted Local Memory

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
- Losing a few fruits doesn't matter
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

## 🛠️ Tech Stack

- **Language:** Rust
- **Encoding:** Reed–Solomon erasure coding
- **Networking:** QUIC (encrypted, fast)
- **Discovery:** mDNS (automatic local network discovery)
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

🚧 **Active development**

- [x] Pool system with coordinator/member roles
- [x] mDNS-based local network discovery
- [x] QUIC networking layer (secure & fast)
- [x] CLI interface (create-pool, discover-pools, join-pool)
- [ ] Fragment encoding with Reed-Solomon
- [ ] Fragment placement strategy
- [ ] Recovery mechanism

---

## 🛠️ Development & Usage

### Fast Reload - No need to run `cargo run` every time! ⚡

**Recommended: Use the watch script**
```bash
# Create a pool (auto-reloads on code changes)
./watch.sh create

# Discover pools (auto-reloads on code changes)
./watch.sh discover

# Join a pool (auto-reloads on code changes)
./watch.sh join <pool-id> <coordinator-ip:port>

# Run tests (auto-reloads)
./watch.sh test
```

**Alternative: Using Makefile**
```bash
make dev-create       # Create pool with auto-reload
make dev-discover     # Discover pools with auto-reload
make dev-join POOL_ID=<uuid> COORDINATOR=<ip:port>

# Or without auto-reload
make create
make discover
make build
```

**See [DEVELOPMENT.md](DEVELOPMENT.md) for more options (just, cargo-watch, etc.)**

---

### Manual Commands

```bash
# Create a pool
cargo run -- create-pool --name "my-pool" --max-members 10 --port 5000

# Discover pools on local network
cargo run -- discover-pools --timeout 5

# Join an existing pool
cargo run -- join-pool --pool-id <uuid> --coordinator <ip:port>
```

### Build Release Binary
```bash
cargo build --release
./target/release/banana-protocol create-pool
```

---

## 🎯 Quick Example

**Terminal 1 - Start a pool:**
```bash
./watch.sh create
# Output shows pool ID and address
```

**Terminal 2 - Discover it:**
```bash
./watch.sh discover
# Shows all available pools
```

**Terminal 3 - Join it:**
```bash
./watch.sh join <pool-id-from-terminal-1> <address-from-terminal-1>
# Successfully connected!
```

Any code changes in `src/` will auto-rebuild and restart!

---

## 🤝 Contributing

Contributions, ideas, and discussions are welcome.
This project is exploratory and research-driven.

---

## 📚 Documentation

- [DEVELOPMENT.md](DEVELOPMENT.md) - Detailed development setup and workflows
- [Architecture docs](docs/) - Coming soon

---

## 📄 License

MIT (TBD)
