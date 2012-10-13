var OAuth = require( 'oauth' ).OAuth,
    $ = require( 'jquery' ),
    Backbone = require( 'backbone' ),
    BackboneModels = require( './backbone_models' ),
    assert = require( 'assert' ),
    vows = require( 'vows' );


Backbone.setDomLibrary( $ );


var oa = {
    requestUrl               : "",
    accessUrl                : "",
    consumerKey              : "",
    consumerSecret           : "",
    version                  : "",
    authorize_callback       : "",
    signatureMethod          : "",
    oauth_access_token       : "",
    oauth_access_token_secret: ""
};


var payments = new BackboneModels.Payments();
payments.url = config.requestUrl;

vows.describe( 'Backbone Models' ).addBatch( {
    'fetch override': {
        topic                   : function () {
            payments.fetch(
                {
                    success: this.callback,
                    error  : this.callback
                }
            );
        },
        'returns status 200 ok ': function ( collection, response, arg3, arg4, arg5 ) {
            assert.equal( response.status, 200 );
            var obj = JSON.parse( collection );
            console.log( obj );

        }
    }
} ).run();

