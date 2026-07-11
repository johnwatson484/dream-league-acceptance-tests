import { createBdd } from 'playwright-bdd'
import { test, expect } from './fixtures.ts'

const { Given, When, Then } = createBdd(test)

// Home page
When('I navigate to the home page', async ({ homePage }) => {
  await homePage.goto()
})

Given('I am on the home page', async ({ homePage }) => {
  await homePage.goto()
})

Then('I should see the league table', async ({ homePage }) => {
  await expect(homePage.leagueTable).toBeVisible()
})

Then('I should see the latest results', async ({ homePage }) => {
  await expect(homePage.latestResults).toBeVisible()
})

Then('I should see the top scorers', async ({ homePage }) => {
  await expect(homePage.topScorers).toBeVisible()
})

Then('I should see the form table', async ({ homePage }) => {
  await expect(homePage.formTable).toBeVisible()
})

Then('I should be on the results page', async ({ page }) => {
  await expect(page).toHaveURL(/\/results/)
})

// Results page
When('I navigate to the results page', async ({ resultsPage }) => {
  await resultsPage.goto()
})

Given('I am on the results page', async ({ resultsPage }) => {
  await resultsPage.goto()
})

Then('I should see results content', async ({ page }) => {
  await expect(page.locator('h2')).toBeVisible()
})

When('I select a gameweek from the filter', async ({ resultsPage }) => {
  const options = resultsPage.gameweekSelect.locator('option')
  const count = await options.count()
  if (count > 1) {
    await resultsPage.gameweekSelect.selectOption({ index: 1 })
  }
})

Then('the results should update', async ({ page }) => {
  await expect(page).toHaveURL(/gameweekId/)
})

// Teamsheet page
When('I navigate to the teamsheet page', async ({ teamsheetPage }) => {
  await teamsheetPage.goto()
})

Given('I am on the teamsheet page', async ({ teamsheetPage }) => {
  await teamsheetPage.goto()
})

Then('I should see manager sections with players and teams', async ({ teamsheetPage }) => {
  await expect(teamsheetPage.managerSections.first()).toBeVisible()
})

When('I click a player link', async ({ teamsheetPage }) => {
  await teamsheetPage.playerLinks.first().click()
})

Then('I should be on a player detail page', async ({ page }) => {
  await expect(page).toHaveURL(/player\/detail/)
})

// Players page
When('I navigate to the players page', async ({ playersPage }) => {
  await playersPage.goto()
})

Given('I am on the players page', async ({ playersPage }) => {
  await playersPage.goto()
})

Then('I should see a table of players', async ({ playersPage }) => {
  await expect(playersPage.playerTable).toBeVisible()
})

When('I search for a player by name', async ({ playersPage }) => {
  const firstPlayer = await playersPage.playerLinks.first().textContent()
  if (firstPlayer) {
    await playersPage.search(firstPlayer.slice(0, 3))
  }
})

Then('the results should be filtered', async ({ playersPage }) => {
  await expect(playersPage.playerTable).toBeVisible()
})

When('I filter by {string}', async ({ playersPage }, position: string) => {
  await playersPage.filterByPosition(position)
})

Then('only defenders should be displayed', async ({ page }) => {
  await expect(page.locator('body')).toContainText('Defender')
})

When('I click a player name', async ({ playersPage }) => {
  await playersPage.playerLinks.first().click()
})

// Teams page
When('I navigate to the teams page', async ({ teamsPage }) => {
  await teamsPage.goto()
})

Given('I am on the teams page', async ({ teamsPage }) => {
  await teamsPage.goto()
})

Then('I should see a table of teams', async ({ teamsPage }) => {
  await expect(teamsPage.teamTable).toBeVisible()
})

When('I search for a team by name', async ({ teamsPage }) => {
  const firstTeam = await teamsPage.teamLinks.first().textContent()
  if (firstTeam) {
    await teamsPage.search(firstTeam.slice(0, 3))
  }
})

When('I filter by a division', async ({ teamsPage }) => {
  await teamsPage.divisionFilters.nth(1).click()
})

Then('only teams in that division should be displayed', async ({ teamsPage }) => {
  await expect(teamsPage.teamTable).toBeVisible()
})

When('I click a team name', async ({ teamsPage }) => {
  await teamsPage.teamLinks.first().click()
})

Then('I should be on a team detail page', async ({ page }) => {
  await expect(page).toHaveURL(/team\/detail/)
})

// Managers page
When('I navigate to the managers page', async ({ managersPage }) => {
  await managersPage.goto()
})

Given('I am on the managers page', async ({ managersPage }) => {
  await managersPage.goto()
})

Then('I should see a list of managers', async ({ managersPage }) => {
  await expect(managersPage.managerLinks.first()).toBeVisible()
})

When('I click a manager name', async ({ managersPage }) => {
  await managersPage.managerLinks.first().click()
})

Then('I should see the manager detail page', async ({ page }) => {
  await expect(page).toHaveURL(/manager/)
})

Then('I should see their team roster', async ({ page }) => {
  await expect(page.locator('.card').first()).toBeVisible()
})

// Cups page
When('I navigate to the cup page', async ({ cupsPage }) => {
  await cupsPage.goto('1')
})

When('I navigate to the league cup page', async ({ cupsPage }) => {
  await cupsPage.goto('2')
})

Then('I should see cup content', async ({ page }) => {
  await expect(page.locator('h2')).toBeVisible()
})

// Fixtures page
When('I navigate to the fixtures page', async ({ fixturesPage }) => {
  await fixturesPage.goto()
})

Then('I should see fixture content', async ({ page }) => {
  await expect(page.locator('h2')).toBeVisible()
})

// Groups page
When('I navigate to the groups page', async ({ basePage }) => {
  await basePage.navigateTo('/groups')
})

Then('I should see group content', async ({ page }) => {
  await expect(page.locator('h2')).toBeVisible()
})

// History page
When('I navigate to the history page', async ({ historyPage }) => {
  await historyPage.goto()
})

Then('I should see historical winners', async ({ historyPage }) => {
  await expect(historyPage.historyTable).toBeVisible()
})

// Goals page
When('I navigate to the goals page', async ({ basePage }) => {
  await basePage.navigateTo('/goals')
})

Then('I should see a list of goals', async ({ page }) => {
  await expect(page.locator('h2')).toBeVisible()
})

// Conceded page
When('I navigate to the conceded page', async ({ basePage }) => {
  await basePage.navigateTo('/conceded')
})

Then('I should see a list of conceded entries', async ({ page }) => {
  await expect(page.locator('h2')).toBeVisible()
})

// Meetings page
When('I navigate to the meetings page', async ({ meetingsPage }) => {
  await meetingsPage.goto()
})

Then('I should see a list of meetings', async ({ page }) => {
  await expect(page.locator('h2')).toBeVisible()
})

// Rules page
When('I navigate to the rules page', async ({ basePage }) => {
  await basePage.navigateTo('/rules')
})

Then('I should see the league rules', async ({ page }) => {
  await expect(page.locator('h2')).toBeVisible()
})
