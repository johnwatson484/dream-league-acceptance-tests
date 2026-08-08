import { test, expect } from '../../support/fixtures.ts'

test.describe('Home page', () => {
  test('displays league table, results, top scorers, and form', async ({ homePage }) => {
    await homePage.goto()
    await expect(homePage.leagueTable).toBeVisible()
    await expect(homePage.latestResults).toBeVisible()
    await expect(homePage.topScorers).toBeVisible()
    await expect(homePage.formTable).toBeVisible()
  })

  test('navigates to results from home', async ({ homePage, basePage, page }) => {
    await homePage.goto()
    await basePage.clickNavDropdownItem('Results', 'View')
    await expect(page).toHaveURL(/\/results/)
  })
})
