var OAuth = require( 'oauth' ).OAuth;

OAuth.prototype.getOAuthAccessToken = function ( oauth_token, oauth_token_secret, oauth_verifier, callback ) {
    var extraParams = {};
    if ( typeof oauth_verifier === "function" ) {
        callback = oauth_verifier;
    } else {
        extraParams.oauth_verifier = oauth_verifier;
    }

    this._performSecureRequest( oauth_token, oauth_token_secret, this._clientOptions.accessTokenHttpMethod,
        this._accessUrl, extraParams, null, null, function ( error, data, response ) {
            if ( error ) {
                callback( error );
            }
            else {
                var results;
                if ( response.headers['content-type'].indexOf( 'json' ) > 0 ) {
                    results = JSON.parse( data );
                } else {
                    results = querystring.parse( data );
                }

                var oauth_access_token = results["oauth_token"];
                delete results["oauth_token"];
                var oauth_access_token_secret = results["oauth_token_secret"];
                delete results["oauth_token_secret"];
                callback( null, oauth_access_token, oauth_access_token_secret, results );
            }
        }
    );
};

var Pps = function ( config ) {
    "use strict";

    var self = this;
    var oauth = new OAuth(
        "", // requestUrl,
        config.accessTokenUrl,
        config.consumerKey,
        config.consumerSecret,
        config.version,
        config.authorize_callback,
        config.signatureMethod
    );

    self.getUrl = function ( url, callback ) {
        var self = this;

        if ( self._oauth_access_token && self._oauth_access_token_secret ) {
            var request = oauth.get( url, self._oauth_access_token, self._oauth_access_token_secret, callback );
        } else {
            oauth.getOAuthAccessToken(
                "", // oauth_token
                "", // oauth_token_secret
                function ( error, oauth_access_token, oauth_access_token_secret, results ) {
                    if ( error ) {
                        callback( error, null, results );
                    } else {
                        self._oauth_access_token = oauth_access_token;
                        self._oauth_access_token_secret = oauth_access_token_secret;
                        var request = oauth.get( url, oauth_access_token, oauth_access_token_secret, callback );
                    }
                }
            );
        }
    };


};


module.exports = Pps;
