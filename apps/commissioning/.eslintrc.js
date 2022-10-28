module.exports = {
  ...require('config/eslint-next.js'),
  plugins: ['formatjs', ...require('config/eslint-next.js').plugins],
  rules: {
    'formatjs/no-offset': 'error',
    ...require('config/eslint-next.js').rules,
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
};
