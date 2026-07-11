import type { Locator } from '@playwright/test'
import { BasePage } from './base.page.ts'

export class TeamsheetPage extends BasePage {
  async goto (): Promise<void> {
    await this.navigateTo('/teamsheet')
  }

  get managerSections (): Locator {
    return this.page.locator('.card')
  }

  get playerLinks (): Locator {
    return this.page.locator('a[href*="player/detail"]')
  }

  get teamLinks (): Locator {
    return this.page.locator('a[href*="team/detail"]')
  }
}
