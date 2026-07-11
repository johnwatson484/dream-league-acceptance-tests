import type { Locator } from '@playwright/test'
import { BasePage } from './base.page.ts'

export class TeamsPage extends BasePage {
  async goto (): Promise<void> {
    await this.navigateTo('/league/teams')
  }

  get searchInput (): Locator {
    return this.page.locator('#search')
  }

  get divisionFilters (): Locator {
    return this.page.locator('.btn-group .btn')
  }

  get teamTable (): Locator {
    return this.page.locator('table')
  }

  get teamLinks (): Locator {
    return this.page.locator('a[href*="team/detail"]')
  }

  async filterByDivision (division: string): Promise<void> {
    await this.page.locator('.btn-group .btn', { hasText: division }).click()
  }

  async search (term: string): Promise<void> {
    await this.searchInput.fill(term)
    await this.searchInput.press('Enter')
  }
}
