var OAuth = require( 'oauth' ).OAuth,
    $ = require( 'jquery' ),
    Backbone = require( 'backbone' ),
    Contacts = require( './contactModels' ),
    mockState = require( './config_and_sample_data' ),
    assert = require( 'assert' ),
    vows = require( 'vows' );


Backbone.setDomLibrary( $ );

$.ajaxPrefilter( function ( options, originalOptions, jqXHR ) {
        console.log( '---------------prefilter------------------' );
        console.log( "options: " + JSON.stringify( options ) );
        console.log( '---------------' );
        console.log( "originalOptions: " + JSON.stringify( originalOptions ) );
        console.log( '---------------' );
        console.log( "jqXHR : " + JSON.stringify( jqXHR ) );
        jqXHR.setRequestHeader( "TEST", ".net rocks!" );
    }
);


var oa = new OAuth(
    "", // mockState.OA._requestUrl,
    "", // mockState.OA._accessUrl,
    mockState.OA._consumerKey,
    mockState.OA._consumerSecret,
    "", //mockState.OA._version,
    "", //mockState.OA._authorize_callback,
    mockState.OA._signatureMethod
);

oa._headers['GData-Version'] = '3.0';

var contacts = new Contacts.Contacts();

vows.describe( 'Contacts' ).addBatch( {
    'Fetch': {
        topic            : function () {
            contacts.fetch(
                {
                    success: this.callback,
                    error  : this.callback
                }
            );
        },
        'populates self ': function ( collection, response, x ) {

            console.log( JSON.stringify( collection ) + " " );
            console.log( "response=" + response );
            console.log( "vows atest" );
            assert.equal( response.status, 200 );
        }
    }
} ).run();

