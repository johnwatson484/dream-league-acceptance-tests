import { test, expect } from '../../support/fixtures.ts'

test.describe('Conceded', () => {
  test('displays conceded page', async ({ basePage, page }) => {
    await basePage.navigateTo('/conceded')
    await expect(page.locator('h2')).toBeVisible()
  })
})
