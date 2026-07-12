import { test, expect } from '../../support/fixtures.ts'

test.describe('Teams', () => {
  test('displays a table of teams', async ({ teamsPage }) => {
    await teamsPage.goto()
    await expect(teamsPage.teamTable).toBeVisible()
  })

  test('searches for a team by name', async ({ teamsPage }) => {
    await teamsPage.goto()
    const firstTeam = await teamsPage.teamLinks.first().textContent()
    if (firstTeam) {
      await teamsPage.search(firstTeam.slice(0, 3))
    }
    await expect(teamsPage.teamTable).toBeVisible()
  })

  test('filters teams by division', async ({ teamsPage }) => {
    await teamsPage.goto()
    await teamsPage.divisionFilters.nth(1).click()
    await expect(teamsPage.teamTable).toBeVisible()
  })

  test('navigates to team detail', async ({ teamsPage, page }) => {
    await teamsPage.goto()
    await teamsPage.teamLinks.first().click()
    await expect(page).toHaveURL(/team\/detail/)
  })
})
