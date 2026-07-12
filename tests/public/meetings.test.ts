import { test, expect } from '../../support/fixtures.ts'

test.describe('Meetings', () => {
  test('displays meetings page', async ({ meetingsPage, page }) => {
    await meetingsPage.goto()
    await expect(page.locator('h2')).toBeVisible()
  })
})
