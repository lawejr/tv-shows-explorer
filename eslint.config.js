import js from '@eslint/js'
import eslintReact from '@eslint-react/eslint-plugin'
import stylistic from '@stylistic/eslint-plugin'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      eslintReact.configs['recommended-typescript'],
      reactHooks.configs.flat['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@eslint-react/no-unnecessary-use-prefix': 'off',
      '@stylistic/max-len': [
        'error',
        {
          code: 120,
          comments: 120,
        },
      ],
      '@stylistic/list-style': [
        'error',
        {
          overrides: {
            ObjectExpression: {
              singleLine: {
                maxItems: 0,
              },
              multiLine: {
                minItems: 1,
              },
            },
          },
        },
      ],
      '@stylistic/jsx-closing-tag-location': ['error', 'tag-aligned'],
      '@stylistic/jsx-one-expression-per-line': ['error', { allow: 'none' }],
      '@stylistic/jsx-wrap-multilines': [
        'error',
        {
          declaration: 'parens-new-line',
          assignment: 'parens-new-line',
          return: 'parens-new-line',
          arrow: 'parens-new-line',
          condition: 'parens-new-line',
          logical: 'parens-new-line',
          prop: 'parens-new-line',
          propertyValue: 'parens-new-line',
        },
      ],
      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
      ],
    },
  },
)
