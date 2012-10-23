var _ = require( 'underscore' ),
    Backbone = require( 'backbone' ),
    oAuthHelper = require( './../oauth_helper' );

// Payment Model
// ----------
var Merchant = Backbone.Model.extend( {
    defaults: function () {
        return {

        };
    }
} );

// Merchant Collection
// ---------------
var MerchantList = Backbone.Collection.extend( {
    url          : 'https://api.pps.io/v1/merchant',
    model        : Merchant,
    initialize   : function ( options ) {
        options = options || {};
        _.bindAll( this, 'fetchCallback' );
        this.oAuthHelper = options.oAuthHelper || oAuthHelper;
    },
    fetch        : function ( options ) {
        options = options || {};
        options.url = options.url || this.url;
        var self = this;

        var result = this.oAuthHelper.getOAuthAccessToken(
            "", // oauth_token
            "", // oauth_token_secret
            function ( error, oauth_access_token, oauth_access_token_secret, results ) {
                if ( error || options.throwError ) {
                    if ( options.error ) {
                        options.error( self, error || options.throwError );
                        return;
                    } else {
                        throw error;
                    }

                }
                var request = oAuthHelper.get( options.url,
                    oauth_access_token, oauth_access_token_secret, self.fetchCallback );
            } );
    },
    fetchCallback: function ( error, data, response ) {
        this.reset( JSON.parse( data ).records );
    }

} );

module.exports = MerchantList;
