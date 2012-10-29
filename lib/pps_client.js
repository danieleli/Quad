var OAuth = require( 'oauth' ).OAuth;

var PpsClient = function ( config ) {
    "use strict";

    var self = this;

    // instantiate and configure oauth client.
    var oauth = new OAuth(
        "", // requestUrl,
        config.accessTokenUrl,
        config.consumerKey,
        config.consumerSecret,
        config.version,
        config.authorize_callback,
        config.signatureMethod,
        undefined,
        {   "Connection" : "close",
            "User-Agent" : "Node authentication"}
    );

    self.rootUrl = config.rootUrl;


    //  callback = function ( error, data, response )
    self.getUrl = function ( url, callback ) {
        var self = this;

        if ( self._oauth_access_token && self._oauth_access_token_secret ) {
            // we already have access token.
            oauth.get( url, self._oauth_access_token, self._oauth_access_token_secret, callback );
        } else {
            // no access token so get access token then execute GET.
            oauth.getOAuthAccessToken(
                "", // oauth_token
                "", // oauth_token_secret
                function ( error, oauth_access_token, oauth_access_token_secret, results ) {

                    if ( error ) {
                        callback( error, null, results );

                    } else {
                        // store access token for later calls
                        self._oauth_access_token = oauth_access_token;
                        self._oauth_access_token_secret = oauth_access_token_secret;

                        // GET url
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
