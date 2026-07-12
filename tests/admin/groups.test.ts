import { test, expect } from '../../support/fixtures.ts'

test.describe('Group administration', () => {
  test('view create group page', async ({ basePage, page }) => {
    await basePage.navigateTo('/group/create')
    await expect(page.locator('body')).toContainText('Create Group')
  })
})
