# Stage 1: Dependencies (not needed for standalone build)
# Skipping deps stage for distroless optimization

# Stage 1: Builder  
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files and install all dependencies (including dev)
COPY frontend/package*.json ./
RUN npm ci --frozen-lockfile --no-audit --no-fund

# Copy source and build
COPY frontend/ ./
RUN npm run build && \
    npm prune --production && \
    npm cache clean --force

# Stage 3: Production (distroless - ultra minimal)
FROM gcr.io/distroless/nodejs20-debian12 AS runner
WORKDIR /app

# Set environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy only essential production files
COPY --from=builder --chown=nonroot:nonroot /app/.next/standalone ./
COPY --from=builder --chown=nonroot:nonroot /app/.next/static ./.next/static
COPY --from=builder --chown=nonroot:nonroot /app/public ./public

# Switch to non-root user (distroless provides 'nonroot' user)
USER nonroot

# Use non-root port
EXPOSE 3000

# Distroless doesn't have shell, so direct node execution
CMD ["server.js"]