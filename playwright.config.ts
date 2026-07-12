import { defineConfig, devices } from '@playwright/test'
import 'dotenv/config'

export default defineConfig({
  testDir: './tests',
  globalSetup: './support/global-setup.ts',
  globalTeardown: './support/global-teardown.ts',
  fullyParallel: false,
  retries: 1,
  workers: 2,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: process.env['BASE_URL'] ?? 'http://localhost:3100',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'auth-setup',
      testDir: './support',
      testMatch: /auth\.setup\.ts/,
    },
    {
      name: 'public',
      use: { ...devices['Desktop Chrome'] },
      fullyParallel: true,
      testMatch: /public\//,
    },
    {
      name: 'auth',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /auth\//,
    },
    {
      name: 'admin',
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/admin.json',
      },
      fullyParallel: true,
      dependencies: ['auth-setup'],
      testMatch: /admin\//,
    },
    {
      name: 'client',
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/admin.json',
      },
      dependencies: ['auth-setup'],
      testMatch: /client\//,
    },
  ],
})
