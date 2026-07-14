import nextPlugin from 'eslint-config-next';
import prettierConfig from 'eslint-config-prettier';

const eslintConfig = [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'out/**',
      'build/**',
      'dist/**',
      '.vercel/**',
      'coverage/**',
      'playwright-report/**',
      '*.config.js',
      '*.config.mjs',
    ],
  },
  ...nextPlugin,
  prettierConfig,
  {
    rules: {
      'react/no-unescaped-entities': 'off',
      '@next/next/no-html-link-for-pages': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
];

export default eslintConfig;
