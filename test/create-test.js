var assert = require("assert");
var should = require("should");
var app = require("../lib/create");


describe('Creating a new neurl', function () {

    it('should require an initial URL', function (done) {

        app.getNeurl(null, function (error, result) {
            should.exist(error);
            done();

        })
    });
    it('should return a neurl', function (done) {

        app.getNeurl("http://rickgaribay.net", function (error, result) {
            should.exist(result);
            done();



        })
    });

    it('should not return an error', function (done) {

        app.getNeurl("http://rickgaribay.net", function (error, result) {
            assert.equal(null, error);
            should.not.exist(error);
            done();
        })
    });

});

