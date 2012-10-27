var assert = require( 'chai' ).assert,
    Pps = require( '../lib/pps' ),
    apiConfig = require( './helpers/api_config' );

var pps = new Pps( apiConfig );


describe( 'pps object', function () {
    describe( 'has pci property', function () {
        it( 'that returns pcis when .getAll() is called', function ( done ) {
            pps.Pci.getAll( null, function ( error, data, response ) {
                assert.isNull( error, JSON.stringify( error ) );
                assert.ok( data );
                console.log( JSON.stringify( data ) );
                done();
            } );
        } );
    } );

    describe( 'has NotificationCategory property', function () {
        it( 'that returns NotificationCategories when .getAll() is called', function ( done ) {
            pps.NotificationCategory.getAll( null, function ( error, data, response ) {
                assert.isNull( error, JSON.stringify( error ) );
                assert.ok( data );
                console.log( JSON.stringify( data ) );
                done();
            } );
        } );
    } );

    describe( 'has Account property', function () {
        it( 'that returns Accounts when .getAll() is called', function ( done ) {
            pps.Account.getAll( null, function ( error, data, response ) {
                assert.isNull( error, JSON.stringify( error ) );
                assert.ok( data );
                console.log( JSON.stringify( data ) );
                done();
            } );
        } );
    } );
} );
