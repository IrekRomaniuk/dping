/**
 * Created by irekromaniuk on 9/27/2015.
 * //wscat -c http://address:7777
 *  export NODE_TLS_REJECT_UNAUTHORIZED=0 wscat -c ws://address:7777
 */

var _  = require('lodash');
var ws = require('ws');
var ip = require("ip");
var cidrRange = require('cidr-range');
var pingnet = require('./pingnet');
var checknet = require('./checknet');
const Warning = 'Send me CIDR subnet, i.e 8.8.8.0/28, where mask is between 16 and 30 ';

var clients = [];

exports.connect = function (server) {
  var wss = new ws.Server({server:server});
    wss.on('connection', function (ws) {
        //ws.send('hello!');
        clients.push(ws); // console.log(ws)
        //exports.broadcast(ws + ' client joined');
        exports.broadcast(Warning);
        ws.on('message', function(message) {
            if (checknet(message)) { //Verify if request is CIDR mask
                exports.broadcast('Received subnet: '+ message);
                var source = ip.address();
                var targets = cidrRange(message,{onlyHosts:true});
                exports.broadcast('Pinging ' + message + ' with ' + targets.length + ' hosts from ' + source);
                pingnet(targets
                 , function (Replied, Pinged, Host){exports.broadcast(JSON.stringify('Replied: '+ Replied + '/' + Pinged + ' ' + Host));
                 });
            }
            else
                exports.broadcast(Warning);
        });
        ws.on('close', function () {
            _.remove(clients, ws);
            console.log('client left')
        })
    })
};

exports.broadcast = function (data) {
    clients.forEach(function (client) {
        client.send(data)
    })
};