module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  extends: [
    "plugin:@typescript-eslint/recommended" // Uses the recommended rules from the @typescript-eslint/eslint-plugin
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module" // Allows for the use of imports
  },
  plugins: ["notice"],
  rules: {
    "notice/notice": [
      "error",
      {
        mustMatch: "Copyright \\(c\\) [0-9]{0,4}, XAPPmedia",
        template: "/*! Copyright (c) <%= YEAR %>, XAPPmedia */\n"
      }
    ],
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    // We want to slowly turn these all of these to level 2, errors.
    "@typescript-eslint/explicit-member-accessibility": 1,
    "@typescript-eslint/explicit-function-return-type": 2,
    "@typescript-eslint/no-unused-vars": 2,
    "@typescript-eslint/no-explicit-any": 1,
    "@typescript-eslint/no-var-requires": 2,
    "@typescript-eslint/no-use-before-define": 2,
    "@typescript-eslint/no-inferrable-types": 2,
    "@typescript-eslint/no-angle-bracket-type-assertion": 2,
    "@typescript-eslint/no-empty-interface": 1,
    "@typescript-eslint/no-object-literal-type-assertion": 2,
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/array-type": 1,
    "@typescript-eslint/camelcase": 2,
    // No consoles except console.error.  Slowly remove each level as we go through them
    "no-console": ["error", { allow: ["info", "warn", "error"] }]
  },
  overrides: [
    {
      // Turning this the return-type rule off in test files so we don't have to put void at the end of every mocha describe function.
      files: ["*.test.ts"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": "off"
      }
    }
  ]
};
