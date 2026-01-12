.PHONY: dev-create dev-discover dev-join create discover join build test check install-tools

# Fast development with auto-reload
dev-create:
	@cargo watch -q -c -x 'run -- create-pool --name banana-pool --port 5000 --max-members 10'

dev-discover:
	@cargo watch -q -c -x 'run -- discover-pools --timeout 5'

dev-join:
	@echo "Usage: make dev-join POOL_ID=<uuid> COORDINATOR=<ip:port>"
	@cargo watch -q -c -x 'run -- join-pool --pool-id $(POOL_ID) --coordinator $(COORDINATOR)'

# Regular run commands (no auto-reload)
create:
	@cargo run -- create-pool --name banana-pool --port 5000 --max-members 10

discover:
	@cargo run -- discover-pools --timeout 5

join:
	@echo "Usage: make join POOL_ID=<uuid> COORDINATOR=<ip:port>"
	@cargo run -- join-pool --pool-id $(POOL_ID) --coordinator $(COORDINATOR)

# Build and test
build:
	@cargo build --release

test:
	@cargo watch -q -c -x test

check:
	@cargo watch -q -c -x check

# Install development tools
install-tools:
	@cargo install cargo-watch
	@echo "✓ Development tools installed"
