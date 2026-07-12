import { test, expect } from '../../support/fixtures.ts'

test.describe('Fixture administration', () => {
  test('view create fixture page', async ({ basePage, page }) => {
    await basePage.navigateTo('/fixture/create')
    await expect(page.locator('body')).toContainText('Create Fixture')
  })

  test('view fixtures generate page', async ({ basePage, page }) => {
    await basePage.navigateTo('/fixtures/generate')
    await expect(page.locator('body')).toContainText('Generate')
  })

  test('view fixtures reschedule page', async ({ basePage, page }) => {
    await basePage.navigateTo('/fixtures/reschedule')
    await expect(page.locator('body')).toContainText('Reschedule')
  })
})
