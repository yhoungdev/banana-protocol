use mdns_sd::{ServiceDaemon, ServiceEvent};
use std::net::IpAddr;
use std::time::Duration;
use tokio::sync::mpsc;
use uuid::Uuid;

const SERVICE_TYPE: &str = "_banana-pool._udp.local.";

#[derive(Debug, Clone)]
pub struct DiscoveredPool {
    pub id: Uuid,
    pub name: String,
    pub addr: IpAddr,
    pub port: u16,
    pub members: usize,
    pub max_members: usize,
}

pub struct PoolDiscovery {
    daemon: ServiceDaemon,
}

impl PoolDiscovery {
    pub fn new() -> Result<Self, Box<dyn std::error::Error>> {
        let daemon = ServiceDaemon::new()?;
        Ok(Self { daemon })
    }

    
    pub fn broadcast_pool(
        &self,
        pool_id: Uuid,
        name: &str,
        port: u16,
        members: usize,
        max_members: usize,
    ) -> Result<(), Box<dyn std::error::Error>> {
        let instance_name = format!("{}_{}", name, pool_id);

        let mut properties = std::collections::HashMap::new();
        properties.insert("pool_id".to_string(), pool_id.to_string());
        properties.insert("name".to_string(), name.to_string());
        properties.insert("members".to_string(), members.to_string());
        properties.insert("max_members".to_string(), max_members.to_string());

        let service_info = mdns_sd::ServiceInfo::new(
            SERVICE_TYPE,
            &instance_name,
            "local.",
            "",
            port,
            properties,
        )?;

        self.daemon.register(service_info)?;
        Ok(())
    }

    
    pub async fn discover_pools(
        &self,
        timeout: Duration,
    ) -> Result<Vec<DiscoveredPool>, Box<dyn std::error::Error>> {
        let (tx, mut rx) = mpsc::channel(32);
        let receiver = self.daemon.browse(SERVICE_TYPE)?;

        
        let tx_clone = tx.clone();
        tokio::spawn(async move {
            while let Ok(event) = receiver.recv_async().await {
                let _ = tx_clone.send(event).await;
            }
        });

        let mut pools = Vec::new();
        let start = std::time::Instant::now();

        while start.elapsed() < timeout {
            match tokio::time::timeout(Duration::from_millis(100), rx.recv()).await {
                Ok(Some(event)) => {
                    if let ServiceEvent::ServiceResolved(info) = event {
                        if let Some(pool) = parse_service_info(&info) {
                            pools.push(pool);
                        }
                    }
                }
                _ => continue,
            }
        }

        Ok(pools)
    }

    pub fn stop_broadcast(&self, pool_id: Uuid, name: &str) {
        let service_name = format!("{}_{}", name, pool_id);
        let _ = self.daemon.unregister(&format!("{}.{}", service_name, SERVICE_TYPE));
    }
}

fn parse_service_info(info: &mdns_sd::ResolvedService) -> Option<DiscoveredPool> {
    let pool_id = info
        .get_property_val_str("pool_id")
        .and_then(|s| Uuid::parse_str(s).ok())?;

    let name = info.get_property_val_str("name")?.to_string();

    let members = info
        .get_property_val_str("members")
        .and_then(|s| s.parse().ok())
        .unwrap_or(0);

    let max_members = info
        .get_property_val_str("max_members")
        .and_then(|s| s.parse().ok())
        .unwrap_or(10);

    
    let addr = info.get_addresses().iter().next()
        .and_then(|ip| ip.to_string().split('%').next().and_then(|s| s.parse().ok()))?;
    let port = info.get_port();

    Some(DiscoveredPool {
        id: pool_id,
        name,
        addr,
        port,
        members,
        max_members,
    })
}
