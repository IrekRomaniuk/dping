/**
 * Created by IrekRomaniuk on 3/6/2016.
 */

var ip = require("ip");
var cidrRange = require('cidr-range');

var pingnet = require('./pingnet');
var checknet = require('./checknet');

var subnet = process.argv[2] || '8.8.8.0/28';

if (! checknet(subnet)) {
    console.log('CIDR format required, should be i.e 1.1.1.0/30 (default), where mask is between 16 and 30 ' );
    process.exit();
}

var source = ip.address();
var targets = cidrRange(subnet,{onlyHosts:true});

console.log('Pinging ', subnet, ' with ' + targets.length + ' hosts from ' + source + '\n');

pingnet(targets
    , function (Replied, ms, Host){
        console.log('Replied: ' +  Replied + '/' + targets.length + ' ' +  ms + 'ms ' + Host)
    }
);





