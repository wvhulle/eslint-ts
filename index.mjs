import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["**/prisma/client/**/*", "**/vitest.config.ts", "**/svelte.config.js"],
}, ...compat.extends(
    "@wvhulle/eslint-config-node",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
), {
    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        parser: tsParser,
        ecmaVersion: 2022,
        sourceType: "module",

        parserOptions: {
            project: true,
        },
    },

    settings: {
        "import/resolver": {
            typescript: true,
            node: true,
        },
    },

    rules: {
        "@typescript-eslint/naming-convention": ["warn", {
            selector: "variableLike",
            format: ["snake_case"],
            leadingUnderscore: "allow",
        }, {
            selector: "variable",
            types: ["boolean"],
            format: ["snake_case"],
            prefix: ["is_", "should_", "has_", "can_", "did_", "will_"],
        }],

        "@typescript-eslint/no-shadow": "error",
        "@typescript-eslint/consistent-indexed-object-style": "off",
        "@typescript-eslint/consistent-type-assertions": ["warn"],
        "@typescript-eslint/consistent-type-definitions": "off",
        "@typescript-eslint/consistent-type-imports": "off",
        "@typescript-eslint/no-confusing-non-null-assertion": ["warn"],
        "@typescript-eslint/no-duplicate-type-constituents": ["warn"],
        "@typescript-eslint/no-floating-promises": ["error"],
        "@typescript-eslint/no-throw-literal": ["warn"],
        "@typescript-eslint/no-unnecessary-condition": ["error"],
        "@typescript-eslint/no-unnecessary-type-arguments": ["error"],

        "@typescript-eslint/no-unused-vars": ["warn", {
            argsIgnorePattern: "^_",
            caughtErrorsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
        }],

        "@typescript-eslint/restrict-template-expressions": 0,
        "unused-imports/no-unused-imports-ts": "warn",
    },
}];