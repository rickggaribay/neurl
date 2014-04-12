var express = require("express");

var create = require("./lib/create");
var redirect = require("./lib/redirect");
var hits = require("./lib/hits");

var app = express();
app.set('port', process.env.PORT || 1337);


app.listen(app.get('port'));

console.log('Neurl server listening on port ' + app.get('port'));


app.post("/create", express.bodyParser(), function (req, res) {

    console.log("Recieved: " + req.body.Url);
    if (req === null || req.body.Url === undefined || req.body.Url === null) {

        res.send(400, "Please provide a url if you want me to neurl.it.");

    }
    else {

        create.getNeurl(req.body.Url, function (error, result) {
            console.log("Sent: " + result);
            res.send(201,result);
        })

    }

})

app.get("/:uuid", function (req, res) {

    var neurl = req.params.uuid;

    if(neurl == null)
    {
        res.send(400,"The neurl you submitted appears to be incomplete.")
    }

    redirect.redirect(neurl, function (error, result) {

        if(!error)
        {
            res.redirect(result.url);
        }
        else
        {
            res.send(404, "Oops. We can't seem to find the neurl you submitted.");

        }

    })


})

app.get("/:uuid/hits", function (req, res) {


    var neurl = req.params.uuid;

     hits.getHits(neurl,function(error,result){


         console.log("In Neurl hits returned " + result);

         res.send(result.toString());

         //res.send("42");


     })

})

