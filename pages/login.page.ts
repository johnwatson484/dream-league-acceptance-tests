import type { Locator } from '@playwright/test'
import { BasePage } from './base.page.ts'

export class LoginPage extends BasePage {
  async goto (): Promise<void> {
    await this.navigateTo('/login')
  }

  get emailInput (): Locator {
    return this.page.locator('#email')
  }

  get passwordInput (): Locator {
    return this.page.locator('#password')
  }

  get submitButton (): Locator {
    return this.page.locator('button[type="submit"]')
  }

  get message (): Locator {
    return this.page.locator('form + p + p')
  }

  async login (email: string, password: string): Promise<void> {
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.submitButton.click()
  }
}
