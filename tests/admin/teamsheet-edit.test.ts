import { test, expect } from '../../support/fixtures.ts'

test.describe('Teamsheet editing', () => {
  test('view teamsheet edit page', async ({ teamsheetEditPage }) => {
    await teamsheetEditPage.goto()
    await expect(teamsheetEditPage.playerInputs.first()).toBeVisible()
    await expect(teamsheetEditPage.keeperInputs.first()).toBeVisible()
  })

  test('player autocomplete shows results', async ({ teamsheetEditPage, page }) => {
    await teamsheetEditPage.goto()
    await teamsheetEditPage.playerInputs.first().fill('a')
    await expect(page.locator('.ui-autocomplete')).toBeVisible()
  })
})
