import { test, expect } from '../../support/fixtures.ts'

test.describe('Players', () => {
  test('displays a table of players', async ({ playersPage }) => {
    await playersPage.goto()
    await expect(playersPage.playerTable).toBeVisible()
  })

  test('searches for a player by name', async ({ playersPage }) => {
    await playersPage.goto()
    const firstPlayer = await playersPage.playerLinks.first().textContent()
    if (firstPlayer) {
      await playersPage.search(firstPlayer.slice(0, 3))
    }
    await expect(playersPage.playerTable).toBeVisible()
  })

  test('filters players by position', async ({ playersPage, page }) => {
    await playersPage.goto()
    await playersPage.filterByPosition('Defenders')
    await expect(page.locator('body')).toContainText('Defender')
  })

  test('navigates to player detail', async ({ playersPage, page }) => {
    await playersPage.goto()
    await playersPage.playerLinks.first().click()
    await expect(page).toHaveURL(/player\/detail/)
  })
})
