import { test, expect } from '../../support/fixtures.ts'
import { TEST_DATA } from '../../support/test-data.ts'

test.describe('Meeting administration', () => {
  test('view create meeting page', async ({ basePage, page }) => {
    await basePage.navigateTo('/meeting/create')
    await expect(page.locator('body')).toContainText('Create Meeting')
  })

  test('create a new meeting', async ({ entityFormPage, page }) => {
    await entityFormPage.gotoCreate('meeting')
    await entityFormPage.fillField('date', TEST_DATA.meeting.date)
    await entityFormPage.submit()
    await expect(page).toHaveURL(/\/meetings/)
    await expect(page.locator('body')).toContainText('2099')
  })

  test('edit a meeting', async ({ apiClient, page, entityFormPage }) => {
    await apiClient.createMeeting()
    await page.goto('/meetings')
    const row = page.locator('tr', { hasText: '2099' }).first()
    await row.locator('a[href*="meeting/edit"]').click()
    await page.locator('#date').clear()
    await page.locator('#date').fill('2099-06-15')
    await entityFormPage.submit()
    await expect(page).toHaveURL(/\/meetings/)
  })

  test('delete a meeting', async ({ apiClient, page, entityFormPage }) => {
    await apiClient.createMeeting()
    await page.goto('/meetings')
    const row = page.locator('tr', { hasText: '2099' }).first()
    await row.locator('a[href*="meeting/delete"]').click()
    await entityFormPage.submit()
    await expect(page).toHaveURL(/\/meetings/)
  })
})
