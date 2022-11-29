module.exports = {
  ...require('config/eslint-next.js'),
  rules: {
    'import/no-cycle': false,
    ...require('config/eslint-next.js').rules,
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
};
