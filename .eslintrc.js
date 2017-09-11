module.exports = {
  extends: ['eslint:recommended', 'prettier'],
  parser: 'babel-eslint',
  env: {
    es6: true
  },
  ecmaFeatures: {
    modules: true
  },
  globals: {
    __DEV__: true
  },
  rules: {
    'import/no-unresolved': 'off',
    'import/no-unassigned-import': 'off',
    'import/prefer-default-export': 'off'
  }
}
