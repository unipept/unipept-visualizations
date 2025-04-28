import { defineConfig, globalIgnores } from 'eslint/config';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default defineConfig([
    globalIgnores(['dist/*', 'node_modules/*', 'build/*']),
    {
        files: ['**/*.ts', '**/*.tsx'], // Include TypeScript and Vue files
        languageOptions: {
            parser: typescriptParser, // Use vue-eslint-parser for Vue files\
        },
        plugins: {
            '@typescript-eslint': typescriptPlugin,
        },
        settings: {
            'import/resolver': {
                node: {
                    extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
                },
            },
        },
        rules: {
            // TypeScript rules
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/no-var-requires': 'off',
        },
    },
    {
        files: ['**/*.js'], // Separate rules for JavaScript files
        rules: {
            '@typescript-eslint/no-unused-vars': 'off', // Disable unused var check for JS
        },
    },
]);