var config = require( './api_config' ),
    OAuth = require( 'oauth' ).OAuth;

var merchId = "10001322";

var helper = new OAuth(
    "", // requestUrl,
    config.accessTokenUrl,
    config.consumerKey,
    config.consumerSecret,
    config.version,
    config.authorize_callback,
    config.signatureMethod
);

module.exports = helper;
