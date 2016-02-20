/*
* Project Elll Server.
*/

var express = require("express");
var app = express();

var bodyParser = require("body-parser");

//Support for https
/*var https = require("https");
var fs = require("fs");

var options = 
{
	key: fs.readFileSync("key.pem"),
	cert: fs.readFileSync("cert.pem")
};*/	

//Required for getting the request data.
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//Adding the required implementation files for API's.
var getDoodlies = require("./api/routes/GetDoodlies"); 
var updateDoodlyStatus = require("./api/routes/UpdateDoodlyStatus"); 

//Exposing the services.
app.post("/doodly/rest/v1/getdoodlies", getDoodlies.getDoodliesImpl);
app.post("/doodly/rest/v1/updateDoodlydtatus", updateDoodlyStatus.updateDoodlyStatusImpl);

// Starting the http server.
app.listen(8090);
console.log("Listening on port 8090...");

//Starting the https server.
//https.createServer(options, app).listen(8086);
//console.log("Listening on port 8086...");

