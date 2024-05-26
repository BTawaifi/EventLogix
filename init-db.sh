#!/bin/bash
set -e

# Load environment variables from .env file
export $(grep -v '^#' .env | xargs)

# Wait for PostgreSQL to be ready
until pg_isready -h db -p 5432 -U $POSTGRES_USER; do
    echo "Waiting for PostgreSQL...";
    sleep 2;
done

# Check if data already exists
DATA_EXISTS=$(psql $DATABASE_URL -tAc "SELECT 1 FROM \"User\" LIMIT 1;")

if [ -z "$DATA_EXISTS" ]; then
  echo "Seeding database with mock data..."
  psql $DATABASE_URL < /app/mockdata.sql
else
  echo "Data already exists. Skipping seeding."
fi
