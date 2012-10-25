var assert = require( 'chai' ).assert,
    Pps = require( '../lib/pps' ),
    apiConfig = require( 'api_config' );

var pps = new Pps( apiConfig );

describe( 'pps object', function () {
    describe( 'has pci pci property', function () {
        it( 'that returns pcis when .getAll() is called', function ( done ) {
            pps.pci.getAll( null, function ( error, data, response ) {
                assert.isNull( error, JSON.stringify( error ) );
                assert.ok( data );
                console.log( JSON.stringify( data ) );
                done();
            } );
        } );
    } );
} );
