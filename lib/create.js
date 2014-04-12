
/**
 * Created by Rick.Garibay on 11/9/13.
 */
var neurlPrefix = "http://neurl.it/"
var model = require("../model/model");

exports.getNeurl = function (url, callback) {

    if (url == null) {
        console.log("No URL received...")
        callback(new Error("URL is required."));
    }
    else {

        //console.log(url + " received....")

        var neurlSuffix = genNeurlSuffix();

        var neurl = {url: url, neurl: neurlSuffix};

        //console.log("neurl " + neurl.neurl);

        model.create(neurl, function (error, result) {

            if(error == null){
            callback(null, neurlPrefix + result.neurl);
            }
            else{
                callback(error,null);
            }

        });

    }

    function genNeurlSuffix() {
        var characterStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // len = 24 + 24 + 10 = 58
        var characters = characterStr.split('');
        var uuid = "";
        for (var i = 0; i < 6; i++) {
            var rand = Math.round(Math.random() * 58);
            uuid = uuid + characters[rand];
        }

        return uuid;
    }


}