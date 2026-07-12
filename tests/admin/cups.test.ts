import { test, expect } from '../../support/fixtures.ts'
import { TEST_DATA } from '../../support/test-data.ts'

test.describe('Cup administration', () => {
  test('view create cup page', async ({ basePage, page }) => {
    await basePage.navigateTo('/cup/create')
    await expect(page.locator('body')).toContainText('Create Cup')
  })

  test('create a new cup', async ({ entityFormPage, page }) => {
    await entityFormPage.gotoCreate('cup')
    await entityFormPage.fillField('name', TEST_DATA.cup.name)
    await entityFormPage.submit()
    await expect(page).toHaveURL(/\/cups/)
    await expect(page.locator('body')).toContainText(TEST_DATA.cup.name)
  })

  test('edit a cup', async ({ apiClient, page, entityFormPage }) => {
    await apiClient.createCup()
    await page.goto('/cups')
    const row = page.locator('tr', { hasText: TEST_DATA.cup.name })
    await row.locator('a[href*="cup/edit"]').click()
    await page.locator('#name').clear()
    await page.locator('#name').fill('Test Cup Updated')
    await entityFormPage.submit()
    await expect(page).toHaveURL(/\/cups/)
  })

  test('delete a cup', async ({ apiClient, page, entityFormPage }) => {
    await apiClient.createCup()
    await page.goto('/cups')
    const row = page.locator('tr', { hasText: TEST_DATA.cup.name })
    await row.locator('a[href*="cup/delete"]').click()
    await entityFormPage.submit()
    await expect(page).toHaveURL(/\/cups/)
    await expect(page.locator('body')).not.toContainText(TEST_DATA.cup.name)
  })
})
