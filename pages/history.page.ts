import type { Locator } from '@playwright/test'
import { BasePage } from './base.page.ts'

export class HistoryPage extends BasePage {
  async goto (): Promise<void> {
    await this.navigateTo('/history')
  }

  get historyTable (): Locator {
    return this.page.locator('table')
  }
}
