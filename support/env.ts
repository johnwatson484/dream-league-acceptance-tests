import 'dotenv/config'

export const env = {
  BASE_URL: process.env['BASE_URL'] ?? 'http://localhost:3100',
  API_URL: process.env['API_URL'] ?? 'http://localhost:3110',
  TEST_EMAIL: process.env['TEST_EMAIL'] ?? 'test@test.com',
  TEST_PASSWORD: process.env['TEST_PASSWORD'] ?? 'test',
} as const
