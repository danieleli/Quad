var OAuth = require( 'oauth' ).OAuth,
    $ = require( 'jquery' ),
    Backbone = require( 'backbone' ),
    Contacts = require( './contactModels' ),
    mockState = require( './mockSessionState' ),
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
//
//exports.testGoogleCall = function ( test ) {
//    var oa = new OAuth(
//        "", // mockState.OA._requestUrl,
//        "", // mockState.OA._accessUrl,
//        mockState.OA._consumerKey,
//        mockState.OA._consumerSecret,
//        "", //mockState.OA._version,
//        "", //mockState.OA._authorize_callback,
//        mockState.OA._signatureMethod
//    );
//
//    // Example using GData API v3
//    // GData Specific Header
//    oa._headers['GData-Version'] = '3.0';
//
//    oa.getProtectedResource(
//        "https://www.google.com/m8/feeds/contacts/default/full?alt=json",
//        "GET",
//        mockState.OAuth.oauth_access_token,
//        mockState.OAuth.oauth_access_token_secret,
//        function ( error, data, response ) {
//            var feed = JSON.parse( data );
//            var entries = feed.feed.entry;
//
//            // loop through and log entries
//            for ( var x = 0; x <= entries.length; x++ ) {
//                console.log( entries[x] );
//                console.log( '---------------------------------------------------' );
//            }
//        }
//    );
//
//
//    test.expect( 1 );
//    test.ok( true, "this assertion should pass" );
//    test.done();
//};
//

// function wrapper for node unit
//exports.testContactsCollection = function ( te  t ) {
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

//    oa.getProtectedResource(
//        "https://www.google.com/m8/feeds/contacts/default/full?alt=json",
//        "GET",
//        mockState.OAuth.oauth_access_token,
//        mockState.OAuth.oauth_access_token_secret,
//        function ( error, data, response ) {
//            var feed = JSON.parse( data );
//            var entries = feed.feed.entry;
//
//            // loop through and log entries
//            for ( var x = 0; x <= entries.length; x++ ) {
//                console.log( entries[x] );
//                console.log( '---------------------------------------------------' );
//            }
//        }
//    );

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

test.expect( 1 );
test.ok( true, "this assertion should pass" );
test.done();

//};
