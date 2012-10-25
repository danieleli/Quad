var Backbone = require( 'backbone' ),
    PciList = require( '../../../lib/resources/backbone/pci' ),
    assert = require( 'assert' ),
    vows = require( 'vows' );


vows.describe( 'PCI' )
    .addBatch( {
        'when fetching list': {
            topic                                        : function () {
                var pciList = new PciList();
                pciList.fetchCallback = this.callback;
                pciList.fetch();

            },
            'returns status 200 and list of pcis as JSON': function ( error, data, response ) {
                if ( error ) {
                    assert.equal( error.statusCode, 200,
                        "Unexpected status code: " + error.statusCode );
                }
                assert.ok( data, "data not ok" );
                //console.log( data );
            }
        }
    } )
    .addBatch( {
        'when fetching list': {
            topic                                                       : function () {
                var pciList = new PciList();
                pciList.on( 'reset', this.callback );
                pciList.fetch();
            },
            'triggers reset and populates collection with returned data': function ( collection, options ) {
                assert.equal( collection.length > 0, true, "collection" );
                console.log( collection.toJSON() );
            }
        }
    } )
    .addBatch( {
        'when fetchCallback receives an error': {
            //            topic                       : function () {
            //                var pciList = new PciList();
            //                pciList.fetchCallback({test: "error"}, null, null);
            //            },
            //            'error callback is executed': function ( collection, error ) {
            //                assert.ok( collection, "collection not ok" );
            //                assert.ok( error, "error not ok" );
            //                console.log( error );
            //            }
        }
    } )
    .run();

