import { createBdd } from 'playwright-bdd'
import { test, expect } from './fixtures.ts'

const { Given, When, Then } = createBdd(test)

// Global search
When('I type {string} into the global search', async ({ basePage }, term: string) => {
  await basePage.globalSearchInput.fill(term)
})

Then('I should see autocomplete suggestions appear', async ({ page }) => {
  await expect(page.locator('.ui-autocomplete')).toBeVisible()
})

When('I type a search term with results', async ({ page, basePage }) => {
  await basePage.globalSearchInput.fill('Ars')
  await page.waitForSelector('.ui-autocomplete')
})

When('I select the first autocomplete suggestion', async ({ page }) => {
  await page.locator('.ui-autocomplete .ui-menu-item').first().click()
})

Then('I should be navigated to a detail page', async ({ page }) => {
  await expect(page).not.toHaveURL('/')
})

// Cookie consent
Given('I have cleared my cookies', async ({ page }) => {
  await page.context().clearCookies()
})

Then('I should see the cookie consent banner', async ({ basePage }) => {
  await expect(basePage.cookieBanner).toBeVisible()
})

Given('the cookie consent banner is visible', async ({ page, basePage }) => {
  await page.context().clearCookies()
  await page.goto('/')
  await expect(basePage.cookieBanner).toBeVisible()
})

When('I accept cookies', async ({ page }) => {
  await page.locator('#cookie-banner button', { hasText: 'Accept' }).click()
})

Then('the cookie banner should be hidden', async ({ basePage }) => {
  await expect(basePage.cookieBanner).toBeHidden()
})
