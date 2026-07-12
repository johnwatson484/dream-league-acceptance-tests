import { test, expect } from '../../support/fixtures.ts'

test.describe('Rules', () => {
  test('displays the league rules', async ({ basePage, page }) => {
    await basePage.navigateTo('/rules')
    await expect(page.locator('h2').first()).toBeVisible()
  })
})
