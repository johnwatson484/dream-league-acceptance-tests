import { createBdd } from 'playwright-bdd'
import { test } from './fixtures.ts'
import { TEST_DATA } from '../support/test-data.ts'

const { Given, When } = createBdd(test)

// Precondition steps — create entities via API to avoid order dependencies

Given('a manager {string} exists', async ({ apiClient }, name: string) => {
  await apiClient.createManager({ name })
})

Given('a player {string} exists', async ({ apiClient }, fullName: string) => {
  const parts = fullName.split(' ')
  const firstName = parts[0] ?? ''
  const lastName = parts.slice(1).join(' ')
  await apiClient.createPlayer({ firstName, lastName })
})

Given('a team {string} exists', async ({ apiClient }, name: string) => {
  await apiClient.createTeam({ name })
})

Given('a cup {string} exists', async ({ apiClient }, name: string) => {
  await apiClient.createCup({ name })
})

Given('a meeting on {string} exists', async ({ apiClient }, date: string) => {
  await apiClient.createMeeting({ date })
})

Given('a history entry for year {string} exists', async ({ apiClient }, year: string) => {
  await apiClient.createHistory({ year: Number(year), teams: TEST_DATA.history.teams, league1: TEST_DATA.history.league1 })
})

// Declarative entity creation steps

When('I create a manager named {string} with alias {string} and email {string}', async ({ entityFormPage }, name: string, alias: string, email: string) => {
  await entityFormPage.gotoCreate('manager')
  await entityFormPage.fillField('name', name)
  await entityFormPage.fillField('alias', alias)
  await entityFormPage.fillField('email1', email)
  await entityFormPage.submit()
})

When('I create a player with first name {string} and last name {string} as a {string}', async ({ entityFormPage, page }, firstName: string, lastName: string, position: string) => {
  await entityFormPage.gotoCreate('league/player')
  await entityFormPage.fillField('firstName', firstName)
  await entityFormPage.fillField('lastName', lastName)
  await page.locator('#position').selectOption({ label: position })
  await page.locator('#teamId').selectOption({ index: 1 })
  await entityFormPage.submit()
})

When('I create a team named {string} with alias {string}', async ({ entityFormPage, page }, name: string, alias: string) => {
  await entityFormPage.gotoCreate('league/team')
  await entityFormPage.fillField('name', name)
  await entityFormPage.fillField('alias', alias)
  await page.locator('#divisionId').selectOption({ index: 1 })
  await entityFormPage.submit()
})

When('I create a cup named {string}', async ({ entityFormPage }, name: string) => {
  await entityFormPage.gotoCreate('cup')
  await entityFormPage.fillField('name', name)
  await entityFormPage.submit()
})

When('I create a meeting on {string}', async ({ entityFormPage }, date: string) => {
  await entityFormPage.gotoCreate('meeting')
  await entityFormPage.fillField('date', date)
  await entityFormPage.submit()
})

When('I create a history entry for year {string} with {string} teams won by {string}', async ({ entityFormPage }, year: string, teams: string, winner: string) => {
  await entityFormPage.gotoCreate('history')
  await entityFormPage.fillField('year', year)
  await entityFormPage.fillField('teams', teams)
  await entityFormPage.fillField('league1', winner)
  await entityFormPage.submit()
})

// Form interactions

When('I fill in {string} with {string}', async ({ entityFormPage }, field: string, value: string) => {
  await entityFormPage.fillField(field, value)
})

When('I clear and fill in {string} with {string}', async ({ page }, field: string, value: string) => {
  await page.locator(`#${field}`).clear()
  await page.locator(`#${field}`).fill(value)
})

When('I select {string} for {string}', async ({ page }, value: string, field: string) => {
  await page.locator(`#${field}`).selectOption({ label: value })
})

When('I select the first option for {string}', async ({ page }, field: string) => {
  const select = page.locator(`#${field}`)
  const options = select.locator('option')
  const count = await options.count()
  if (count > 1) {
    await select.selectOption({ index: 1 })
  }
})

// Entity navigation — name-based lookups (players, teams, managers, cups, meetings, history)

Given('I navigate to edit player {string}', async ({ page }, name: string) => {
  await page.goto('/league/players')
  const row = page.locator('tr', { hasText: name })
  await row.locator('a[href*="player/edit"]').click()
})

Given('I navigate to delete player {string}', async ({ page }, name: string) => {
  await page.goto('/league/players')
  const row = page.locator('tr', { hasText: name })
  await row.locator('a[href*="player/delete"]').click()
})

Given('I navigate to edit team {string}', async ({ page }, name: string) => {
  await page.goto('/league/teams')
  const row = page.locator('tr', { hasText: name })
  await row.locator('a[href*="team/edit"]').click()
})

Given('I navigate to delete team {string}', async ({ page }, name: string) => {
  await page.goto('/league/teams')
  const row = page.locator('tr', { hasText: name })
  await row.locator('a[href*="team/delete"]').click()
})

Given('I navigate to edit manager {string}', async ({ page }, name: string) => {
  await page.goto('/managers')
  const row = page.locator('tr', { hasText: name })
  await row.locator('a[href*="manager/edit"]').click()
})

Given('I navigate to delete manager {string}', async ({ page }, name: string) => {
  await page.goto('/managers')
  const row = page.locator('tr', { hasText: name })
  await row.locator('a[href*="manager/delete"]').click()
})

Given('I navigate to edit cup {string}', async ({ page }, name: string) => {
  await page.goto('/cups')
  const row = page.locator('tr', { hasText: name })
  await row.locator('a[href*="cup/edit"]').click()
})

Given('I navigate to delete cup {string}', async ({ page }, name: string) => {
  await page.goto('/cups')
  const row = page.locator('tr', { hasText: name })
  await row.locator('a[href*="cup/delete"]').click()
})

Given('I navigate to edit meeting {string}', async ({ page }, date: string) => {
  await page.goto('/meetings')
  const row = page.locator('tr', { hasText: date })
  await row.locator('a[href*="meeting/edit"]').click()
})

Given('I navigate to delete meeting {string}', async ({ page }, date: string) => {
  await page.goto('/meetings')
  const row = page.locator('tr', { hasText: date })
  await row.locator('a[href*="meeting/delete"]').click()
})

Given('I navigate to delete history entry {string}', async ({ page }, year: string) => {
  await page.goto('/history')
  const row = page.locator('tr', { hasText: year })
  await row.locator('a[href*="history/delete"]').click()
})
