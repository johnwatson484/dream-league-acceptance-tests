import { defineConfig, devices } from '@playwright/test'
import { defineBddConfig } from 'playwright-bdd'
import 'dotenv/config'

const testDir = defineBddConfig({
  features: 'features/**/*.feature',
  steps: 'steps/**/*.ts',
  importTestFrom: 'steps/fixtures.ts',
  outputDir: '.generated-tests',
})

export default defineConfig({
  testDir,
  globalSetup: './support/global-cleanup.ts',
  globalTeardown: './support/global-teardown.ts',
  fullyParallel: false,
  retries: 1,
  workers: 2,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: process.env['BASE_URL'] ?? 'http://localhost:3000',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'auth-setup',
      testMatch: /auth\.setup\.ts/,
    },
    {
      name: 'public',
      use: { ...devices['Desktop Chrome'] },
      fullyParallel: true,
      testMatch: /public/,
    },
    {
      name: 'auth',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /auth/,
    },
    {
      name: 'admin',
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/admin.json',
      },
      fullyParallel: true,
      dependencies: ['auth-setup'],
      testMatch: /admin/,
    },
    {
      name: 'client',
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/admin.json',
      },
      dependencies: ['auth-setup'],
      testMatch: /client/,
    },
  ],
})
