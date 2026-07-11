import type { Locator } from '@playwright/test'
import { BasePage } from './base.page.ts'

export class PlayersPage extends BasePage {
  async goto (): Promise<void> {
    await this.navigateTo('/league/players')
  }

  get searchInput (): Locator {
    return this.page.locator('#search')
  }

  get positionFilters (): Locator {
    return this.page.locator('.btn-group .btn')
  }

  get playerTable (): Locator {
    return this.page.locator('table')
  }

  get playerLinks (): Locator {
    return this.page.locator('a[href*="player/detail"]')
  }

  async filterByPosition (position: string): Promise<void> {
    await this.page.locator('.btn-group .btn', { hasText: position }).click()
  }

  async search (term: string): Promise<void> {
    await this.searchInput.fill(term)
    await this.searchInput.press('Enter')
  }
}
