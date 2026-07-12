import { test, expect } from '../../support/fixtures.ts'

test.describe('Goals', () => {
  test('displays goals page', async ({ basePage, page }) => {
    await basePage.navigateTo('/goals')
    await expect(page.locator('h2')).toBeVisible()
  })
})
