# grunt-tex-pdflatex [![Build Status](https://travis-ci.org/grunt-tex/grunt-tex-pdflatex.svg?branch=master)](https://travis-ci.org/grunt-tex/grunt-tex-pdflatex)

Part of the [grunt-tex](https://github.com/grunt-tex) suite of LaTeX-orientated Grunt tasks.

This plugin can be used to compile LaTeX files into PDFs using the application `pdflatex`.

## Getting Started
This plugin requires Grunt `~0.4.5` and pdflatex to be available.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-tex-pdflatex --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-tex-pdflatex');
```

## The "pdflatex" task

### Overview
In your project's Gruntfile, add a section named `pdflatex` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  pdflatex: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    }
  }
});
```

### Options

#### options.executable
Type: `String`
Default value: `pdflatex`

If pdflatex is not available on the command line as `pdflatex`, put it's location in this option.

#### options.args
Type: `Object`
Default value: `{ -interaction: nonstopmode, -file-line-error: null }`

An object of arguments to pass through to pdflatex as command line options. Check the pdflatex [man page](http://linux.die.net/man/1/pdflatex) for all options. A few rules are applied to these arguments:

* If the value of a key is `null`, it will be treated a flag, i.e. it will be compiled as `--option` rather than `--option=null`
* If the key starts with `-` and has a value, ` ` will be used to separate the key and value
* If the key starts with `--` and has a value, `=` will be used to separate the key and value

Without changing any arguments, pdflatex will be executed like so:

`pdflatex -interaction nonstopmode -file-line-error <document-name>`

### Usage Examples

#### Basic
This is the most basic usage of pdflatex:

```js
grunt.initConfig({
  pdflatex: "document.tex"
});
```

#### Multitask with custom options
In this example, pdflatex is used as a multitask, with custom options used for the first document in order to make pdflatex output to a custom directory

```js
grunt.initConfig({
  pdflatex: {
    options: {
      executable: "/usr/bin/pdflatex"
    },
    documentone: {
      options: {
        args: {
          "output-directory": "tmp"
        }
      },
      files: [{ src: "documentone.tex" }]
    },
    documenttwo: "documenttwo.tex"
  }
});
```

#### Compile without creating a PDF
In this example, an argument is passed to pdflatex to tell it not to turn the output into a PDF (useful if you are doing a preliminary LaTeX pass at the beginning of your build sequence).

```js
grunt.initConfig({
  pdflatex: {
    options: {
      args: {
        "draft-mode": null
      }
    },
    files: [{ src: "document.tex" }]
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* 2015-01-08   v0.1.0   Initial release
* 2015-01-08   v0.1.1   Clean up unnecessary code
* 2015-01-09   v0.2.0   Change argument handling