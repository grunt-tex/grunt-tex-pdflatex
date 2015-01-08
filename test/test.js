var expect = require("chai").expect;
var exec   = require("exec");
var path   = require("path");

var execOpts = {
  cwd: path.join(__dirname, "..")
};

describe("When there are no TeX errors", function () {

  var out, code;
  before(function (done) {
    exec("grunt pdflatex:succeed", execOpts, function (_err, _out, _code) {
      out = _out;
      code = _code;
      done();
    });
  });

  it("should have output code 0", function () {
    expect(code).to.equal(0);
  });

  it("should output success message", function () {
    expect(out).to.contain("Done, without errors.");
    expect(out).to.contain("Compiled test/fixtures/succeed.tex");
  });

});

describe("When there are TeX errors", function () {

  var out, code;
  before(function (done) {
    exec("grunt pdflatex:fail", execOpts, function (_err, _out, _code) {
      out = _out;
      code = _code;
      done();
    });
  });

  it("should have output code 1", function () {
    expect(code).to.equal(1);
  });

  it("should output error message", function () {
    expect(out).to.contain("Undefined control sequence");
    expect(out).to.contain("Fatal error: Unable to compile test/fixtures/fail.tex");
  });

});