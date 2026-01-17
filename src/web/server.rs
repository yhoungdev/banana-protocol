use axum::{
    http::{header, StatusCode, Uri},
    response::{Html, IntoResponse, Response},
    routing::get,
    Router,
};
use rust_embed::Embed;
use std::{net::SocketAddr, sync::Arc};
use tower_http::cors::{Any, CorsLayer};

use super::{routes, state::AppState};

#[derive(Embed)]
#[folder = "web_portal/dist"]
struct Assets;

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
            .fallback(static_handler)
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

async fn static_handler(uri: Uri) -> impl IntoResponse {
    let path = uri.path().trim_start_matches('/');

    if path.is_empty() || path == "index.html" {
        return index_html().await;
    }

    match Assets::get(path) {
        Some(content) => {
            let mime = mime_guess::from_path(path).first_or_octet_stream();
            (
                StatusCode::OK,
                [(header::CONTENT_TYPE, mime.as_ref())],
                content.data.into_owned(),
            )
                .into_response()
        }
        None => {
            if path.contains('.') {
                (StatusCode::NOT_FOUND, "Not Found").into_response()
            } else {
                index_html().await
            }
        }
    }
}

async fn index_html() -> Response {
    match Assets::get("index.html") {
        Some(content) => Html(content.data.into_owned()).into_response(),
        None => (StatusCode::NOT_FOUND, "index.html not found").into_response(),
    }
}

pub async fn start_web_server(
    state: Arc<AppState>,
    port: u16,
) -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    let server = WebServer::new(state, port);
    server.start().await
}
