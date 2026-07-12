import { test, expect } from '../../support/fixtures.ts'

test.describe('Cookie consent', () => {
  test('banner shown on first visit', async ({ page, basePage }) => {
    await page.context().clearCookies()
    await page.goto('/')
    await expect(basePage.cookieBanner).toBeVisible()
  })

  test('accepting cookies hides the banner', async ({ page, basePage }) => {
    await page.context().clearCookies()
    await page.goto('/')
    await expect(basePage.cookieBanner).toBeVisible()
    await page.locator('#cookie-banner button', { hasText: 'Accept' }).click()
    await expect(basePage.cookieBanner).toBeHidden()
  })
})
