use clap::{Parser, Subcommand};

#[derive(Parser)]
#[command(name = "banana-protocol")]
#[command(about = "Professional local-first pooling system", long_about = None)]
pub struct Cli {
    #[command(subcommand)]
    pub command: Commands,
}

#[derive(Subcommand)]
pub enum Commands {
    /// Create a new pool and become the coordinator
    CreatePool {
        /// Name of the pool
        #[arg(short, long, default_value = "banana-pool")]
        name: String,

        /// Maximum number of members
        #[arg(short, long, default_value_t = 10)]
        max_members: usize,

        /// Port to bind to
        #[arg(short, long, default_value_t = 5000)]
        port: u16,
    },

    /// Discover available pools on the local network
    DiscoverPools {
        /// Discovery timeout in seconds
        #[arg(short, long, default_value_t = 5)]
        timeout: u64,
    },

    /// Join an existing pool
    JoinPool {
        /// Pool ID to join
        #[arg(short, long)]
        pool_id: String,

        /// Coordinator address (IP:PORT)
        #[arg(short, long)]
        coordinator: String,
    },

    /// List members in current pool
    ListMembers,
}
