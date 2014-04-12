var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/neurl');

//var cx = 'mongodb://api:p2ssw0rd1@ds030607.mongolab.com:30607/neurl';

var cx = process.env.NEURL_MONGOLABSCX;

mongoose.connect(cx);
console.log("CX is:" + cx);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("Connected to MongoDB");
});

var schema = mongoose.Schema({ url:String, neurl:String, hits:Number });
var Neurl = mongoose.model('neurl', schema);

var repo = function () {
};

exports.create = function (neurl, callback) {

    var currentNeurl = new Neurl({url:neurl.url, neurl:neurl.neurl, hits:0});

    //console.log("Neurl value is: " + currentNeurl.neurl);

    currentNeurl.save(function (err) {
        //console.log("error: " + err);
        callback(err, neurl);
    });

};

exports.submitNeurl = function (neurl, callback) {


    Neurl.findOneAndUpdate({neurl:neurl}, { $inc:{ hits:1 }}, {upsert:true}, function (error, theNeurl) {

        console.log("Found neurl with a neurl value of " + theNeurl.neurl + " and a URL value of: " + theNeurl.url);

        callback(error, theNeurl);
    })
};

exports.getHits = function (neurl, callback) {

    Neurl.findOne({neurl:neurl},function (error, theNeurl) {
        console.log(theNeurl.hits + " found");
        callback(error,theNeurl.hits);

    })
}

//exports.repo = repo;
