#!/bin/bash
set -e

cleanup() { docker compose down -v 2>/dev/null; }
trap cleanup EXIT

echo "Starting acceptance test stack..."
docker compose up -d --build --wait

echo "Stack ready. Running tests..."
npx playwright test "$@"
