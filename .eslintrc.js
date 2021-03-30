// .eslintrc.js

module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:mocha/recommended'],
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ['mocha'],
  rules: {},
};
