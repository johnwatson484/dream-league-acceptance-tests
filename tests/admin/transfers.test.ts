import { test, expect } from '../../support/fixtures.ts'

test.describe('Transfer administration', () => {
  test('view transfers page', async ({ basePage, page }) => {
    await basePage.navigateTo('/transfers')
    await expect(page.locator('h2')).toBeVisible()
  })

  test('view create transfer page', async ({ basePage, page }) => {
    await basePage.navigateTo('/transfer/create')
    await expect(page.locator('body')).toContainText('Create Transfer')
    await expect(page.locator('#managerId')).toBeVisible()
    await expect(page.locator('#playerInId')).toBeVisible()
    await expect(page.locator('#type')).toBeVisible()
  })

  test('create a transfer', async ({ page, entityFormPage }) => {
    await page.goto('/transfer/create')
    await page.locator('#managerId').selectOption({ index: 1 })
    await page.locator('#playerInId').selectOption({ index: 1 })
    await page.locator('#type').selectOption('sealed-bid')
    await page.locator('#created').fill('2099-01-01')
    await entityFormPage.submit()
    await expect(page).toHaveURL(/\/transfers/)
  })
})
