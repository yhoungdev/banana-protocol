# Banana Protocol (PALM)

## Overview

**Banana Protocol (PALM)** is an experimental, local-first distributed storage system written in **Rust**. It enables devices on the same local network to pool disk storage and share files securely without relying on central servers or global cloud infrastructure.

---

## Key Features & Architecture

* **Pure Peer-to-Peer:** Operates without master nodes, central servers, or global indices.
* **Threshold Encoding (k-of-n):** Files are split into `n` erasure-coded fragments. Reconstructing the original file requires collecting any `k` fragments.
* **Privacy & Fault Tolerance:** Individual fragments contain no usable data on their own. The system tolerates node churn or network disconnects as long as at least `k` fragments remain accessible.
* **Local-First & Bandwidth Efficient:** Designed for local network speeds (LANs, campuses, offline environments) rather than internet-wide round trips.

---

## Technical Stack

* **Language:** Rust
* **Encoding:** Reed-Solomon erasure coding
* **Networking:** QUIC protocol
* **Discovery:** mDNS (automatic local network discovery)
* **Storage:** Content-addressed fragments

---

## Comparison with Similar Systems

| System | Key Difference |
| :--- | :--- |
| **IPFS** | Internet-oriented, global scope |
| **Storj** | Requires central coordination |
| **Tahoe-LAFS** | Heavier setup process |
| **PALM** | Local-first, lightweight, zero servers |

---

## Project Status

### Completed Features
* Pool management with coordinator and member roles
* mDNS-based local network discovery
* QUIC networking layer
* Basic CLI interface (`create-pool`, `discover-pools`, `join-pool`)

### Planned Features
* Reed-Solomon fragment encoding
* Fragment placement strategy
* Data recovery mechanism
