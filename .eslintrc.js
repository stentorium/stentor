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
        // We want to slowly turn these on, one by one.
        "@typescript-eslint/explicit-member-accessibility": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-angle-bracket-type-assertion": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/no-object-literal-type-assertion": "off",
        "@typescript-eslint/indent": "off",
        "@typescript-eslint/array-type": "off",
        "@typescript-eslint/camelcase": "off",
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
