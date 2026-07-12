# dream-league-acceptance-tests

Playwright acceptance tests for the Dream League web application.

## Prerequisites

- Docker
- Node.js >= 24
- Sibling repos checked out: `dream-league-api` and `dream-league-web`

```
repos/
  dream-league-api/
  dream-league-web/
  dream-league-acceptance-tests/   ← you are here
```

## Quick Start

Run everything with a single command:

```bash
npm install
npx playwright install chromium
npm test
```

This will:
1. Build and start an isolated Docker stack (API, Web, Postgres, Redis)
2. Run database migrations and seed test data
3. Execute all Playwright tests
4. Tear down the stack and delete all data

The stack runs on its own Docker network (`dream-league-test`) with no port or data conflicts with your local dev environment.

## Development Workflow

When iterating on tests, keep the stack running:

```bash
npm run stack:up       # Start the stack (stays running)
npm run test:only      # Run tests (fast, no stack rebuild)
npm run test:only      # Run again after changes
npm run stack:down     # Tear down when done
```

### Resetting Data

If tests leave data in an unexpected state:

```bash
npm run stack:reset    # Re-seeds the database without rebuilding
```

### Running Subsets

```bash
npm run test:public    # Public page tests only
npm run test:admin     # Admin tests only
npm run test:auth      # Auth flow tests only
```

### Debugging

```bash
npm run test:headed    # Visible browser
npm run test:ui        # Playwright UI mode
npm run test:debug     # Step-through debugger
npm run report         # View HTML report from last run
```

## Code Changes

Source directories from `dream-league-api` and `dream-league-web` are mounted into the containers. Changes to source files are reflected without rebuilding.

If you change `package.json` or install new dependencies in either repo, rebuild:

```bash
npm run stack:down
npm run stack:up       # Rebuilds containers
```

## Project Structure

```
tests/          Playwright test files
  public/       Anonymous user browsing (home, results, teams, etc.)
  auth/         Login/logout/register/forgot-password
  admin/        Admin CRUD operations and management
  client/       Client-side interactions (search, cookies)
pages/          Page Object Model
support/        Fixtures, API client, test data, environment config
scripts/        Shell scripts for stack management
compose.yaml    Isolated Docker stack definition
```

## How It Works

- Tests run against a fully isolated Docker stack on ports 3100 (web) and 3110 (API)
- Postgres and Redis are internal to the Docker network (no host port binding)
- The database is seeded with realistic test data matching the API's seed scripts
- Admin tests create temporary entities (prefixed with "Test") and clean up after themselves
- `npm test` guarantees clean state: the stack is always torn down after tests finish (even on failure)

## Linting

```bash
npm run lint
npm run lint:fix
npm run typecheck
```
