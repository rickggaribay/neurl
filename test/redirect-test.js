var assert = require("assert");
var should = require("should");
var app = require("../lib/redirect");

var neurlPrefix = "http://neurl.it/"

describe("Submitting a neurl", function () {
    it("should require a properly formatted URL", function () {
        app.redirect("I14MiU", function (error, result) {
            should.not.exist(error);
        });


    });

    it("should return a redirect URL as originally provided", function () {
        app.redirect("I14MiU", function (error, result) {
            var neurl = result;
            should.exist(neurl.url);
        });

    })

});