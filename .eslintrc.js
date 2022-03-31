// eslint-disable-next-line no-undef
module.exports = {
    root: true,
    extends: ["eslint:recommended"],
    plugins: ["@typescript-eslint"],
    rules: {
        "no-console": "error",
        "no-debugger": "error",
        "indent": ["error", 4],
        "max-len": ["warn", { "code": 120 }],
        "object-curly-spacing": ["error", "always"],
        "quotes": ["error", "double"],
        "space-before-function-paren": ["error", "never"],
        "no-inner-declarations": "off",
        "brace-style": ["error", "1tbs"],
        "keyword-spacing": "error",
        "no-async-promise-executor": "off",
        "require-atomic-updates": "off",
        "no-unused-vars": "off"
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        "ecmaVersion": 6,
        "sourceType": "module",
    },
    env: {
        "browser": true,
        "node": true,
        "jest": true
    }
}
