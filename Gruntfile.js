/*
 * grunt-tex-pdflatex
 * https://github.com/grunt-tex/grunt-tex-pdflatex
 *
 * Copyright (c) 2015 Oliver Woodings
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        "Gruntfile.js",
        "tasks/*.js",
        "<%= mochaTest.test.src %>"
      ],
      options: {
        jshintrc: ".jshintrc"
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ["tmp"]
    },

    // Need to ensure directory is created before tests are run
    mkdir: {
      tests: {
        options: {
          create: ["tmp"]
        }
      }
    },

    // Configuration to be run (and then tested).
    pdflatex: {
      options: {
        args: {
          "-output-directory": "tmp"
        }
      },
      succeed: "test/fixtures/succeed.tex",
      fail: "test/fixtures/fail.tex"
    },

    // Unit tests.
    mochaTest: {
      test: {
        options: {
          reporter: "spec"
        },
        src: ["test/test.js"]
      }
    }

  });

  // Actually load this plugins task(s).
  grunt.loadTasks("tasks");

  // Load NPM tasks
  require("load-grunt-tasks")(grunt);

  // Whenever the 'test' task is run, first clean the 'tmp' dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask("test", ["clean", "mkdir", "mochaTest"]);

  // By default, lint and run all tests.
  grunt.registerTask("default", ["jshint", "test"]);

};