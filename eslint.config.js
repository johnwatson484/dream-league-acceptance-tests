import neostandard from 'neostandard'

export default [
  { ignores: ['.generated-tests/**'] },
  ...neostandard({ ts: true }),
  {
    rules: {
      curly: ['error', 'all'],
    },
  },
]
