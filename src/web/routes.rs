use axum::{extract::State, response::Json};
use serde_json::{json, Value};
use std::sync::Arc;

use super::state::{AppState, NetworkStats, NodeInfo, PeerInfo, PoolInfo};

pub async fn get_node_info(State(state): State<Arc<AppState>>) -> Json<NodeInfo> {
    let node_info = state.node_info.read().await;
    Json(node_info.clone())
}

pub async fn get_peers(State(state): State<Arc<AppState>>) -> Json<Vec<PeerInfo>> {
    let peers = state.peers.read().await;
    Json(peers.clone())
}

pub async fn get_pools(State(state): State<Arc<AppState>>) -> Json<Vec<PoolInfo>> {
    let pools = state.pools.read().await;
    Json(pools.clone())
}

pub async fn get_network_stats(State(state): State<Arc<AppState>>) -> Json<NetworkStats> {
    let peers = state.peers.read().await;
    let pools = state.pools.read().await;

    let total_storage: u64 = pools.iter().map(|p| p.storage).sum();
    let total_aggregated = format_storage(total_storage);

    Json(NetworkStats {
        total_aggregated,
        active_peers: peers.len(),
        network_health: 99.8,
    })
}

pub async fn health_check() -> Json<Value> {
    Json(json!({
        "status": "ok",
        "version": env!("CARGO_PKG_VERSION")
    }))
}

fn format_storage(bytes: u64) -> String {
    const TB: u64 = 1_099_511_627_776;
    const GB: u64 = 1_073_741_824;
    const MB: u64 = 1_048_576;

    if bytes >= TB {
        format!("{:.1} TB", bytes as f64 / TB as f64)
    } else if bytes >= GB {
        format!("{:.1} GB", bytes as f64 / GB as f64)
    } else {
        format!("{:.1} MB", bytes as f64 / MB as f64)
    }
}
