import { test, expect } from '../../support/fixtures.ts'
import { env } from '../../support/env.ts'

test.describe('Login', () => {
  test('successful admin login', async ({ loginPage, page, basePage }) => {
    await loginPage.goto()
    await loginPage.login(env.TEST_EMAIL, env.TEST_PASSWORD)
    await expect(page).toHaveURL('/')
    await expect(basePage.logoutButton).toBeVisible()
  })

  test('login with invalid credentials', async ({ loginPage, page }) => {
    await loginPage.goto()
    await loginPage.emailInput.fill('invalid@test.com')
    await loginPage.passwordInput.fill('wrongpassword')
    await loginPage.submitButton.click()
    await expect(page.locator('body')).toContainText('Invalid credentials')
    await expect(page).toHaveURL(/\/login/)
  })
})
