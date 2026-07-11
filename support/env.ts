import 'dotenv/config'

export const env = {
  BASE_URL: process.env['BASE_URL'] ?? 'http://localhost:3000',
  API_URL: process.env['API_URL'] ?? 'http://localhost:3001',
  TEST_EMAIL: process.env['TEST_EMAIL'] ?? '',
  TEST_PASSWORD: process.env['TEST_PASSWORD'] ?? '',
} as const
