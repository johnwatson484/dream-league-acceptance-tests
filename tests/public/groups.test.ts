import { test, expect } from '../../support/fixtures.ts'

test.describe('Groups', () => {
  test('displays groups page', async ({ basePage, page }) => {
    await basePage.navigateTo('/groups')
    await expect(page.locator('h2')).toBeVisible()
  })
})
