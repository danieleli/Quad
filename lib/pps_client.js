var OAuth = require( 'oauth' ).OAuth;

(function () {
    'use strict';

    var PpsClient = function ( config ) {
        // store reliable reference to this
        var self = this;

        // container for internal functions
        var helper = {
            initialize       : function ( cfg ) {

                // OAuth library includes "Accept: */*" in custom headers by default
                // but */* causes server to returns JSON for first leg of OAuth
                // which is expecting urlencoded response body.  Sending these custom
                // headers in the constructor overrides the problematic defaults
                var customHeaders = {
                    "Connection": "close",
                    "User-Agent": "Node authentication"
                };

                // instantiate and configure oauth client.
                self.oauth = new OAuth(
                    "", // requestUrl,
                    cfg.accessTokenUrl,
                    cfg.consumerKey,
                    cfg.consumerSecret,
                    cfg.version,
                    cfg.authorize_callback,
                    cfg.signatureMethod,
                    undefined, // nonceSize
                    customHeaders                // override default customHeader because of JSON issue above.
                );
                self._oauth_access_token = cfg.oauthToken;
                self._oauth_access_token_secret = cfg.oauthTokenSecret;

                self.rootUrl = config.rootUrl;
            },
            accessTokenExists: function () {
                return (self._oauth_access_token && self._oauth_access_token_secret);
            }
        }

        helper.initialize( config );

        // @param url - target url
        // @param callback - function ( error, data, response )
        //
        self.getUrl = function ( url, params, callback ) {
            console.log( 'url: ' + self.rootUrl );
            console.log( 'params: ' + JSON.stringify( params ) );

            self.ensureAccessToken(function(){
                self.oauth.get( url, self._oauth_access_token, self._oauth_access_token_secret, callback );
            });
        };

        // @param resourceName - resource to retrieve
        // @param param - querystring parameters
        // @param callback - function ( error, data, response )
        //
        self.getResource = function ( resourceName, params, callback ) {
            return self.getUrl( self.rootUrl + resourceName, params, callback );
        };

        // @param resourceName - resource to retrieve
        // @param param - body parameters
        // @param callback - function ( error, data, response )
        //
        self.postResource = function ( resourceName, params, callback ) {
            console.log( 'url: ' + self.rootUrl + resourceName );
            console.log( 'params: ' + JSON.stringify( params ) );

            self.ensureAccessToken(function(){
                self.oauth.post( self.rootUrl + resourceName, self._oauth_access_token, self._oauth_access_token_secret,
                    params, 'application/json', callback );
            });
        };


        self.putResource = function ( resourceName, params, callback ) {
            console.log( 'url: ' + self.rootUrl + resourceName );
            console.log( 'params: ' + JSON.stringify( params ) );

            self.ensureAccessToken(function(){
                self.oauth.put( self.rootUrl + resourceName, self._oauth_access_token, self._oauth_access_token_secret,
                    params, 'application/json', callback );
            });
        };

        self.ensureAccessToken = function(requestCallback){
            if ( helper.accessTokenExists() ) {
                // we already have access token so execute request.
                requestCallback();
            } else {
                // no access token, so get access token then execute request.
                self.oauth.getOAuthAccessToken(
                    "", // oauth_token
                    "", // oauth_token_secret
                    function ( error, oauth_access_token, oauth_access_token_secret, results ) {

                        if ( error ) {
                            requestCallback( error, results );

                        } else {
                            // store access token for later calls.
                            self._oauth_access_token = oauth_access_token;
                            self._oauth_access_token_secret = oauth_access_token_secret;

                            // execute request.
                            requestCallback();
                        }
                    }
                );
            }

        };

    };

    module.exports = PpsClient;

})();
