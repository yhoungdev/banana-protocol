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
    Daemon {
        #[arg(short, long, default_value_t = 3000)]
        web_port: u16,

        #[arg(short, long, default_value_t = 5000)]
        node_port: u16,

        #[arg(long, default_value_t = true)]
        open_browser: bool,
    },

    CreatePool {
        #[arg(short, long, default_value = "banana-pool")]
        name: String,

        #[arg(short, long, default_value_t = 10)]
        max_members: usize,

        #[arg(short, long, default_value_t = 5000)]
        port: u16,
    },

    DiscoverPools {
        #[arg(short, long, default_value_t = 5)]
        timeout: u64,
    },

    JoinPool {
        #[arg(short, long)]
        pool_id: String,

        #[arg(short, long)]
        coordinator: String,
    },

    ListMembers,
}
