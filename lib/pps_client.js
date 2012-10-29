var OAuth = require( 'oauth' ).OAuth;

var PpsClient = function ( config ) {
    "use strict";

    var self = this;

    // OAuth library includes "Accept: */*" in custom headers by default
    // but */* causes server to returns JSON for first leg of OAuth
    // which is expecting urlencoded response body.  Sending these custom
    // headers in the constructor overrides the problematic defaults
    var customHeaders = {
        "Connection": "close",
        "User-Agent": "Node authentication"
    };

    // instantiate and configure oauth client.
    var oauth = new OAuth(
        "", // requestUrl,
        config.accessTokenUrl,
        config.consumerKey,
        config.consumerSecret,
        config.version,
        config.authorize_callback,
        config.signatureMethod,
        undefined,                   // nonceSize
        customHeaders                // override default customHeader because of JSON issue above.
    );

    self.rootUrl = config.rootUrl;

    self.accessTokenExists = function() {
        return (self._oauth_access_token && self._oauth_access_token_secret);
    };

    /**
     * @param url - target url
     * @param callback - function ( error, data, response )
     */
    self.getUrl = function ( url, callback ) {
        var self = this;

        if ( self.accessTokenExists() ) {
            // we already have access token so execute GET request.
            oauth.get( url, self._oauth_access_token, self._oauth_access_token_secret, callback );
        } else {
            // no access token, so get access token then execute GET request.
            oauth.getOAuthAccessToken(
                "", // oauth_token
                "", // oauth_token_secret
                function ( error, oauth_access_token, oauth_access_token_secret, results ) {

                    if ( error ) {
                        callback( error, results );

                    } else {
                        // store access token for later calls.
                        self._oauth_access_token = oauth_access_token;
                        self._oauth_access_token_secret = oauth_access_token_secret;

                        // execute GET request.
                        oauth.get( url, oauth_access_token, oauth_access_token_secret, callback );
                    }
                }
            );
        }
    };

    //  callback = function ( error, data, response )
    self.getResource = function ( resourceName, params, callback ) {
        return self.getUrl( self.rootUrl + resourceName, callback );
    };

};


module.exports = PpsClient;
