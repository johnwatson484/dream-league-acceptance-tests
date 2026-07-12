import { test, expect } from '../../support/fixtures.ts'
import { TEST_DATA } from '../../support/test-data.ts'

test.describe('Player administration', () => {
  test('view create player page', async ({ basePage, page }) => {
    await basePage.navigateTo('/league/player/create')
    await expect(page.locator('body')).toContainText('Create Player')
  })

  test('create a new player', async ({ entityFormPage, page }) => {
    await entityFormPage.gotoCreate('league/player')
    await entityFormPage.fillField('firstName', TEST_DATA.player.firstName)
    await entityFormPage.fillField('lastName', TEST_DATA.player.lastName)
    await page.locator('#position').selectOption({ label: TEST_DATA.player.position })
    await page.locator('#teamId').selectOption({ index: 1 })
    await entityFormPage.submit()
    await expect(page).toHaveURL(/\/league\/players/)
    await expect(page.locator('body')).toContainText(`${TEST_DATA.player.firstName} ${TEST_DATA.player.lastName}`)
  })

  test('edit a player', async ({ apiClient, page, entityFormPage }) => {
    await apiClient.createPlayer()
    await page.goto('/league/players')
    const row = page.locator('tr', { hasText: `${TEST_DATA.player.firstName} ${TEST_DATA.player.lastName}` })
    await row.locator('a[href*="player/edit"]').click()
    await page.locator('#firstName').clear()
    await page.locator('#firstName').fill('Updated')
    await entityFormPage.submit()
    await expect(page).toHaveURL(/\/league\/players/)
  })

  test('delete a player', async ({ apiClient, page, entityFormPage }) => {
    await apiClient.createPlayer()
    await page.goto('/league/players')
    const row = page.locator('tr', { hasText: `${TEST_DATA.player.firstName} ${TEST_DATA.player.lastName}` })
    await row.locator('a[href*="player/delete"]').click()
    await entityFormPage.submit()
    await expect(page).toHaveURL(/\/league\/players/)
    await expect(page.locator('body')).not.toContainText(`${TEST_DATA.player.firstName} ${TEST_DATA.player.lastName}`)
  })
})
