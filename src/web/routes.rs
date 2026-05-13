use axum::{extract::State, response::Json};
use serde_json::{Value, json};
use std::sync::Arc;

use crate::helpers::misc::format_storage;

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
