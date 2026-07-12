import { test, expect } from '../../support/fixtures.ts'
import { TEST_DATA } from '../../support/test-data.ts'

test.describe('Team administration', () => {
  test('view create team page', async ({ basePage, page }) => {
    await basePage.navigateTo('/league/team/create')
    await expect(page.locator('body')).toContainText('Create Team')
  })

  test('create a new team', async ({ entityFormPage, page }) => {
    await entityFormPage.gotoCreate('league/team')
    await entityFormPage.fillField('name', TEST_DATA.team.name)
    await entityFormPage.fillField('alias', TEST_DATA.team.alias)
    await page.locator('#divisionId').selectOption({ index: 1 })
    await entityFormPage.submit()
    await expect(page).toHaveURL(/\/league\/teams/)
    await expect(page.locator('body')).toContainText(TEST_DATA.team.name)
  })

  test('edit a team', async ({ apiClient, page, entityFormPage }) => {
    await apiClient.createTeam()
    await page.goto('/league/teams')
    const row = page.locator('tr', { hasText: TEST_DATA.team.name }).first()
    await row.locator('a[href*="team/edit"]').click()
    await page.locator('#alias').clear()
    await page.locator('#alias').fill('TFCU')
    await entityFormPage.submit()
    await expect(page).toHaveURL(/\/league\/teams/)
  })

  test('delete a team', async ({ apiClient, page, entityFormPage }) => {
    await apiClient.createTeam()
    await page.goto('/league/teams')
    const rows = page.locator('tr', { hasText: TEST_DATA.team.name })
    const countBefore = await rows.count()
    await rows.first().locator('a[href*="team/delete"]').click()
    await entityFormPage.submit()
    await expect(page).toHaveURL(/\/league\/teams/)
    await expect(page.locator('tr', { hasText: TEST_DATA.team.name })).toHaveCount(countBefore - 1)
  })
})
