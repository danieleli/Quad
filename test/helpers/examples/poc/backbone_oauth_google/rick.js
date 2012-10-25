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

// Example using GData API v3
// GData Specific Header
oa._headers['GData-Version'] = '3.0';

vows.describe( 'Contacts without backbone' ).addBatch( {
    'Fetch': {
        topic            : function () {
            oa.getProtectedResource(
                "https://www.google.com/m8/feeds/contacts/default/full?alt=json",
                "GET",
                mockState.OAuth.oauth_access_token,
                mockState.OAuth.oauth_access_token_secret,
                function ( error, data, response ) {
                    var feed = JSON.parse( data );
                    var entries = feed.feed.entry;

                    // loop through and log entries
                    for ( var x = 0; x <= entries.length; x++ ) {
                        console.log( entries[x] );
                        console.log( '---------------------------------------------------' );
                    }
                }
            );
            return 42;
        },
        'populates self ': function ( topic ) {

            console.log( "Ricks test" );
        }
    }
} ).run();







