module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    'linebreak-style': ['error', 'windows'],
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'no-console': 'off',
    'import/extensions': 'off',
  },
};
