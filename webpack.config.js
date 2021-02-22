const path = require("path");

module.exports = {
    entry: path.join(__dirname, "/src/index.ts"),
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    "babel-loader",
                    "ts-loader",
                ],
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        filename: "unipept-visualizations.js",
        path: path.resolve(__dirname, "dist"),
        library: "UnipeptVisualizations",
        libraryTarget: "umd",
        globalObject: "this",
    },
    mode: "production",
};
