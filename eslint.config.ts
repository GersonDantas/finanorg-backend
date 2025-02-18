import love from 'eslint-config-love'

export default [
  {
    ...love,
    files: ['**/*.ts'],
    ignores: ['node_modules/**/*'],
    rules: {
      ...love.rules,
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/class-methods-use-this': 'off',
    },
  },
]
