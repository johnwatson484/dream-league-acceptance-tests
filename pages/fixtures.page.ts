import type { Locator } from '@playwright/test'
import { BasePage } from './base.page.ts'

export class FixturesPage extends BasePage {
  async goto (): Promise<void> {
    await this.navigateTo('/fixtures')
  }

  get fixtureTable (): Locator {
    return this.page.locator('table')
  }
}
