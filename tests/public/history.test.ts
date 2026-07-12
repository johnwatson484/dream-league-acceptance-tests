import { test, expect } from '../../support/fixtures.ts'

test.describe('History', () => {
  test('displays historical winners', async ({ historyPage }) => {
    await historyPage.goto()
    await expect(historyPage.historyTable).toBeVisible()
  })
})
