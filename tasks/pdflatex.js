/*
 * grunt-tex-pdflatex
 * https://github.com/grunt-tex/grunt-tex-pdflatex
 *
 * Copyright (c) 2015 Oliver Woodings
 * Licensed under the MIT license.
 */

var when = require("when");
var lift = require("when/node").lift;
var exec = lift(require("exec"));
var _    = require("lodash-node");
var path = require("path");

module.exports = function(grunt) {

  grunt.registerMultiTask("pdflatex", "Grunt pdflatex task", function() {

    var done = this.async();

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      executable: "pdflatex"
    });

    // Collate arguments for pdflatex
    var defaultArgs = {
      "-interaction": "nonstopmode",
      "-file-line-error": null
    };
    var argsObj = _.extend(defaultArgs, options.args);
    var args = [options.executable];
    _.each(argsObj, function (value, key) {
      if (value !== null) {
        if (key.substr(0, 2) === "--") {
          args.push(key + "=" + value);
        } else {
          args.push(key);
          args.push(value);
        }
      } else {
        args.push(key);
      }
    });

    // Iterate over all specified files, executing pdflatex on them
    var promises = this.filesSrc.map(function (file) {
      return exec([].concat([], args, [file]))
        .spread(function (out, code) {
          // Return results as an object
          return {
            file: file,
            out: out,
            code: code
          };
        });
    });

    // When all files have been processed, indicate task has finished
    when.all(promises).then(function (results) {
      results.forEach(processResult);
      done();
    });

  });

  function processResult(result) {
    if (result.code === 0) {
      grunt.log.ok("Compiled " + result.file);
    } else {
      var out = result.out.split("\n");

      _.chain(result.out.split("\n"))
        .filter(function (line) {
          return /^(.+?)\:(\d+)\: /.test(line);
        })
        .map(function (line) {
          var parts = line.match(/^(.+?)\:(\d+)\: (.+)$/);
          return {
            file: parts[1],
            line: parts[2],
            msg: parts[3]
          };
        })
        .each(function (error) {
          grunt.log.error(error.file + ":" + error.line + " " + error.msg);
        });

      grunt.fail.fatal("Unable to compile " + result.file);
    }
  }

};