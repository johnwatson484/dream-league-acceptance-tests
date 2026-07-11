import { createBdd } from 'playwright-bdd'
import { test, expect } from './fixtures.ts'

const { Given, When, Then } = createBdd(test)

Given('I am on the teamsheet edit page', async ({ teamsheetEditPage }) => {
  await teamsheetEditPage.goto()
})

Then('I should see player input fields', async ({ teamsheetEditPage }) => {
  await expect(teamsheetEditPage.playerInputs.first()).toBeVisible()
})

Then('I should see keeper input fields', async ({ teamsheetEditPage }) => {
  await expect(teamsheetEditPage.keeperInputs.first()).toBeVisible()
})

When('I type in a player input field', async ({ teamsheetEditPage }) => {
  await teamsheetEditPage.playerInputs.first().fill('a')
})

Then('I should see autocomplete suggestions', async ({ page }) => {
  await expect(page.locator('.ui-autocomplete')).toBeVisible()
})

Then('I should see the file upload form', async ({ page }) => {
  await expect(page.locator('input[type="file"]')).toBeVisible()
})
