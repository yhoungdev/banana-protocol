use axum::{
    routing::get,
    Router,
};
use std::{net::SocketAddr, sync::Arc};
use tower_http::cors::{Any, CorsLayer};

use super::{routes, state::AppState};

pub struct WebServer {
    state: Arc<AppState>,
    port: u16,
}

impl WebServer {
    pub fn new(state: Arc<AppState>, port: u16) -> Self {
        Self { state, port }
    }

    pub fn create_router(&self) -> Router {
        let cors = CorsLayer::new()
            .allow_origin(Any)
            .allow_methods(Any)
            .allow_headers(Any);

        let api_routes = Router::new()
            .route("/health", get(routes::health_check))
            .route("/node", get(routes::get_node_info))
            .route("/peers", get(routes::get_peers))
            .route("/pools", get(routes::get_pools))
            .route("/stats", get(routes::get_network_stats));

        Router::new()
            .nest("/api", api_routes)
            .layer(cors)
            .with_state(self.state.clone())
    }

    pub async fn start(&self) -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
        let app = self.create_router();
        let addr = SocketAddr::from(([127, 0, 0, 1], self.port));

        let listener = tokio::net::TcpListener::bind(addr).await?;

        axum::serve(listener, app).await?;

        Ok(())
    }
}

pub async fn start_web_server(
    state: Arc<AppState>,
    port: u16,
) -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    let server = WebServer::new(state, port);
    server.start().await
}
