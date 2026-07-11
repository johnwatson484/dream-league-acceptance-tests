import type { Locator } from '@playwright/test'
import { BasePage } from './base.page.ts'

export class TeamsheetEditPage extends BasePage {
  async goto (): Promise<void> {
    await this.navigateTo('/teamsheet/edit')
  }

  get playerInputs (): Locator {
    return this.page.locator('.player-input')
  }

  get keeperInputs (): Locator {
    return this.page.locator('.keeper-input')
  }

  get refreshForm (): Locator {
    return this.page.locator('form[action="/teamsheet/refresh"]')
  }

  get fileInput (): Locator {
    return this.page.locator('input[type="file"]')
  }

  async selectPlayer (input: Locator, term: string, playerName: string): Promise<void> {
    await this.selectAutocompleteOption(input, term, playerName)
  }
}
