/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest',

  },
  rules: {
    'vue/multi-word-component-names': 0,
    // 0 关闭  1警告  2错误
    'no-use-before-define': 0,
    '@typescript-eslint/no-use-before-define': 2,
    '@typescript-eslint/no-explicit-any': 0,
    // 'no-explicit-any': false,
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    'no-unused-vars': 0,
    // 禁用末尾逗号
    'comma-dangle': 0

  }
};
