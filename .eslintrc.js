/*
 * @Descripttion:
 * @version:
 * @Author: tiptop
 * @Date: 2020-07-12 23:28:53
 * @LastEditors: tiptop
 * @LastEditTime: 2020-07-19 10:11:50
 */

module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "airbnb-base",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module",
  },
  plugins: ["vue"],
  rules: {
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "global-require": 0,
    "func-names": 0,
    "guard-for-in": 0,
    "no-restricted-syntax": 0,
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
    "no-console": 0,
    "import/no-unresolved": 0,
    "no-shadow": 0,
    "no-param-reassign": 0,
    "import/extensions": 0,
  },
};
