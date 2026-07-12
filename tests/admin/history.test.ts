import { test, expect } from '../../support/fixtures.ts'
import { TEST_DATA } from '../../support/test-data.ts'

test.describe('History administration', () => {
  test('view create history page', async ({ basePage, page }) => {
    await basePage.navigateTo('/history/create')
    await expect(page.locator('body')).toContainText('Create History')
  })

  test('create a history entry', async ({ entityFormPage, page }) => {
    await entityFormPage.gotoCreate('history')
    await entityFormPage.fillField('year', String(TEST_DATA.history.year))
    await entityFormPage.fillField('teams', String(TEST_DATA.history.teams))
    await entityFormPage.fillField('league1', TEST_DATA.history.league1)
    await entityFormPage.submit()
    await expect(page).toHaveURL(/\/history/)
    await expect(page.locator('body')).toContainText(String(TEST_DATA.history.year))
  })

  test('delete a history entry', async ({ apiClient, page, entityFormPage }) => {
    await apiClient.createHistory()
    await page.goto('/history')
    const row = page.locator('tr', { hasText: String(TEST_DATA.history.year) })
    await row.locator('a[href*="history/delete"]').click()
    await entityFormPage.submit()
    await expect(page).toHaveURL(/\/history/)
    await expect(page.locator('body')).not.toContainText(String(TEST_DATA.history.year))
  })
})
