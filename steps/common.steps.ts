import { createBdd } from 'playwright-bdd'
import { test, expect } from './fixtures.ts'

const { Given, When, Then } = createBdd(test)

Given('I navigate to {string}', async ({ basePage }, path: string) => {
  await basePage.navigateTo(path)
})

Given('I am logged in as an admin', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('button[type="submit"]', { hasText: 'Logout' })).toBeVisible()
})

When('I click the {string} navigation link', async ({ basePage }, text: string) => {
  await basePage.clickNavLink(text)
})

When('I submit the form', async ({ entityFormPage }) => {
  await entityFormPage.submit()
})

When('I confirm the deletion', async ({ entityFormPage }) => {
  await entityFormPage.submit()
})

Then('I should see {string}', async ({ page }, text: string) => {
  await expect(page.locator('body')).toContainText(text)
})

Then('I should not see {string}', async ({ page }, text: string) => {
  await expect(page.locator('body')).not.toContainText(text)
})

Then('I should be on {string}', async ({ page }, path: string) => {
  await expect(page).toHaveURL(new RegExp(path))
})

Then('the page should have a heading {string}', async ({ page }, heading: string) => {
  await expect(page.locator('h2, h3, h4').first()).toContainText(heading)
})

Then('I should see a table', async ({ page }) => {
  await expect(page.locator('table')).toBeVisible()
})

Then('I should see the logout button', async ({ basePage }) => {
  await expect(basePage.logoutButton).toBeVisible()
})
