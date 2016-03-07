/**
 * Created by IrekRomaniuk on 3/7/2016.
 * Verify CIDR subnet format i.e 1.1.1.0/30, where mask is between 16 and 30 ' max 65534 hosts
 */


module.exports = function checknet(subnet) {

    var re = new
        RegExp('^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/[1-3][0-9]$');

    if (re.test(subnet)) return true;
    else return false

};