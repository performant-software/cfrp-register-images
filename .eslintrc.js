module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  rules: {
    'react/prop-types': 'off'
  },
  env: {
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};
