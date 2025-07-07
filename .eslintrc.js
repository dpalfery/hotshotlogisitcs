module.exports = {
  extends: [
    'eslint:recommended', 
    '@react-native-community',
    'plugin:prettier/recommended'
  ],
  plugins: [
    'react-native'
  ],
  env: {
    'react-native/react-native': true,
    es6: true,
    node: true
  },
  rules: {
    'react-native/no-unused-styles': 'error',
    'react-native/split-platform-components': 'error',
    'react-native/no-inline-styles': 'warn',
    'react-native/no-color-literals': 'warn',
    'react-native/no-raw-text': 'warn',
    'quotes': ['error', 'single', { 'avoidEscape': true }],
    'curly': ['error', 'all']
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  }
};