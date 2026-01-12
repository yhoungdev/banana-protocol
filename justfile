# Fast development commands with auto-reload

# Auto-reload and create a pool
dev-create name="banana-pool" port="5000" members="10":
    cargo watch -x 'run -- create-pool --name {{name}} --port {{port}} --max-members {{members}}'

# Auto-reload and discover pools
dev-discover timeout="5":
    cargo watch -x 'run -- discover-pools --timeout {{timeout}}'

# Auto-reload and join pool
dev-join pool-id coordinator:
    cargo watch -x 'run -- join-pool --pool-id {{pool-id}} --coordinator {{coordinator}}'

# Just run without watching
create name="banana-pool" port="5000" members="10":
    cargo run -- create-pool --name {{name}} --port {{port}} --max-members {{members}}

discover timeout="5":
    cargo run -- discover-pools --timeout {{timeout}}

join pool-id coordinator:
    cargo run -- join-pool --pool-id {{pool-id}} --coordinator {{coordinator}}

# Build release binary
build:
    cargo build --release

# Run tests with auto-reload
test:
    cargo watch -x test

# Check code without building
check:
    cargo watch -x check
