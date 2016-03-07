/**
 * Created by IrekRomaniuk on 3/6/2016.
 * Reference: https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
 */
// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');    // call express
var app        = express();             // define our app using express
var bodyParser = require('body-parser');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 7777;    // set our port
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();  // get an instance of the express Router
// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    //console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});
// test route to make sure everything is working (accessed at GET http://address:7777/api)
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to dping api version 0.0.1!' });
});

// more routes for our API will happen here
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
var http = require('http');
var server = http.createServer(app);
server.listen(port);
//app.listen(port); // doesn't need 'http' , 3 lines above
require('./websocket.js').connect(server);
console.log('Magic happens on port ' + port);