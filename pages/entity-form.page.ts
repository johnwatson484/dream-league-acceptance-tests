import type { Locator } from '@playwright/test'
import { BasePage } from './base.page.ts'

export class EntityFormPage extends BasePage {
  async gotoCreate (entity: string): Promise<void> {
    await this.navigateTo(`/${entity}/create`)
  }

  async gotoEdit (entity: string, queryParam: string, id: string): Promise<void> {
    await this.navigateTo(`/${entity}/edit?${queryParam}=${id}`)
  }

  async gotoDelete (entity: string, queryParam: string, id: string): Promise<void> {
    await this.navigateTo(`/${entity}/delete?${queryParam}=${id}`)
  }

  get submitButton (): Locator {
    return this.page.locator('button[type="submit"]')
  }

  get form (): Locator {
    return this.page.locator('form')
  }

  async fillField (name: string, value: string): Promise<void> {
    await this.page.locator(`#${name}`).fill(value)
  }

  async selectField (name: string, value: string): Promise<void> {
    await this.page.locator(`#${name}`).selectOption(value)
  }

  async submit (): Promise<void> {
    await this.submitButton.click()
  }
}
