import js from '@eslint/js';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
    { ignores: ['dist/*', 'types/*', 'node_modules/*', 'examples/*'] },

    js.configs.recommended,
    ...typescriptPlugin.configs['flat/recommended'],

    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: typescriptParser,
        },
        rules: {
            // The d3 selection/datum generics are impractical to spell out for
            // every callback, so `any` stays allowed. Revisit if the d3 typings
            // ever make this cheap.
            '@typescript-eslint/no-explicit-any': 'off',
            // The visualizations reach into DOM nodes that d3 hands back as
            // possibly-null; asserting is the idiomatic way to use that API.
            '@typescript-eslint/no-non-null-assertion': 'off',
            // Empty arrow functions are the natural "no-op" default for the
            // optional event callbacks in the settings objects.
            '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
            // `@ts-ignore` is silently a no-op once the code below it type-checks
            // again, so it hides rot; `@ts-expect-error` fails the build instead.
            // Descriptions are not required: the existing suppressions are almost
            // all "the d3 typings do not model this", which adds no information.
            '@typescript-eslint/ban-ts-comment': ['error', {
                'ts-expect-error': false,
                'ts-ignore': true,
                'ts-nocheck': true,
                'ts-check': false,
            }],
            // d3 hands callbacks a fixed (datum, index, groups) signature and
            // event handlers a fixed (event, datum) one, so an argument often
            // only exists to reach the one after it. Prefix those with `_`.
            '@typescript-eslint/no-unused-vars': ['error', {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_',
            }],
        },
    },
];
