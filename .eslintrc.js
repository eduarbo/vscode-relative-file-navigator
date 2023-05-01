/* eslint-env node */
/* eslint-disable @typescript-eslint/naming-convention */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  overrides: [
    {
      files: ['src/**/*'],
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
  ],
  rules: {
    '@typescript-eslint/semi': ['warn', 'never'],
    '@typescript-eslint/no-use-before-define': ['warn', 'nofunc'],
    '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/await-thenable': 'warn',
    '@typescript-eslint/require-await': 'error',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: {
          arguments: false,
        },
      },
    ],
    'import/prefer-default-export': 'off',
    'no-void': ['error', { allowAsStatement: true }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['src/test/**/*'],
        peerDependencies: true,
      },
    ],
  },
  ignorePatterns: ['out', 'dist', '**/*.d.ts'],
}
