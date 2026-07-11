import { ApiClient } from './api-client.ts'

export default async function globalTeardown () {
  try {
    const client = new ApiClient()
    await client.login()
    await client.cleanupAll()
    console.log('Global teardown: test data cleaned up')
  } catch (error) {
    console.warn('Global teardown warning:', error instanceof Error ? error.message : error)
  }
}
