module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ";",
            },
            dist: {
                // the files to concatenate
                src: ["src/**/*.js"],
                // the location of the resulting JS file
                dest: "dist/<%= pkg.name %>.js",
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
                    "dist/<%= pkg.name %>.es5.js": ["<%= concat.dist.dest %>"],
                },
            },
        },
    });

    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-babel");
    grunt.loadNpmTasks("gruntify-eslint");

    // the default task can be run just by typing "grunt" on the command line
    grunt.registerTask("default", ["eslint", "concat", "babel", "uglify"]);
};
