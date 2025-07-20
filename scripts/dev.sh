# scripts/dev.sh - For development workflow
#!/bin/bash
set -e
echo "🚀 Starting development environment..."
docker-compose down --volumes --remove-orphans
docker-compose up -d --build
echo "✅ Dev environment ready at http://localhost:80"