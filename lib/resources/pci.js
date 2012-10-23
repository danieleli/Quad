var _ = require( 'underscore' ),
    Backbone = require( 'backbone' ),
    oAuthHelper = require( './../oauth_helper' );

// Pci Model
// ----------
var Pci = Backbone.Model.extend( {
    defaults: function () {
        return {
            id              : null,
            paymentBrandId  : null,
            internetMerchant: null,
            level           : null,
            annualCountLow  : null,
            annualCountHigh : null,
            priorBreach     : null,
            brandDiscretion : null,
            brandParity     : null,
            onsiteReview    : null,
            saq             : null,
            netScan         : null
        };
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


        this.oAuthHelper.getOAuthAccessToken(
            "", // oauth_token
            "", // oauth_token_secret
            function ( error, oauth_access_token, oauth_access_token_secret, results ) {
                if ( error ) {
                    self.fetchCallback( error, null, results );
                } else {
                    var request = self.oAuthHelper.get( options.url, oauth_access_token, oauth_access_token_secret,
                        self.fetchCallback );
                }
            }
        );
    },
    fetchCallback: function ( error, data, response ) {
        this.reset( JSON.parse( data ) );
    }

} );

module.exports = PciList;
