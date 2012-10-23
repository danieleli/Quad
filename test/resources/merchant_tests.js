var Backbone = require( 'backbone' ),
    MerchantList = require( '../../lib/resources/merchant' ),
    assert = require( 'assert' ),
    vows = require( 'vows' );


vows.describe( 'Merchant' )
    .addBatch( {
        'when fetching list': {
            topic                                        : function () {
                var pciList = new MerchantList();
                pciList.fetchCallback = this.callback;
                pciList.fetch();

            },
            'returns status 200 and list of pcis as JSON': function ( error, data, response ) {
                if ( error ) {
                    assert.equal( error.statusCode, 200,
                        "Unexpected status code: " + error.statusCode );
                }
                assert.equal( response.statusCode, 200 );
                var obj = JSON.parse( data );
                console.log( obj );
            }
        }
    } )
    .addBatch( {
        'when fetching list': {
            topic                                                       : function () {
                var pciList = new MerchantList();
                pciList.on( 'reset', this.callback );
                pciList.fetch();
            },
            'triggers reset and populates collection with returned data': function ( collection, args ) {
                assert.ok( collection.length >= 0, true, "collection.length is not OK." );
                console.log( "collection.toJSON(): " + collection.toJSON() );
            }
        }
    } )
    .addBatch( {
        'when fetching list returns an error': {
            topic                       : function () {
                var pciList = new MerchantList();
                pciList.fetch( {error: this.callback, throwError: true} );
            },
            'error callback is executed': function ( collection, error ) {
                assert.ok( collection, "collection not ok" );
                assert.ok( error, "error not ok" );
                console.log( error );
            }
        }
    } )
    .run();

