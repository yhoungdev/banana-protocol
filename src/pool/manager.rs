use super::{Pool, PoolConfig};
use super::discovery::{PoolDiscovery, DiscoveredPool};
use super::network::{PoolNetwork, PoolMessage};
use super::membership::PoolMembership;
use std::net::{SocketAddr, IpAddr, Ipv4Addr};
use std::sync::Arc;
use std::time::Duration;
use tokio::sync::{mpsc, RwLock};
use uuid::Uuid;

pub struct PoolManager {
    pool: Arc<RwLock<Pool>>,
    network: Arc<RwLock<PoolNetwork>>,
    discovery: Arc<PoolDiscovery>,
    membership: Option<Arc<PoolMembership>>,
    message_tx: mpsc::Sender<PoolMessage>,
    message_rx: Arc<RwLock<mpsc::Receiver<PoolMessage>>>,
}

impl PoolManager {
    
    pub async fn create_pool(
        config: PoolConfig,
    ) -> Result<Self, Box<dyn std::error::Error>> {
        let bind_addr = SocketAddr::new(IpAddr::V4(Ipv4Addr::UNSPECIFIED), config.port);
        let network = PoolNetwork::new(bind_addr).await?;
        let local_addr = network.local_addr()?;

        let pool = Pool::new_coordinator(config.clone(), local_addr);
        let discovery = PoolDiscovery::new()?;

        
        discovery.broadcast_pool(
            pool.id,
            &config.name,
            config.port,
            pool.member_count(),
            config.max_members,
        )?;

        let (tx, rx) = mpsc::channel(100);

        
        let membership = PoolMembership::new(
            format!("node-{}", pool.id),
            local_addr,
        ).await.ok().map(Arc::new);

        Ok(Self {
            pool: Arc::new(RwLock::new(pool)),
            network: Arc::new(RwLock::new(network)),
            discovery: Arc::new(discovery),
            membership,
            message_tx: tx,
            message_rx: Arc::new(RwLock::new(rx)),
        })
    }

    
    pub async fn join_pool(
        pool_id: Uuid,
        coordinator_addr: SocketAddr,
        config: PoolConfig,
    ) -> Result<Self, Box<dyn std::error::Error>> {
        let bind_addr = SocketAddr::new(IpAddr::V4(Ipv4Addr::UNSPECIFIED), 0);
        let mut network = PoolNetwork::new(bind_addr).await?;
        let local_addr = network.local_addr()?;

        
        network.connect(coordinator_addr).await?;

        let pool = Pool::new_member(pool_id, config, local_addr, coordinator_addr);
        let discovery = PoolDiscovery::new()?;

        let (tx, rx) = mpsc::channel(100);

        
        let membership = PoolMembership::new(
            format!("node-{}", Uuid::new_v4()),
            local_addr,
        ).await.ok();

        if let Some(ref membership) = membership {
            membership.join(vec![coordinator_addr.to_string()]).await?;
        }

        Ok(Self {
            pool: Arc::new(RwLock::new(pool)),
            network: Arc::new(RwLock::new(network)),
            discovery: Arc::new(discovery),
            membership: membership.map(Arc::new),
            message_tx: tx,
            message_rx: Arc::new(RwLock::new(rx)),
        })
    }

    
    pub async fn discover_pools(
        timeout_secs: u64,
    ) -> Result<Vec<DiscoveredPool>, Box<dyn std::error::Error>> {
        let discovery = PoolDiscovery::new()?;
        discovery.discover_pools(Duration::from_secs(timeout_secs)).await
    }

    
    pub async fn start_listening(&self) -> Result<(), Box<dyn std::error::Error>> {
        let pool = self.pool.read().await;
        if !pool.is_coordinator() {
            return Err("Only coordinator can listen for connections".into());
        }
        drop(pool);

        let network = self.network.clone();
        let pool = self.pool.clone();
        let tx = self.message_tx.clone();

        tokio::spawn(async move {
            loop {
                let conn = {
                    let mut net = network.write().await;
                    match net.accept_connection().await {
                        Ok(c) => c,
                        Err(e) => {
                            log::error!("Failed to accept connection: {}", e);
                            return;
                        }
                    }
                };

                let remote_addr = conn.remote_address();
                {
                    let mut p = pool.write().await;
                    if let Err(e) = p.add_member(remote_addr) {
                        log::warn!("Failed to add member {}: {}", remote_addr, e);
                        continue;
                    }
                    log::info!("New member joined: {}", remote_addr);
                }
                let _ = tx.send(PoolMessage::Join { addr: remote_addr }).await;
            }
        });

        Ok(())
    }

    
    pub async fn broadcast(&self, data: Vec<u8>) -> Result<(), Box<dyn std::error::Error>> {
        let network = self.network.read().await;
        network.broadcast(&data).await
    }

    
    pub async fn pool_info(&self) -> Pool {
        self.pool.read().await.clone()
    }

    
    pub async fn get_members(&self) -> Vec<SocketAddr> {
        self.pool.read().await.members.clone()
    }

    
    pub async fn shutdown(&self) {
        let pool = self.pool.read().await;
        self.discovery.stop_broadcast(pool.id, &pool.config.name);

        if let Some(ref membership) = self.membership {
            let _ = membership.leave(1000).await;
        }
    }
}

impl Clone for Pool {
    fn clone(&self) -> Self {
        Self {
            id: self.id,
            config: self.config.clone(),
            role: self.role,
            local_addr: self.local_addr,
            members: self.members.clone(),
        }
    }
}
