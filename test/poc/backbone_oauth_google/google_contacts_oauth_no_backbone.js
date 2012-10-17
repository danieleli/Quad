var OAuth = require( 'oauth' ).OAuth,
    $ = require( 'jquery' ),
    Backbone = require( 'backbone' ),
    Contacts = require( './contactModels' ),
    config = require( './config_and_sample_data' ),
    assert = require( 'assert' ),
    vows = require( 'vows' );


var oa = new OAuth(
    "", // config.OA._requestUrl,
    "", // config.OA._accessUrl,
    config.OA._consumerKey,
    config.OA._consumerSecret,
    "", //config.OA._version,
    "", //config.OA._authorize_callback,
    config.OA._signatureMethod
);

vows.describe( 'Contacts without backbone' ).addBatch( {
    'Fetch': {
        topic            : function () {
            oa.getProtectedResource(
                "https://www.google.com/m8/feeds/contacts/default/full?alt=json",
                "GET",
                config.OAuth.oauth_access_token,
                config.OAuth.oauth_access_token_secret,
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
        },
        'populates self ': function ( topic ) {
            console.log( "Ricks test" );
        }
    }
} ).run();
