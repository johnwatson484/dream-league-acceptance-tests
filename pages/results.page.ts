import type { Locator } from '@playwright/test'
import { BasePage } from './base.page.ts'

export class ResultsPage extends BasePage {
  async goto (): Promise<void> {
    await this.navigateTo('/results')
  }

  get gameweekSelect (): Locator {
    return this.page.locator('#gameweekId')
  }

  get resultsTable (): Locator {
    return this.page.locator('table')
  }

  async selectGameweek (value: string): Promise<void> {
    await this.gameweekSelect.selectOption(value)
  }
}
