import { test, expect } from '../../support/fixtures.ts'

test.describe('Teamsheet', () => {
  test('displays manager sections with players and teams', async ({ teamsheetPage }) => {
    await teamsheetPage.goto()
    await expect(teamsheetPage.managerSections.first()).toBeVisible()
  })

  test('navigates to player detail from teamsheet', async ({ teamsheetPage, page }) => {
    await teamsheetPage.goto()
    await teamsheetPage.playerLinks.first().click()
    await expect(page).toHaveURL(/player\/detail/)
  })
})
