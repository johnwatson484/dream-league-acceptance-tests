#!/bin/bash
set -e

echo "Starting acceptance test stack..."
docker compose up -d --build --wait

echo "Stack is ready."
echo "  Web: http://localhost:3100"
echo "  API: http://localhost:3110"
echo ""
echo "Run tests with: npm run test:only"
echo "Tear down with: npm run stack:down"
