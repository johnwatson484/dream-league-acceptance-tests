# dream-league-acceptance-tests

Playwright acceptance tests for Dream League web application using Cucumber/Gherkin syntax via [playwright-bdd](https://github.com/vitalets/playwright-bdd).

## Prerequisites

- Node.js >= 24
- Running instance of the Dream League stack (web, API, Redis)

## Setup

```bash
nvm use
npm install
npx playwright install chromium
cp .env.example .env
```

Edit `.env` with your test account credentials:

```
BASE_URL=http://localhost:3000
TEST_EMAIL=admin@example.com
TEST_PASSWORD=your-password
```

## Running Tests

```bash
npm test              # Run all tests
npm run test:headed   # Run with visible browser
npm run test:ui       # Playwright UI mode
npm run test:debug    # Debug mode
npm run test:public   # Public pages only
npm run test:admin    # Admin tests only
npm run test:auth     # Auth flow tests only
npm run report        # Open HTML report
```

## Project Structure

```
features/       Feature files (Gherkin syntax)
  public/       Anonymous user browsing
  auth/         Login/logout/register flows
  admin/        Admin CRUD operations
  client/       Client-side JS interactions
steps/          Step definitions
pages/          Page Object Model
support/        Auth setup and environment config
```

## Linting

```bash
npm run lint
npm run lint:fix
npm run typecheck
```
