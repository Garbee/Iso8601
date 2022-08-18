module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'google',
  ],
  env: {
    'es2020': true,
    'node': true,
  },
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'max-len': ['error', {
      code: 60,
      ignoreRegExpLiterals: true,
      ignoreUrls: true,
    }],
  },
};
