export const TEST_DATA = {
  manager: { name: 'Test Manager', alias: 'TM', emails: ['testmanager@example.com'] },
  player: { firstName: 'Test', lastName: 'Player', position: 'Midfielder' },
  team: { name: 'Test FC', alias: 'TFC' },
  cup: { name: 'Test Cup' },
  meeting: { date: '2099-12-31' },
  history: { year: 2098, teams: 8, league1: 'Test Winner' },
} as const
