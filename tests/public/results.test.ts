import { test, expect } from '../../support/fixtures.ts'

test.describe('Results', () => {
  test('displays results page', async ({ resultsPage, page }) => {
    await resultsPage.goto()
    await expect(page.locator('h2')).toBeVisible()
  })

  test('filters results by gameweek', async ({ resultsPage, page }) => {
    await resultsPage.goto()
    const options = resultsPage.gameweekSelect.locator('option')
    const count = await options.count()
    if (count > 1) {
      await resultsPage.gameweekSelect.selectOption({ index: 1 })
    }
    await expect(page).toHaveURL(/gameweekId/)
  })
})
