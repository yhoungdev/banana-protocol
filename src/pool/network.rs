use quinn::{Endpoint, ServerConfig, ClientConfig, Connection};
use rustls::pki_types::{CertificateDer, PrivateKeyDer};
use std::net::SocketAddr;
use std::sync::Arc;
use tokio::sync::mpsc;

#[derive(Debug, Clone)]
pub enum PoolMessage {
    Join { addr: SocketAddr },
    Leave { addr: SocketAddr },
    Data { from: SocketAddr, data: Vec<u8> },
    MemberList { members: Vec<SocketAddr> },
}

pub struct PoolNetwork {
    endpoint: Endpoint,
    connections: Vec<Connection>,
}

impl PoolNetwork {
    
    pub async fn new(bind_addr: SocketAddr) -> Result<Self, Box<dyn std::error::Error>> {
        let (cert, key) = generate_self_signed_cert()?;

        let server_config = configure_server(cert.clone(), key)?;
        let endpoint = Endpoint::server(server_config, bind_addr)?;

        Ok(Self {
            endpoint,
            connections: Vec::new(),
        })
    }

    
    pub fn local_addr(&self) -> Result<SocketAddr, std::io::Error> {
        self.endpoint.local_addr()
    }

    
    pub async fn accept_connection(&mut self) -> Result<Connection, Box<dyn std::error::Error>> {
        let incoming = self.endpoint.accept().await.ok_or("No incoming connection")?;
        let connection = incoming.await?;
        self.connections.push(connection.clone());
        Ok(connection)
    }

    
    pub async fn connect(
        &mut self,
        addr: SocketAddr,
    ) -> Result<Connection, Box<dyn std::error::Error>> {
        let client_config = configure_client();
        self.endpoint.set_default_client_config(client_config);

        let connection = self.endpoint.connect(addr, "localhost")?.await?;
        self.connections.push(connection.clone());
        Ok(connection)
    }

    
    pub async fn send(
        &self,
        conn: &Connection,
        data: &[u8],
    ) -> Result<(), String> {
        let mut send = conn.open_uni().await.map_err(|e| e.to_string())?;
        send.write_all(data).await.map_err(|e| e.to_string())?;
        send.finish().map_err(|e| e.to_string())?;
        Ok(())
    }


    pub async fn receive(conn: &Connection) -> Result<Vec<u8>, String> {
        let mut recv = conn.accept_uni().await.map_err(|e| e.to_string())?;
        let data = recv.read_to_end(1024 * 1024).await.map_err(|e| e.to_string())?;
        Ok(data)
    }

    
    pub async fn broadcast(&self, data: &[u8]) -> Result<(), Box<dyn std::error::Error>> {
        for conn in &self.connections {
            let _ = self.send(conn, data).await; 
        }
        Ok(())
    }

    
    pub async fn listen(
        &self,
        tx: mpsc::Sender<PoolMessage>,
    ) -> Result<(), Box<dyn std::error::Error>> {
        for conn in &self.connections {
            let conn_clone = conn.clone();
            let tx_clone = tx.clone();
            let remote_addr = conn.remote_address();

            tokio::spawn(async move {
                loop {
                    match Self::receive(&conn_clone).await {
                        Ok(data) => {
                            let _ = tx_clone
                                .send(PoolMessage::Data {
                                    from: remote_addr,
                                    data,
                                })
                                .await;
                        }
                        Err(_) => break,
                    }
                }
            });
        }
        Ok(())
    }
}


fn generate_self_signed_cert() -> Result<(CertificateDer<'static>, PrivateKeyDer<'static>), Box<dyn std::error::Error>> {
    let cert = rcgen::generate_simple_self_signed(vec!["localhost".to_string()])?;
    let key = PrivateKeyDer::Pkcs8(cert.key_pair.serialize_der().into());
    let cert_der = CertificateDer::from(cert.cert);
    Ok((cert_der, key))
}


fn configure_server(
    cert: CertificateDer<'static>,
    key: PrivateKeyDer<'static>,
) -> Result<ServerConfig, Box<dyn std::error::Error>> {
    let crypto = rustls::ServerConfig::builder()
        .with_no_client_auth()
        .with_single_cert(vec![cert], key)?;

    let server_config = ServerConfig::with_crypto(Arc::new(
        quinn::crypto::rustls::QuicServerConfig::try_from(crypto)?
    ));

    Ok(server_config)
}


fn configure_client() -> ClientConfig {
    let crypto = rustls::ClientConfig::builder()
        .dangerous()
        .with_custom_certificate_verifier(Arc::new(SkipServerVerification))
        .with_no_client_auth();

    ClientConfig::new(Arc::new(quinn::crypto::rustls::QuicClientConfig::try_from(crypto).unwrap()))
}


#[derive(Debug)]
struct SkipServerVerification;

impl rustls::client::danger::ServerCertVerifier for SkipServerVerification {
    fn verify_server_cert(
        &self,
        _end_entity: &CertificateDer<'_>,
        _intermediates: &[CertificateDer<'_>],
        _server_name: &rustls::pki_types::ServerName<'_>,
        _ocsp_response: &[u8],
        _now: rustls::pki_types::UnixTime,
    ) -> Result<rustls::client::danger::ServerCertVerified, rustls::Error> {
        Ok(rustls::client::danger::ServerCertVerified::assertion())
    }

    fn verify_tls12_signature(
        &self,
        _message: &[u8],
        _cert: &CertificateDer<'_>,
        _dss: &rustls::DigitallySignedStruct,
    ) -> Result<rustls::client::danger::HandshakeSignatureValid, rustls::Error> {
        Ok(rustls::client::danger::HandshakeSignatureValid::assertion())
    }

    fn verify_tls13_signature(
        &self,
        _message: &[u8],
        _cert: &CertificateDer<'_>,
        _dss: &rustls::DigitallySignedStruct,
    ) -> Result<rustls::client::danger::HandshakeSignatureValid, rustls::Error> {
        Ok(rustls::client::danger::HandshakeSignatureValid::assertion())
    }

    fn supported_verify_schemes(&self) -> Vec<rustls::SignatureScheme> {
        vec![
            rustls::SignatureScheme::RSA_PKCS1_SHA256,
            rustls::SignatureScheme::ECDSA_NISTP256_SHA256,
            rustls::SignatureScheme::ED25519,
        ]
    }
}
