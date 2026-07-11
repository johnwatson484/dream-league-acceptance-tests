import { env } from './env.ts'
import { TEST_DATA } from './test-data.ts'

interface Entity {
  [key: string]: unknown
}

export class ApiClient {
  private token: string | null = null

  async login (): Promise<void> {
    const response = await fetch(`${env.API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: env.TEST_EMAIL, password: env.TEST_PASSWORD }),
    })

    if (!response.ok) {
      throw new Error(`Login failed: ${response.status} ${response.statusText}`)
    }

    const data = await response.json() as { token: string }
    this.token = data.token
  }

  private async get (path: string): Promise<Entity[]> {
    const response = await fetch(`${env.API_URL}${path}`)
    if (!response.ok) {
      return []
    }
    return await response.json() as Entity[]
  }

  private async post (path: string, payload: Record<string, unknown>): Promise<Entity> {
    const response = await fetch(`${env.API_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`POST ${path} failed: ${response.status} ${response.statusText}`)
    }

    return await response.json() as Entity
  }

  private async deleteEntity (path: string, payload: Record<string, unknown>): Promise<void> {
    const response = await fetch(`${env.API_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      console.warn(`  Warning: delete ${path} returned ${response.status}`)
    }
  }

  // Create methods

  async createManager (data?: { name?: string; alias?: string; emails?: string[] }): Promise<Entity> {
    return this.post('/manager/create', { ...TEST_DATA.manager, ...data })
  }

  async createPlayer (data?: { firstName?: string; lastName?: string; position?: string; teamId?: number }): Promise<Entity> {
    const payload: Record<string, unknown> = { ...TEST_DATA.player, ...data }
    if (!payload.teamId) {
      const teams = await this.get('/league/teams')
      if (teams.length === 0) {
        throw new Error('No teams available to assign player to')
      }
      payload.teamId = teams[0]!.teamId as number
    }
    return this.post('/league/player/create', payload)
  }

  async createTeam (data?: { name?: string; alias?: string; divisionId?: number }): Promise<Entity> {
    const payload: Record<string, unknown> = { ...TEST_DATA.team, ...data }
    if (!payload.divisionId) {
      const divisions = await this.get('/league/divisions')
      if (divisions.length === 0) {
        throw new Error('No divisions available to assign team to')
      }
      payload.divisionId = divisions[0]!.divisionId as number
    }
    return this.post('/league/team/create', payload)
  }

  async createCup (data?: { name?: string }): Promise<Entity> {
    return this.post('/cup/create', { ...TEST_DATA.cup, ...data })
  }

  async createMeeting (data?: { date?: string }): Promise<Entity> {
    return this.post('/meeting/create', { ...TEST_DATA.meeting, ...data })
  }

  async createHistory (data?: { year?: number; teams?: number; league1?: string }): Promise<Entity> {
    return this.post('/history/create', { ...TEST_DATA.history, ...data })
  }

  // Cleanup methods

  async cleanupManagers (): Promise<void> {
    const managers = await this.get('/managers')
    const testManagers = managers.filter((m) => {
      const name = String(m.name || '')
      return name.includes(TEST_DATA.manager.name)
    })

    for (const manager of testManagers) {
      console.log(`  Cleaning up manager: ${manager.name} (id: ${manager.managerId})`)
      await this.deleteEntity('/manager/delete', { managerId: manager.managerId })
    }
  }

  async cleanupPlayers (): Promise<void> {
    const players = await this.get('/league/players')
    const testPlayers = players.filter((p) => {
      const firstName = String(p.firstName || '')
      const lastName = String(p.lastName || '')
      const fullName = `${firstName} ${lastName}`
      return fullName === `${TEST_DATA.player.firstName} ${TEST_DATA.player.lastName}` || fullName === `Updated ${TEST_DATA.player.lastName}`
    })

    for (const player of testPlayers) {
      console.log(`  Cleaning up player: ${player.firstName} ${player.lastName} (id: ${player.playerId})`)
      await this.deleteEntity('/league/player/delete', { playerId: player.playerId })
    }
  }

  async cleanupTeams (): Promise<void> {
    const teams = await this.get('/league/teams')
    const testTeams = teams.filter((t) => String(t.name || '') === TEST_DATA.team.name)

    for (const team of testTeams) {
      console.log(`  Cleaning up team: ${team.name} (id: ${team.teamId})`)
      await this.deleteEntity('/league/team/delete', { teamId: team.teamId })
    }
  }

  async cleanupCups (): Promise<void> {
    const cups = await this.get('/cups')
    const testCups = cups.filter((c) => {
      const name = String(c.name || '')
      return name.includes(TEST_DATA.cup.name)
    })

    for (const cup of testCups) {
      console.log(`  Cleaning up cup: ${cup.name} (id: ${cup.cupId})`)
      await this.deleteEntity('/cup/delete', { cupId: cup.cupId })
    }
  }

  async cleanupMeetings (): Promise<void> {
    const meetings = await this.get('/meetings')
    const testMeetings = meetings.filter((m) => {
      const date = String(m.date || '')
      return date.startsWith('2099')
    })

    for (const meeting of testMeetings) {
      console.log(`  Cleaning up meeting: ${meeting.date} (id: ${meeting.meetingId})`)
      await this.deleteEntity('/meeting/delete', { meetingId: meeting.meetingId })
    }
  }

  async cleanupHistory (): Promise<void> {
    const history = await this.get('/history')
    const testHistory = history.filter((h) => Number(h.year) === TEST_DATA.history.year)

    for (const entry of testHistory) {
      console.log(`  Cleaning up history: year ${entry.year} (id: ${entry.historyId})`)
      await this.deleteEntity('/history/delete', { historyId: entry.historyId })
    }
  }

  async cleanupAll (): Promise<void> {
    await this.cleanupManagers()
    await this.cleanupPlayers()
    await this.cleanupTeams()
    await this.cleanupCups()
    await this.cleanupMeetings()
    await this.cleanupHistory()
  }
}
