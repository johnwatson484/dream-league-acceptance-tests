#!/bin/bash
set -e

echo "Resetting test database..."
docker compose exec api node scripts/seed-test-data.ts --gameweek 5 --results
echo "Database reset complete."
