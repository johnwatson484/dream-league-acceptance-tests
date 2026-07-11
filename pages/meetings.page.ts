import type { Locator } from '@playwright/test'
import { BasePage } from './base.page.ts'

export class MeetingsPage extends BasePage {
  async goto (): Promise<void> {
    await this.navigateTo('/meetings')
  }

  get meetingTable (): Locator {
    return this.page.locator('table')
  }
}
