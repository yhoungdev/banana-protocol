use serde::{Deserialize, Serialize};
use std::net::SocketAddr;
use uuid::Uuid;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum PoolRole {
    Coordinator,
    Member,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PoolConfig {
    pub name: String,
    pub max_members: usize,
    pub port: u16,
}

impl Default for PoolConfig {
    fn default() -> Self {
        Self {
            name: "banana-pool".to_string(),
            max_members: 10,
            port: 5000,
        }
    }
}

#[derive(Debug)]
pub struct Pool {
    pub id: Uuid,
    pub config: PoolConfig,
    pub role: PoolRole,
    pub local_addr: SocketAddr,
    pub members: Vec<SocketAddr>,
}

impl Pool {
    pub fn new_coordinator(config: PoolConfig, local_addr: SocketAddr) -> Self {
        Self {
            id: Uuid::new_v4(),
            config,
            role: PoolRole::Coordinator,
            local_addr,
            members: vec![local_addr],
        }
    }

    pub fn new_member(
        pool_id: Uuid,
        config: PoolConfig,
        local_addr: SocketAddr,
        coordinator_addr: SocketAddr,
    ) -> Self {
        Self {
            id: pool_id,
            config,
            role: PoolRole::Member,
            local_addr,
            members: vec![coordinator_addr],
        }
    }

    pub fn add_member(&mut self, addr: SocketAddr) -> Result<(), String> {
        if self.members.len() >= self.config.max_members {
            return Err("Pool is full".to_string());
        }

        if !self.members.contains(&addr) {
            self.members.push(addr);
        }

        Ok(())
    }

    pub fn remove_member(&mut self, addr: &SocketAddr) {
        self.members.retain(|a| a != addr);
    }

    pub fn is_coordinator(&self) -> bool {
        self.role == PoolRole::Coordinator
    }

    pub fn member_count(&self) -> usize {
        self.members.len()
    }
}
