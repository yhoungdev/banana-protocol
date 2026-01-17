use serde::{Deserialize, Serialize};
use std::sync::Arc;
use tokio::sync::RwLock;

#[derive(Clone)]
pub struct AppState {
    pub node_info: Arc<RwLock<NodeInfo>>,
    pub peers: Arc<RwLock<Vec<PeerInfo>>>,
    pub pools: Arc<RwLock<Vec<PoolInfo>>>,
}

impl AppState {
    pub fn new() -> Self {
        Self {
            node_info: Arc::new(RwLock::new(NodeInfo::default())),
            peers: Arc::new(RwLock::new(Vec::new())),
            pools: Arc::new(RwLock::new(Vec::new())),
        }
    }
}

impl Default for AppState {
    fn default() -> Self {
        Self::new()
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct NodeInfo {
    pub node_id: String,
    pub storage_used: u64,
    pub storage_total: u64,
    pub contributed: u64,
    pub status: String,
}

impl Default for NodeInfo {
    fn default() -> Self {
        Self {
            node_id: uuid::Uuid::new_v4().to_string(),
            storage_used: 0,
            storage_total: 1000,
            contributed: 0,
            status: "online".to_string(),
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct PeerInfo {
    pub id: String,
    pub short_id: String,
    pub address: String,
    pub location: String,
    pub status: String,
    pub health_rating: f64,
    pub ping: u32,
    pub uptime: f64,
    pub storage_allocated: u64,
    pub storage_total: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct PoolInfo {
    pub id: String,
    pub name: String,
    pub members: usize,
    pub max_members: usize,
    pub storage: u64,
    pub health: f64,
    pub status: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct NetworkStats {
    pub total_aggregated: String,
    pub active_peers: usize,
    pub network_health: f64,
}
