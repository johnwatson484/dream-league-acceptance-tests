import { test, expect } from '../../support/fixtures.ts'

test.describe('Fixtures', () => {
  test('displays fixtures page', async ({ fixturesPage, page }) => {
    await fixturesPage.goto()
    await expect(page.locator('h2')).toBeVisible()
  })
})
