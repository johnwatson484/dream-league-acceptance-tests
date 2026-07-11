import { test as setup, expect } from '@playwright/test'
import { env } from './env.ts'

const authFile = '.auth/admin.json'

setup('authenticate as admin', async ({ page }) => {
  await page.goto('/login')
  await page.locator('#email').fill(env.TEST_EMAIL)
  await page.locator('#password').fill(env.TEST_PASSWORD)
  await page.locator('button[type="submit"]').click()

  await expect(page).toHaveURL('/')
  await expect(page.locator('button[type="submit"]', { hasText: 'Logout' })).toBeVisible()

  await page.context().storageState({ path: authFile })
})
