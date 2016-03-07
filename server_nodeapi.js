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

var port = process.env.PORT || 7770;    // set our port
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();  // get an instance of the express Router
// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});
// test route to make sure everything is working (accessed at GET http://address:7770/api)
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to pingnet api!' });
});
// route to to ping subnet (accessed at GET http://address:7770/api/subnet)
var pingnet = require('./pingnet');
var Readable = require('stream').Readable;
var rs = new Readable;
router.get('/:net', function (req, res) {
    console.log(req.params.net);
    //res.send('pinging net: ' + req.params.net);
    /*rs.on('data', function(data) {
        res.write(data);
    });*/
    rs._read = function () {
        pingnet(['8.8.8.8', '1.1.1.1', '10.199.107.1']
            , function (Replied, Pinged, Host){rs.push(JSON.stringify('Replied: '+ Replied + '/' + Pinged + ' ' + Host));}
        );
        //rs.push("Test");
    };
        rs.pipe(res);
});
var WebSocket = require('ws'), ws = new WebSocket('ws://localhost:7770',null, {rejectUnauthorized: false});
router.get('/ws/:net', function (req, res) {
    console.log(req.params.net);
    res.send('pinging net: ' + req.params.net);
    pingnet(['8.8.8.8', '1.1.1.1', '10.199.107.1']
        , function (Replied, Pinged, Host){ws.send(JSON.stringify('Replied: '+ Replied + '/' + Pinged + ' ' + Host));}
    );
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