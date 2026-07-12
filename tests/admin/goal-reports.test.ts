import { test, expect } from '../../support/fixtures.ts'

test.describe('Goal reports administration', () => {
  test('view goal reports page', async ({ basePage, page }) => {
    await basePage.navigateTo('/goal-reports')
    await expect(page.locator('h2')).toBeVisible()
  })

  test('view goal report submission page', async ({ basePage, page }) => {
    await basePage.navigateTo('/goal-report')
    await expect(page.locator('body')).toContainText('Report')
    await expect(page.locator('#managerId')).toBeVisible()
    await expect(page.locator('#playerId')).toBeVisible()
  })
})
