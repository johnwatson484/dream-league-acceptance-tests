import { test, expect } from '../../support/fixtures.ts'
import { SEED } from '../../support/seed-data.ts'

test.describe('Global search', () => {
  test('search shows autocomplete results', async ({ homePage, basePage, page }) => {
    await homePage.goto()
    const searchTerm = SEED.managers[0]!.slice(0, 4)
    await basePage.globalSearchInput.fill(searchTerm)
    await expect(page.locator('.ui-autocomplete')).toBeVisible()
  })

  test('selecting a result navigates to detail', async ({ homePage, basePage, page }) => {
    await homePage.goto()
    const searchTerm = SEED.managers[0]!.slice(0, 4)
    await basePage.globalSearchInput.fill(searchTerm)
    await page.waitForSelector('.ui-autocomplete')
    await page.locator('.ui-autocomplete .ui-menu-item').first().click()
    await expect(page).not.toHaveURL('/')
  })
})
