import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // Stricter rules for better code quality
      'no-console': 'warn',
      'no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_', // Ignore variables starting with _
          argsIgnorePattern: '^_', // Ignore function parameters starting with _
          ignoreRestSiblings: true, // Ignore unused vars when destructuring with rest
          args: 'after-used', // Only check args that come after the last used arg
          enums: false,
        },
      ],
      'no-undef': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
]);
