FROM oven/bun:latest

WORKDIR /app

# Copy package files
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Initialize database
RUN bun run db:init || true

# Expose port
EXPOSE 3000

# Start the application
CMD ["bun", "run", "dev"]
