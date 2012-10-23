var oAuthHelper = require( '../lib/oauth_helper' ),
    apiConfig = require( '../lib/api_config' );

var testUrl = 'https://api.pps.io/v1/payment?merchantId=10001322&limit=10&offest=0';


var tester = {
    getUrl       : function ( url ) {
        var self = this;
        self.oAuthHelper.getOAuthAccessToken(
            "", // oauth_token
            "", // oauth_token_secret
            function ( error, oauth_access_token, oauth_access_token_secret, results ) {
                if ( error ) {
                    self.fetchCallback( error, results );
                }
                var request = oAuthHelper.get( url,
                    oauth_access_token, oauth_access_token_secret, self.fetchCallback );
            }
        );
    },
    fetchCallback: function ( error, data, response ) {
        this.reset( JSON.parse( data ).records );
    }
};
