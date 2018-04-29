'use strict'

const jwt = require('jsonwebtoken');

/* create token
    @Param<playload> data token
    @Param<secret> privat key
    @Param<callback> function response
*/
function sign(playload, secret, callback) {
    jwt.sign(playload, screen, callback);
}
/* verify token
    @Param<token>  token
    @Param<secret> privat key
    @Param<callback> function response
*/
function verify(token, secret, callback) {
    jwt.verify(token, secret, callback);
}

module.exports = {
    sign,
    verify
}