import { test, expect } from '../../support/fixtures.ts'

test.describe('League data refresh', () => {
  test('view league refresh page with file upload', async ({ basePage, page }) => {
    await basePage.navigateTo('/league/refresh')
    await expect(page.locator('input[type="file"]')).toBeVisible()
  })
})
