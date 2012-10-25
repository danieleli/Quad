var assert = require( 'chai' ).assert,
    PpsClient = require( '../../lib/pps_client' ),
    Pci = require( '../../lib/resources/pci.js' ),
    apiConfig = require( '../helpers/api_config' );


var client = new PpsClient( apiConfig );

describe( 'PCI resource', function () {
    describe( 'getAll()', function () {
        it( 'returns array of pcis', function ( done ) {
            var myPci = new Pci( client );
            myPci.getAll( null, function ( error, data, response ) {
                assert.isNull( error, JSON.stringify( error ) );
                assert.ok( data );
                console.log( JSON.stringify( data ) );
                done();
            } );
        } );
    } );
} );

