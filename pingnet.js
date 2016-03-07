/**
 * Created by IrekRomaniuk on 5/1/2015.
 */
var ping = require('net-ping');
module.exports =
//pingnet(targets);
function pingnet (targets, callback) {
    var counterReplied = 0, counterDead = 0;
// Default options
    var options = {
        networkProtocol: ping.NetworkProtocol.IPv4,
        packetSize: 16,
        retries: 2,
        sessionId: (process.pid % 65535),
        timeout: 1000,
        ttl: 128
    };
    var session = ping.createSession(options);
    targets.forEach(function (target) {
            session.pingHost(target, function (error, traget, sent, rcvd) {
                var ms = rcvd - sent;
                if (error) {
                    counterDead++;
                }
                else {
                    counterReplied++;
                    callback(counterReplied, ms, target);
                }
            });
        });
};













