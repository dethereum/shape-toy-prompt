module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.lint.json"],
  },
  plugins: ["simple-import-sort", "import", "@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  rules: {
    "simple-import-sort/imports": [
      2,
      {
        // The default grouping, but with type imports first as a separate
        // group, sorting that group like non-type imports are grouped.
        groups: [
          ["^@?\\w.*\\u0000$", "^[^.].*\\u0000$", "^\\..*\\u0000$"],
          ["^\\u0000"],
          ["^@?\\w"],
          ["^"],
          ["^\\."],
        ],
      },
    ],
    "simple-import-sort/exports": 2,
    "import/first": 2,
    "import/newline-after-import": 2,
    "import/no-duplicates": 2,
    "@typescript-eslint/consistent-type-imports": 2,
  },
  settings: {
    react: {
      version: "18.1",
    },
  },
  overrides: [
    // cjs node rules
    {
      files: ["webpack.config.js", "jest.config.js", ".eslintrc.js"],
      extends: ["plugin:node/recommended-script"],
      env: {
        browser: false,
      },
      rules: {
        // requires are needed in cjs
        "@typescript-eslint/no-var-requires": 0,
        // we are not publishing this as a package so no danger
        "node/no-unpublished-require": 0,
      },
    },
    // jest rules
    {
      files: ["src/**/*.test.tsx", "src/**/*.test.ts"],
      extends: [
        "plugin:testing-library/react",
        "plugin:jest-dom/recommended",
        "plugin:jest/all",
        "plugin:jest-formatting/strict",
      ],
      env: {
        jest: true,
      },
      // turn off safety rules until can add type return to mock
      rules: {
        "@typescript-eslint/no-unsafe-assignment": 0,
        "@typescript-eslint/no-unsafe-member-access": 0,
        "@typescript-eslint/no-explicit-any": 0,
        "@typescript-eslint/no-unsafe-call": 0,
        // hooks reduce test loc too much to give up. keep beforeEach
        "jest/no-hooks": [
          2,
          {
            allow: ["beforeEach"],
          },
        ],
      },
    },
    // e2e rules
    {
      files: ["cypress/**/*.spec.ts"],
      extends: ["plugin:cypress/recommended"],
      env: {
        "cypress/globals": true,
      },
      // turn off safety rules until can figure out whats wrong
      rules: {
        "@typescript-eslint/no-unsafe-member-access": 0,
        "@typescript-eslint/no-unsafe-call": 0,
      },
    },
    // infra rules
    {
      files: ["infra/**/*.ts"],
      rules: {
        // totally valid to have """"unused""""" variables in pulumi code
        "@typescript-eslint/no-unused-vars": 0,
      },
    },
  ],
};
