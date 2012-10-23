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

helper.getUrl = function ( model, options, callback ) {
    var self = this;

    this.getOAuthAccessToken(
        "", // oauth_token
        "", // oauth_token_secret
        function ( error, oauth_access_token, oauth_access_token_secret, results ) {
            if ( error ) {
                callback( error, null, results );
            } else {
                var request = self.get( options.url, oauth_access_token, oauth_access_token_secret, callback );
            }
        }
    );
};


module.exports = helper;
