module.exports = {
  extends: [
    "airbnb",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  settings: {

  },
  plugins: [

  ],
  env: {
    // "jest": true
  },
  globals: {
    // name: 'off'
  },
  rules: {
    "no-console": process.env.NODE_ENV === 'production' ? 1 : 0,
    "comma-dangle": 0,
    "arrow-parens": 0,
    "no-confusing-arrow": 0,
    "import/extensions": [2,
      {
        js: "never",
        ts: "never",
        jsx: "never",
        tsx: "never",
        json: "always"
      }
    ],
    "arrow-body-style": 0,
    "no-plusplus": 0,
    "no-underscore-dangle": 0,
    "max-len": [
      0, 
      {
        code: 150
      }
    ],
    "consistent-return": 0,
    "@typescript-eslint/no-use-before-define": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "no-new": 0,
    "padded-blocks": 0,
    "import/prefer-default-export": 0,
    "@typescript-eslint/no-empty-function": 0,
    quotes: [2, "single", { "allowTemplateLiterals": true }],
    "@typescript-eslint/no-var-requires": 0,
    "global-require": 0,
    "import/no-dynamic-require": 0,
    "no-restricted-syntax": 0,
    "class-methods-use-this": 0
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ["@typescript-eslint"],
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
          modules: true
        }
      },
      rules: {
        'import/no-unresolved': [0, {
          commonjs: true,
          caseSensitive: true
        }],
        "no-unused-vars": 0,
        "prettier/prettier": "off",
        "@typescript-eslint/explicit-function-return-type": 0,
        "@typescript-eslint/no-explicit-any": 0,
        "@typescript-eslint/no-unused-vars": 2
      }
    }
  ]
}