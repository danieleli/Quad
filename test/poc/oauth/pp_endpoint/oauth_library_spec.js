var OAuth = require( 'oauth' ).OAuth,
    $ = require( 'jquery' ),
    Backbone = require( 'backbone' ),
    BackboneModels = require( './backbone_models' ),
    assert = require( 'assert' ),
    vows = require( 'vows' );


Backbone.setDomLibrary( $ );


var config = {
    requestVerb              : "GET",
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


var oa = new OAuth(
    "", //config.requestUrl,
    "", //config.accessUrl,
    config.consumerKey,
    config.consumerSecret,
    "", //config.version,
    "", //config.authorize_callback,
    config.signatureMethod
);


var paymentsCollection;

vows.describe( 'OAuth library' ).addBatch( {
    'getProtectedResource()': {
        topic                : function () {
            oa.getProtectedResource(
                config.requestUrl,
                config.requestVerb,
                config.oauth_access_token,
                config.oauth_access_token_secret,
                this.callback
            );
        },
        'returns status 200 ': function ( error, data, response, arg1, arg2, arg3 ) {
            assert.equal( response.status, 200 );
            var obj = JSON.parse( data );
            console.log( obj );
        }
    }
} ).addBatch( {
        'backbone payments collection with fetch override': {
            topic                         : function () {
                var options = {
                    fetch: function ( options ) {
                        assert.equal( true, false, "not implemented" );
                    },
                    url  : config.requestUrl
                };


                payments = new BackboneModels.Payments( options );

                payments.fetch(
                    {
                        success: this.callback,
                        error  : this.callback
                    }
                );
            },
            'fetch returns status 200 ok ': function ( collection, response, arg3, arg4, arg5 ) {
                assert.equal( response.status, 200 );
                var obj = JSON.parse( collection );
                console.log( obj );
            },

            'fetch populates original collection ': function ( collection, response, arg3, arg4, arg5 ) {
                assert.equal( true, false, "check for populated collection" );
            }
        }
    }
).run();



