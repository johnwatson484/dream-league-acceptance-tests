import { env } from './env.ts'

async function globalSetup (): Promise<void> {
  const maxAttempts = 60
  let attempts = 0

  console.log('[Global Setup] Waiting for services...')

  while (attempts < maxAttempts) {
    try {
      const response = await fetch(`${env.BASE_URL}/`)
      if (response.ok) {
        console.log('[Global Setup] Services are ready.')
        return
      }
    } catch {
      // Service not ready yet
    }
    attempts++
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  throw new Error(`Services did not become ready within ${maxAttempts} seconds`)
}

export default globalSetup
