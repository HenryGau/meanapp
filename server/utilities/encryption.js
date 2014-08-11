/**
 * Created by HenryGau on 8/11/2014.
 */

var crypto = require('crypto');

exports.createSalt = function() {
    return crypto.randomBytes(128).toString('base64');
}

exports.hashPwd = function(salt, pwd){
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
}