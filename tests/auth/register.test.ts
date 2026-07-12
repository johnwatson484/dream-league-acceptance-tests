import { test, expect } from '../../support/fixtures.ts'

test.describe('Registration', () => {
  test('displays registration page', async ({ basePage, page }) => {
    await basePage.navigateTo('/register')
    await expect(page.locator('body')).toContainText('Only league members can register')
  })

  test('registration with unrecognised email', async ({ loginPage, page }) => {
    await page.goto('/register')
    await loginPage.emailInput.fill('unknown@test.com')
    await loginPage.passwordInput.fill('password123')
    await loginPage.submitButton.click()
    await expect(page.locator('body')).toContainText('Email already registered or not a league member')
  })
})
