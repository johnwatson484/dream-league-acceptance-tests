import type { Locator } from '@playwright/test'
import { BasePage } from './base.page.ts'

export class CupsPage extends BasePage {
  async goto (cupId: string): Promise<void> {
    await this.navigateTo(`/cup/${cupId}`)
  }

  get groupStandings (): Locator {
    return this.page.locator('.card', { hasText: 'Group' })
  }

  get knockoutRounds (): Locator {
    return this.page.locator('.card', { hasText: 'Round' })
  }

  get fixtureLinks (): Locator {
    return this.page.locator('a[href*="fixture"]')
  }
}
