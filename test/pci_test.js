var assert = require( 'chai' ).assert,
    Pps = require( '../lib/pps' ),
    Pci = require( '../lib/resources/pci.js' ),
    apiConfig = require( '../lib/api_config' );


var pps = new Pps( apiConfig );

describe( 'PCI resource', function () {
    describe( 'getAll()', function () {
        it( 'returns array of pcis', function ( done ) {
            var myPci = new Pci( pps );
            myPci.getAll( null, function ( error, data, response ) {
                assert.isNull( error, JSON.stringify( error ) );
                assert.ok( data );
                console.log( JSON.stringify( data ) );
                done();
            } );
        } );
    } );
} );

