/**
 * Created by irekromaniuk on 9/27/2015.
 * //wscat -c http://10.199.107.11:8000
 *  export NODE_TLS_REJECT_UNAUTHORIZED=0 wscat -c wss://10.29.121.244:8880
 */

var _  = require('lodash');
var ws = require('ws');

var clients = [];

exports.connect = function (server) {
  var wss = new ws.Server({server:server});
    wss.on('connection', function (ws) {
        //ws.send('hello!');
        clients.push(ws); // console.log(ws)
        //exports.broadcast(ws + ' client joined');
        ws.on('message', function(message) {
            //console.log('received: %s', message);
            exports.broadcast(message);
        });
        ws.on('close', function () {
            _.remove(clients, ws);
            console.log('client left')
        })
    })
};

exports.broadcast = function (latlng, data) {
    //var json = JSON.stringify({loc: latlng, data: data});
    clients.forEach(function (client) {
        client.send(latlng, data)
    })
};