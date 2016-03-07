/**
 * Created by IrekRomaniuk on 3/6/2016.
 */

var ip = require("ip");
var cidrRange = require('cidr-range');

var subnet = process.argv[2] || '1.1.1.0/25';
var re = new RegExp('^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/[0-9]{1,2}$');
if (! re.test(subnet)) {
    console.log('CIDR format required, should be i.e 1.1.1.0/30 (default)' );
    process.exit();
}
var source = ip.address();

var targets = cidrRange(subnet,{onlyHosts:true});
console.log('Pinging ', subnet, ' with ' + targets.length + ' hosts from ' + source + '\n');

var pingnet = require('./pingnet');
pingnet(targets
    , function (Replied, ms, Host){
        console.log('Replied: ' +  Replied + '/' + targets.length + ' ' +  ms + 'ms ' + Host)
    }
);





