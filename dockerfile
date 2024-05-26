# Dockerfile

# Stage 1: Build the application
FROM node:18-alpine AS builder

# Install PostgreSQL client for pg_isready command
RUN apk add --no-cache postgresql-client

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy the .env_docker file and rename it to .env
COPY .env_docker .env

# Set environment variables for the build stage
ARG DATABASE_URL
ENV NODE_ENV=production
ENV DATABASE_URL=$DATABASE_URL
ENV SKIP_DB_CALLS=true

# Generate Prisma client
RUN npx prisma generate

# Build the Next.js application without connecting to the database
RUN npm run build

# Stage 2: Run the application
FROM node:18-alpine

# Install PostgreSQL client for pg_isready command
RUN apk add --no-cache postgresql-client

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

# Install only production dependencies
RUN npm install --production

# Copy the .env_docker file and rename it to .env
COPY .env_docker .env

# Copy the initialization script and mock data
COPY init-db.sh /app/init-db.sh
COPY mockdata.sql /app/mockdata.sql

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
