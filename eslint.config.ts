import love from 'eslint-config-love'

export default [
  {
    ...love,
    files: ['**/*.ts'],
    ignores: ['node_modules/**/*'],
  },
]
