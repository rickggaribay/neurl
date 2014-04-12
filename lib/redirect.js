/**
 * Created by Rick.Garibay on 11/9/13.
 */
var model = require("../model/model");

var neurlPrefix = "http://neurl.it"

exports.redirect = function (neurl, callback) {

    if (neurl == null) {
        console.log("No neurl received...")
        callback(new Error("Neurl suffix is required."), null);
        return;
    }

    // Get the original URL from the db

    model.submitNeurl(neurl, function (error, result) {

        callback(null, result)

    })

}

