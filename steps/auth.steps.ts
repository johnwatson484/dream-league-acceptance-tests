import { createBdd } from 'playwright-bdd'
import { test, expect } from './fixtures.ts'
import { env } from '../support/env.ts'

const { Given, When, Then } = createBdd(test)

Given('I am on the login page', async ({ loginPage }) => {
  await loginPage.goto()
})

When('I enter valid admin credentials', async ({ loginPage }) => {
  await loginPage.login(env.TEST_EMAIL, env.TEST_PASSWORD)
})

When('I enter {string} as the email', async ({ loginPage }, email: string) => {
  await loginPage.emailInput.fill(email)
})

When('I enter {string} as the password', async ({ loginPage }, password: string) => {
  await loginPage.passwordInput.fill(password)
})

When('I submit the login form', async ({ loginPage }) => {
  await loginPage.submitButton.click()
})

When('I click logout', async ({ basePage }) => {
  await basePage.logoutButton.click()
})

Then('I should be redirected to the home page', async ({ page }) => {
  await expect(page).toHaveURL('/')
})

Then('I should remain on the login page', async ({ page }) => {
  await expect(page).toHaveURL(/\/login/)
})

Then('I should see the login link', async ({ page }) => {
  await expect(page.locator('a', { hasText: 'Login' })).toBeVisible()
})
