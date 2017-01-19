module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        webpack: {
            dist: {
                entry: "./src/index.js",
                output: {
                    path: "dist/",
                    filename: "<%= pkg.name %>.js",
                },
                devtool: "source-map",
                module: {
                    loaders: [
                        {
                            loader: "babel-loader",
                        },
                    ],
                },
            },
        },
        eslint: {
            src: ["src/**/*.js"],
        },
        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: "/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today(\"dd-mm-yyyy\") %> */\n",
            },
            dist: {
                files: {
                    "dist/<%= pkg.name %>.min.js": ["dist/<%= pkg.name %>.es5.js"],
                },
            },
        },
        babel: {
            options: {
                sourceMap: true,
            },
            dist: {
                files: {
                    "dist/<%= pkg.name %>.es5.js": ["dist/<%= pkg.name %>.js"],
                },
            },
        },
    });

    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-babel");
    grunt.loadNpmTasks("grunt-webpack");
    grunt.loadNpmTasks("gruntify-eslint");

    // the default task can be run just by typing "grunt" on the command line
    grunt.registerTask("default", ["eslint", "webpack", "babel", "uglify"]);
};
