module.exports = {
    "transform": {
        "^.+\\.tsx?$": "ts-jest",
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node",
    ],
    "setupFilesAfterEnv": ["<rootDir>/jest-setup.js"],
};
