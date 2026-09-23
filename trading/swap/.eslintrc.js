module.exports = {
  extends: ['react-app'],
  ignorePatterns: ['node_modules'],
  rules: {
    // Disable prettier rules temporarily to focus on functionality
    'prettier/prettier': 'off',
    'react/jsx-pascal-case': ['warn', { allowAllCaps: true, allowNamespace: true }],
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'prettier/prettier': 'off',
      },
    },
  ],
}
