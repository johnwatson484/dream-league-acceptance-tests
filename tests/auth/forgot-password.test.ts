import { test, expect } from '../../support/fixtures.ts'

test.describe('Forgot password', () => {
  test('displays forgot password page', async ({ basePage, page }) => {
    await basePage.navigateTo('/forgot-password')
    await expect(page.locator('body')).toContainText('Forgotten password')
  })

  test('submits forgot password request', async ({ loginPage, page }) => {
    await page.goto('/forgot-password')
    await loginPage.emailInput.fill('test@example.com')
    await loginPage.submitButton.click()
    await expect(page.locator('body')).toContainText('If your email address is registered')
  })
})
