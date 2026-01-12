#!/bin/bash
# Fast reload script for banana-protocol development

print_usage() {
    echo "Usage: ./watch.sh [command] [options]"
    echo ""
    echo "Commands:"
    echo "  create              Auto-reload and create a pool"
    echo "  discover            Auto-reload and discover pools"
    echo "  join <id> <addr>    Auto-reload and join pool"
    echo "  test                Auto-reload and run tests"
    echo ""
    echo "Examples:"
    echo "  ./watch.sh create"
    echo "  ./watch.sh discover"
    echo "  ./watch.sh join 550e8400-e29b-41d4-a716-446655440000 127.0.0.1:5000"
}

case "$1" in
    create)
        NAME="${2:-banana-pool}"
        PORT="${3:-5000}"
        MEMBERS="${4:-10}"
        echo "🔄 Auto-reloading: Creating pool '$NAME' on port $PORT..."
        cargo watch -q -c -w src -x "run -- create-pool --name $NAME --port $PORT --max-members $MEMBERS"
        ;;

    discover)
        TIMEOUT="${2:-5}"
        echo "🔄 Auto-reloading: Discovering pools (${TIMEOUT}s timeout)..."
        cargo watch -q -c -w src -x "run -- discover-pools --timeout $TIMEOUT"
        ;;

    join)
        if [ -z "$2" ] || [ -z "$3" ]; then
            echo "Error: Pool ID and coordinator address required"
            echo "Usage: ./watch.sh join <pool-id> <coordinator-addr>"
            exit 1
        fi
        POOL_ID="$2"
        COORDINATOR="$3"
        echo "🔄 Auto-reloading: Joining pool $POOL_ID at $COORDINATOR..."
        cargo watch -q -c -w src -x "run -- join-pool --pool-id $POOL_ID --coordinator $COORDINATOR"
        ;;

    test)
        echo "🔄 Auto-reloading: Running tests..."
        cargo watch -q -c -w src -x test
        ;;

    check)
        echo "🔄 Auto-reloading: Checking code..."
        cargo watch -q -c -w src -x check
        ;;

    *)
        print_usage
        exit 1
        ;;
esac
