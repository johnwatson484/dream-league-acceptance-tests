import type { Locator } from '@playwright/test'
import { BasePage } from './base.page.ts'

export class HomePage extends BasePage {
  async goto (): Promise<void> {
    await this.navigateTo('/')
  }

  get leagueTable (): Locator {
    return this.page.locator('.card', { has: this.page.locator('.card-header', { hasText: 'Table' }) })
  }

  get topScorers (): Locator {
    return this.page.locator('.card', { has: this.page.locator('.card-header', { hasText: 'Top Scorers' }) })
  }

  get latestResults (): Locator {
    return this.page.locator('.card', { has: this.page.locator('.card-header', { hasText: 'Latest scores' }) })
  }

  get formTable (): Locator {
    return this.page.locator('.card', { has: this.page.locator('.card-header', { hasText: 'Form' }) })
  }
}
