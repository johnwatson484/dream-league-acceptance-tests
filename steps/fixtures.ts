import { test as base } from 'playwright-bdd'
import { BasePage } from '../pages/base.page.ts'
import { LoginPage } from '../pages/login.page.ts'
import { HomePage } from '../pages/home.page.ts'
import { ResultsPage } from '../pages/results.page.ts'
import { ResultsEditPage } from '../pages/results-edit.page.ts'
import { TeamsheetPage } from '../pages/teamsheet.page.ts'
import { TeamsheetEditPage } from '../pages/teamsheet-edit.page.ts'
import { PlayersPage } from '../pages/players.page.ts'
import { TeamsPage } from '../pages/teams.page.ts'
import { ManagersPage } from '../pages/managers.page.ts'
import { CupsPage } from '../pages/cups.page.ts'
import { FixturesPage } from '../pages/fixtures.page.ts'
import { MeetingsPage } from '../pages/meetings.page.ts'
import { HistoryPage } from '../pages/history.page.ts'
import { EntityFormPage } from '../pages/entity-form.page.ts'
import { ApiClient } from '../support/api-client.ts'

interface Fixtures {
  basePage: BasePage
  loginPage: LoginPage
  homePage: HomePage
  resultsPage: ResultsPage
  resultsEditPage: ResultsEditPage
  teamsheetPage: TeamsheetPage
  teamsheetEditPage: TeamsheetEditPage
  playersPage: PlayersPage
  teamsPage: TeamsPage
  managersPage: ManagersPage
  cupsPage: CupsPage
  fixturesPage: FixturesPage
  meetingsPage: MeetingsPage
  historyPage: HistoryPage
  entityFormPage: EntityFormPage
  apiClient: ApiClient
}

export const test = base.extend<Fixtures>({
  basePage: async ({ page }, use) => {
    await use(new BasePage(page))
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page))
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page))
  },
  resultsPage: async ({ page }, use) => {
    await use(new ResultsPage(page))
  },
  resultsEditPage: async ({ page }, use) => {
    await use(new ResultsEditPage(page))
  },
  teamsheetPage: async ({ page }, use) => {
    await use(new TeamsheetPage(page))
  },
  teamsheetEditPage: async ({ page }, use) => {
    await use(new TeamsheetEditPage(page))
  },
  playersPage: async ({ page }, use) => {
    await use(new PlayersPage(page))
  },
  teamsPage: async ({ page }, use) => {
    await use(new TeamsPage(page))
  },
  managersPage: async ({ page }, use) => {
    await use(new ManagersPage(page))
  },
  cupsPage: async ({ page }, use) => {
    await use(new CupsPage(page))
  },
  fixturesPage: async ({ page }, use) => {
    await use(new FixturesPage(page))
  },
  meetingsPage: async ({ page }, use) => {
    await use(new MeetingsPage(page))
  },
  historyPage: async ({ page }, use) => {
    await use(new HistoryPage(page))
  },
  entityFormPage: async ({ page }, use) => {
    await use(new EntityFormPage(page))
  },
  apiClient: async ({ }, use) => { // eslint-disable-line no-empty-pattern
    const client = new ApiClient()
    await client.login()
    await use(client)
  },
})

export { expect } from '@playwright/test'
