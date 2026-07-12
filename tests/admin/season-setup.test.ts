import { test, expect } from '../../support/fixtures.ts'
import { SEED } from '../../support/seed-data.ts'

test.describe('Season setup', () => {
  test('view season setup page', async ({ basePage, page }) => {
    await basePage.navigateTo('/league/season-setup')
    await expect(page.locator('h2')).toBeVisible()
  })

  test('displays teams by division', async ({ page }) => {
    await page.goto('/league/season-setup')
    await expect(page.locator('body')).toContainText(SEED.divisions[0]!)
    await expect(page.locator('body')).toContainText(SEED.divisions[1]!)
    await expect(page.locator('body')).toContainText(SEED.divisions[2]!)
  })

  test('displays promotion and relegation selects', async ({ page }) => {
    await page.goto('/league/season-setup')
    await expect(page.locator('select').first()).toBeVisible()
  })
})
