import { test, expect } from '../../support/fixtures.ts'

test.describe('Results entry', () => {
  test('view results edit page with gameweek selector', async ({ resultsEditPage }) => {
    await resultsEditPage.goto()
    await expect(resultsEditPage.gameweekSelect).toBeVisible()
  })

  test('select a gameweek shows results form', async ({ resultsEditPage }) => {
    await resultsEditPage.goto()
    const options = resultsEditPage.gameweekSelect.locator('option')
    const count = await options.count()
    if (count > 1) {
      await resultsEditPage.selectGameweek((await options.nth(1).getAttribute('value')) ?? '1')
    }
    await expect(resultsEditPage.plusButtons.first()).toBeVisible()
  })

  test('increment goals for a player', async ({ resultsEditPage }) => {
    await resultsEditPage.goto()
    const options = resultsEditPage.gameweekSelect.locator('option')
    const count = await options.count()
    if (count > 1) {
      await resultsEditPage.selectGameweek((await options.nth(1).getAttribute('value')) ?? '1')
    }
    await expect(resultsEditPage.plusButtons.first()).toBeVisible()
    const before = Number(await resultsEditPage.getInputValue(0))
    await resultsEditPage.clickPlus(0)
    await expect(resultsEditPage.resultInputs.first()).toHaveValue(String(before + 1))
  })

  test('decrement goals for a player', async ({ resultsEditPage }) => {
    await resultsEditPage.goto()
    const options = resultsEditPage.gameweekSelect.locator('option')
    const count = await options.count()
    if (count > 1) {
      await resultsEditPage.selectGameweek((await options.nth(1).getAttribute('value')) ?? '1')
    }
    await expect(resultsEditPage.plusButtons.first()).toBeVisible()
    await resultsEditPage.clickPlus(0)
    const before = Number(await resultsEditPage.getInputValue(0))
    await resultsEditPage.clickMinus(0)
    await expect(resultsEditPage.resultInputs.first()).toHaveValue(String(before - 1))
  })
})
