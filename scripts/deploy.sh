# scripts/deploy.sh - For production deployment  
#!/bin/bash
set -e
echo "🚀 Starting production deployment..."

# Load environment
source .env 2>/dev/null || true

# Deploy with health checks
docker-compose down --volumes --remove-orphans
docker-compose up -d --build --force-recreate

# Wait and verify
sleep 20
MAX_RETRIES=5
for i in $(seq 1 $MAX_RETRIES); do
    if curl -f -s http://localhost:${NGINX_EXTERNAL_PORT:-80} > /dev/null 2>&1; then
        echo "✅ Deployment successful!"
        echo "🌍 App: http://localhost:${NGINX_EXTERNAL_PORT:-80}"
        echo "🔧 Jenkins: http://localhost:${JENKINS_PORT:-8080}"
        exit 0
    fi
    echo "⏳ Attempt $i/$MAX_RETRIES..."
    sleep 10
done

echo "❌ Deployment verification failed"
docker-compose logs --tail=20
exit 1