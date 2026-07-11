import { createBdd } from 'playwright-bdd'
import { test, expect } from './fixtures.ts'

const { Given, When, Then } = createBdd(test)

Given('I navigate to the results edit page', async ({ resultsEditPage }) => {
  await resultsEditPage.goto()
})

Then('I should see the gameweek selector', async ({ resultsEditPage }) => {
  await expect(resultsEditPage.gameweekSelect).toBeVisible()
})

When('I select a gameweek for results entry', async ({ resultsEditPage }) => {
  const options = resultsEditPage.gameweekSelect.locator('option')
  const count = await options.count()
  if (count > 1) {
    await resultsEditPage.selectGameweek((await options.nth(1).getAttribute('value')) ?? '1')
  }
})

Then('the results form should be displayed', async ({ resultsEditPage }) => {
  await expect(resultsEditPage.plusButtons.first()).toBeVisible()
})

Given('I have selected a gameweek', async ({ resultsEditPage }) => {
  const options = resultsEditPage.gameweekSelect.locator('option')
  const count = await options.count()
  if (count > 1) {
    await resultsEditPage.selectGameweek((await options.nth(1).getAttribute('value')) ?? '1')
  }
  await expect(resultsEditPage.plusButtons.first()).toBeVisible()
})

When('I click the plus button for a player', async ({ resultsEditPage }) => {
  await resultsEditPage.clickPlus(0)
})

When('I click the minus button for that player', async ({ resultsEditPage }) => {
  await resultsEditPage.clickMinus(0)
})

Then('the goals input should show {string}', async ({ resultsEditPage }, value: string) => {
  await expect(resultsEditPage.resultInputs.first()).toHaveValue(value)
})
