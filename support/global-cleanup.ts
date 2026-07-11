import { ApiClient } from './api-client.ts'

async function globalSetup (): Promise<void> {
  console.log('\n[Global Cleanup] Removing leftover test data...')

  const client = new ApiClient()

  try {
    await client.login()
    await client.cleanupAll()
    console.log('[Global Cleanup] Done.\n')
  } catch (error) {
    console.warn('[Global Cleanup] Warning: cleanup failed, tests may encounter stale data')
    console.warn(`  ${(error as Error).message}`)
  }
}

export default globalSetup
