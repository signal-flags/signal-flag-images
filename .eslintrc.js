// .prettierrc.js

module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:mocha/recommended'],
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ['mocha'],
  rules: {},
};
