
use std::net::SocketAddr;

pub struct PoolMembership;

impl PoolMembership {
    
    pub async fn new(
        _node_name: String,
        _bind_addr: SocketAddr,
    ) -> Result<Self, Box<dyn std::error::Error>> {
        Ok(Self)
    }

    
    pub async fn join(&self, _addresses: Vec<String>) -> Result<usize, Box<dyn std::error::Error>> {
        Ok(0)
    }

    
    pub async fn num_members(&self) -> usize {
        0
    }

    
    pub async fn leave(&self, _timeout_ms: u64) -> Result<(), Box<dyn std::error::Error>> {
        Ok(())
    }

    
    pub async fn member_addresses(&self) -> Vec<SocketAddr> {
        Vec::new()
    }
}
