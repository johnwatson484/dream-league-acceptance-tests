import { test, expect } from '../../support/fixtures.ts'
import { SEED } from '../../support/seed-data.ts'

test.describe('Head to Head', () => {
  test('displays head to head page', async ({ basePage, page }) => {
    await basePage.navigateTo('/head-to-head')
    await expect(page.locator('h2')).toBeVisible()
  })

  test('compares two managers', async ({ page }) => {
    await page.goto('/head-to-head')
    const selects = page.locator('select')
    const count = await selects.count()
    if (count >= 2) {
      await selects.nth(0).selectOption({ index: 1 })
      await selects.nth(1).selectOption({ index: 2 })
      await page.locator('button[type="submit"]').click()
      await expect(page.locator('body')).toContainText(SEED.managers[0]!)
    }
  })
})
