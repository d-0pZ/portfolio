# scripts/cleanup.sh - For cleanup
#!/bin/bash
set -e
echo "🧹 Cleaning up..."
docker-compose down --volumes --remove-orphans
docker system prune -f
pkill -f "ngrok" 2>/dev/null || true
echo "✅ Cleanup complete"