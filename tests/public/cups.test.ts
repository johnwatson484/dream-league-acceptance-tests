import { test, expect } from '../../support/fixtures.ts'

test.describe('Cups', () => {
  test('displays cup page', async ({ cupsPage, page }) => {
    await cupsPage.goto('1')
    await expect(page.locator('h2')).toBeVisible()
  })

  test('displays league cup page', async ({ cupsPage, page }) => {
    await cupsPage.goto('2')
    await expect(page.locator('h2')).toBeVisible()
  })
})
