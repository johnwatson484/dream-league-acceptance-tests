import type { Locator } from '@playwright/test'
import { BasePage } from './base.page.ts'

export class ResultsEditPage extends BasePage {
  async goto (): Promise<void> {
    await this.navigateTo('/results/edit')
  }

  get gameweekSelect (): Locator {
    return this.page.locator('#gameweekId')
  }

  get submitButton (): Locator {
    return this.page.locator('button[type="submit"]')
  }

  get resultsAssistantButton (): Locator {
    return this.page.locator('#results-assistant')
  }

  get plusButtons (): Locator {
    return this.page.locator('.plus')
  }

  get minusButtons (): Locator {
    return this.page.locator('.minus')
  }

  get resultInputs (): Locator {
    return this.page.locator('.result-input')
  }

  async selectGameweek (value: string): Promise<void> {
    await this.gameweekSelect.selectOption(value)
  }

  async clickPlus (index: number): Promise<void> {
    await this.plusButtons.nth(index).click()
  }

  async clickMinus (index: number): Promise<void> {
    await this.minusButtons.nth(index).click()
  }

  async getInputValue (index: number): Promise<string> {
    return await this.resultInputs.nth(index).inputValue()
  }
}
