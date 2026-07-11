import type { Locator } from '@playwright/test'
import { BasePage } from './base.page.ts'

export class ManagersPage extends BasePage {
  async goto (): Promise<void> {
    await this.navigateTo('/managers')
  }

  get managerTable (): Locator {
    return this.page.locator('table')
  }

  get managerLinks (): Locator {
    return this.page.locator('a[href*="manager?managerId"]')
  }
}
