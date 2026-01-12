# Development Guide

## Fast Reload Setup

This project supports multiple ways to auto-reload during development, so you don't need to manually run `cargo run` after every code change.

### Prerequisites

```bash
# Install cargo-watch (already installed)
cargo install cargo-watch

# Optional: Install just
cargo install just

# Optional: Install watchexec (alternative)
brew install watchexec  # macOS
```

---

## Quick Start

### 1. **Simplest: Use the watch.sh script**

```bash
# Make it executable (already done)
chmod +x watch.sh

# Create a pool with auto-reload
./watch.sh create

# Discover pools with auto-reload
./watch.sh discover

# Join a pool with auto-reload
./watch.sh join <pool-id> <coordinator-ip:port>

# Run tests with auto-reload
./watch.sh test
```

**How it works:**
- Watches `src/` directory for changes
- Automatically rebuilds and runs on save
- Clears screen for clean output
- Quiet mode (less noise)

---

### 2. **Using Make commands**

```bash
# Development with auto-reload
make dev-create           # Create pool
make dev-discover         # Discover pools
make dev-join             # Join pool (needs POOL_ID and COORDINATOR)

# Example with parameters
make dev-join POOL_ID=550e8400-e29b-41d4-a716-446655440000 COORDINATOR=127.0.0.1:5000

# Regular commands (no auto-reload)
make create
make discover
make build
make test
```

---

### 3. **Using Just commands**

If you have `just` installed:

```bash
# Auto-reload with custom parameters
just dev-create "my-pool" "5001" "20"
just dev-discover "10"
just dev-join <pool-id> <coordinator>

# Regular commands
just create
just discover
just build
```

---

### 4. **Using Cargo aliases**

```bash
# These are defined in .cargo/config.toml
cargo dev                  # Watch and run
cargo dev-create          # Watch and create pool
cargo dev-discover        # Watch and discover
```

---

### 5. **Direct cargo-watch usage**

```bash
# Most flexible - run any command with auto-reload
cargo watch -x 'run -- create-pool --name test --port 5555'
cargo watch -x 'run -- discover-pools --timeout 10'
cargo watch -x test
cargo watch -x check

# With options
cargo watch -q -c -w src -x 'run -- <command>'
# -q: quiet (less output)
# -c: clear screen on reload
# -w: watch specific directory
```

---

## Development Workflow Examples

### Terminal 1: Run coordinator
```bash
./watch.sh create
# or
make dev-create
```

### Terminal 2: Discover pools
```bash
./watch.sh discover
# or
make dev-discover
```

### Terminal 3: Join pool
```bash
# Copy pool-id and coordinator address from Terminal 1
./watch.sh join <pool-id> <coordinator-addr>
```

---

## Tips

1. **Use `watch.sh` for simplicity** - It's pre-configured with good defaults

2. **Makefile for CI/CD** - Easy to integrate into scripts

3. **cargo-watch for custom workflows** - Most flexible

4. **Clear screen between reloads** - Add `-c` flag for cleaner output

5. **Watch specific directories** - Use `-w src` to avoid unnecessary rebuilds

6. **Quiet mode** - Use `-q` to reduce noise during development

---

## Troubleshooting

### cargo-watch not found
```bash
cargo install cargo-watch
```

### Permission denied on watch.sh
```bash
chmod +x watch.sh
```

### Changes not being detected
```bash
# Explicitly specify watch directory
cargo watch -w src -x 'run -- create-pool'
```

### Too much output
```bash
# Use quiet mode
cargo watch -q -x run
```

---

## Performance Tips

1. **Use `cargo check` for faster feedback:**
   ```bash
   cargo watch -x check
   ```

2. **Incremental compilation is enabled by default in Cargo.toml**

3. **Use release mode for performance testing:**
   ```bash
   cargo watch -x 'run --release -- create-pool'
   ```

---

## IDE Integration

### VS Code
Add to `.vscode/tasks.json`:
```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Watch: Create Pool",
      "type": "shell",
      "command": "./watch.sh create",
      "problemMatcher": "$rustc",
      "isBackground": true
    }
  ]
}
```

### IntelliJ / CLion
- Use "Run External Tool" with `./watch.sh create`
- Or use the built-in Cargo integration with `cargo watch`

---

## What Gets Watched?

By default, cargo-watch monitors:
- `src/**/*.rs`
- `Cargo.toml`
- `Cargo.lock`

It ignores:
- `target/`
- `.git/`
- Hidden files

You can customize this in `.watchexec.toml` or with cargo-watch flags.
