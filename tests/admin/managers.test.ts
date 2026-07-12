import { test, expect } from '../../support/fixtures.ts'
import { TEST_DATA } from '../../support/test-data.ts'

test.describe('Manager administration', () => {
  test('view create manager page', async ({ basePage, page }) => {
    await basePage.navigateTo('/manager/create')
    await expect(page.locator('body')).toContainText('Create Manager')
  })

  test('create a new manager', async ({ entityFormPage, page }) => {
    await entityFormPage.gotoCreate('manager')
    await entityFormPage.fillField('name', TEST_DATA.manager.name)
    await entityFormPage.fillField('alias', TEST_DATA.manager.alias)
    await entityFormPage.fillField('email1', TEST_DATA.manager.emails[0])
    await entityFormPage.submit()
    await expect(page).toHaveURL(/\/managers/)
    await expect(page.locator('body')).toContainText(TEST_DATA.manager.name)
  })

  test('edit a manager', async ({ apiClient, page, entityFormPage }) => {
    await apiClient.createManager()
    await page.goto('/managers')
    const row = page.locator('tr', { hasText: TEST_DATA.manager.name })
    await row.locator('a[href*="manager/edit"]').click()
    await page.locator('#alias').clear()
    await page.locator('#alias').fill('TMgr')
    await entityFormPage.submit()
    await expect(page).toHaveURL(/\/managers/)
  })

  test('delete a manager', async ({ apiClient, page, entityFormPage }) => {
    await apiClient.createManager()
    await page.goto('/managers')
    const row = page.locator('tr', { hasText: TEST_DATA.manager.name })
    await row.locator('a[href*="manager/delete"]').click()
    await entityFormPage.submit()
    await expect(page).toHaveURL(/\/managers/)
    await expect(page.locator('body')).not.toContainText(TEST_DATA.manager.name)
  })
})
