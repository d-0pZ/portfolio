pipeline {
    agent any
    
    environment {
        DOCKER_BUILDKIT = "1"
        COMPOSE_HTTP_TIMEOUT = "120"
        COMPOSE_DOCKER_CLI_BUILD = "1"
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo '📋 Checking out source code...'
                script {
                    sh '''
                        echo "Verifying required files..."
                        [ -f "docker-compose.yml" ] || { echo "❌ docker-compose.yml not found"; exit 1; }
                        [ -f "Dockerfile" ] || { echo "❌ Dockerfile not found"; exit 1; }
                        [ -f ".env" ] || { echo "⚠️  .env file not found, using defaults"; }
                        echo "✅ File verification passed"
                    '''
                }
            }
        }
        
        stage('Build') {
            steps {
                echo '🔨 Building application...'
                sh '''
                    chmod +x scripts/build.sh && ./scripts/build.sh
                    docker-compose build --no-cache
                    echo "✅ Build completed successfully"
                '''
            }
        }
        
        stage('Deploy') {
            steps {
                echo '🚀 Deploying application...'
                sh 'chmod +x scripts/deploy.sh && ./scripts/deploy.sh'
            }
        }
        
        stage('Health Check') {
            steps {
                echo '🔍 Performing health checks...'
                script {
                    sh '''
                        # Wait for services to stabilize
                        sleep 30
                        
                        # Check Redis
                        if ! docker-compose exec -T redis redis-cli ping > /dev/null 2>&1; then
                            echo "❌ Redis health check failed"
                            exit 1
                        fi
                        
                        # Check Nginx accessibility
                        if ! curl -f -s http://localhost:80 > /dev/null 2>&1; then
                            echo "❌ Nginx accessibility check failed"
                            exit 1
                        fi
                        
                        echo "✅ All health checks passed!"
                    '''
                }
            }
        }
    }
    
    post {
        always {
            echo '📊 Pipeline completed!'
            sh '''
                echo "=== Service Status ==="
                docker-compose ps || true
                echo "🌍 Application: http://localhost:${NGINX_EXTERNAL_PORT:-80}"
                echo "🔧 Jenkins: http://localhost:${JENKINS_PORT:-8081}"
            '''
        }
        success {
            echo '🎉 Pipeline succeeded! All services are running.'
        }
        failure {
            echo '❌ Pipeline failed! Cleaning up...'
            sh '''
                echo "📋 Service logs:"
                docker-compose logs --tail=50 || true
                chmod +x scripts/stop.sh && ./scripts/stop.sh || true
            '''
        }
    }
}