import type { Page, Locator } from '@playwright/test'

export class BasePage {
  constructor (protected readonly page: Page) {}

  async navigateTo (path: string): Promise<void> {
    await this.page.context().addCookies([{
      name: 'cookies_policy',
      value: Buffer.from(JSON.stringify({ confirmed: true, essential: true, analytics: false })).toString('base64'),
      domain: 'localhost',
      path: '/',
    }])
    await this.page.goto(path)
  }

  get navLinks (): Locator {
    return this.page.locator('.navbar-nav .nav-link')
  }

  get logoutButton (): Locator {
    return this.page.locator('button[type="submit"]', { hasText: 'Logout' })
  }

  get globalSearchInput (): Locator {
    return this.page.locator('#global-search')
  }

  get cookieBanner (): Locator {
    return this.page.locator('#cookie-banner')
  }

  async clickNavLink (text: string): Promise<void> {
    await this.page.locator('.navbar-nav .nav-link', { hasText: text }).click()
  }

  async clickNavDropdownItem (menu: string, item: string): Promise<void> {
    const navItem = this.page.locator('.navbar-nav .nav-item.dropdown', {
      has: this.page.locator('.nav-link.dropdown-toggle', { hasText: menu }),
    })
    await navItem.locator('.nav-link.dropdown-toggle').click()
    await navItem.locator('.dropdown-item', { hasText: item }).click()
  }

  async isLoggedIn (): Promise<boolean> {
    return this.logoutButton.isVisible()
  }

  async selectAutocompleteOption (input: Locator, term: string, optionText: string): Promise<void> {
    await input.fill(term)
    await this.page.locator('.ui-autocomplete .ui-menu-item').filter({ hasText: optionText }).click()
  }
}
