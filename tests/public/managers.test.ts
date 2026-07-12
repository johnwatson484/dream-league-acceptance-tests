import { test, expect } from '../../support/fixtures.ts'
import { SEED } from '../../support/seed-data.ts'

test.describe('Managers', () => {
  test('displays a list of managers', async ({ managersPage, page }) => {
    await managersPage.goto()
    await expect(managersPage.managerLinks.first()).toBeVisible()
    await expect(page.locator('body')).toContainText(SEED.managers[0]!)
  })

  test('navigates to manager detail with team roster', async ({ managersPage, page }) => {
    await managersPage.goto()
    await managersPage.managerLinks.first().click()
    await expect(page).toHaveURL(/manager/)
    await expect(page.locator('.card').first()).toBeVisible()
  })
})
