import { test, expect } from '../../support/fixtures.ts'
import { env } from '../../support/env.ts'

test.describe('Logout', () => {
  test('successful logout', async ({ loginPage, basePage, page }) => {
    await loginPage.goto()
    await loginPage.login(env.TEST_EMAIL, env.TEST_PASSWORD)
    await basePage.logoutButton.click()
    await expect(page.locator('a', { hasText: 'Login' })).toBeVisible()
  })
})
