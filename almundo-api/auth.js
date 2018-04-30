'use strict'

const jwt = require('jsonwebtoken');

/* create token
    @Param<playload> data token
    @Param<secret> privat key
    @Param<callback> function response
*/
function sign(pyload, secret, time) {
    return jwt.sign(pyload, secret, {
        expiresIn: time
    });
}
/* verify token
    @Param<token>  token
    @Param<secret> privat key
    @Param<callback> function response
*/
function verify(token, secret) {
    return jwt.verify(token, secret);
}

module.exports = {
    sign,
    verify
}