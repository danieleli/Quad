var _ = require( 'underscore' ),
    Backbone = require( 'backbone' ),
    oAuthHelper = require( './oauth_helper' );

// Pci Model
// ----------
var Pci = Backbone.Model.extend( {

    // Default attributes for the todo item.
    defaults: function () {
        return {};
    }

} );

// Pci Collection
// ---------------
var PciList = Backbone.Collection.extend( {
    url          : 'https://api.pps.io/v1/pci',
    model        : Pci,
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
                    } else {
                        throw error;
                    }

                }
                var request = oAuthHelper.get( options.url,
                    oauth_access_token, oauth_access_token_secret, self.fetchCallback );
            } );
    },
    fetchCallback: function ( error, data, response ) {
        this.reset( JSON.parse( data ) );
    }

} );

module.exports = PciList;
