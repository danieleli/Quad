var config = require( './api_config' ),
    OAuth = require( 'oauth' ).OAuth;

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

OAuth.prototype.getUrl = function ( url, callback ) {
    var self = this;

    this.getOAuthAccessToken(
        "", // oauth_token
        "", // oauth_token_secret
        function ( error, oauth_access_token, oauth_access_token_secret, results ) {
            if ( error ) {
                callback( error, null, results );
            } else {
                this._oauth_access_token = oauth_access_token;
                this._oauth_access_token_secret = oauth_access_token_secret;
                var request = self.get( url, oauth_access_token, oauth_access_token_secret, callback );
            }
        }
    );
};

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
