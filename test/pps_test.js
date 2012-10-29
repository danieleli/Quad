var vows = require( 'vows' ),
    assert = require( 'chai' ).assert,
    Pps = require( '../lib/pps' ),
    apiConfig = require( './helpers/api_config' );

var pps = new Pps( apiConfig );

vows.describe( 'PPS data accessor' )
    .addBatch( { 'has a PCI property': {
        topic                                       : function () {
            pps.Pci.getAll( null, this.callback )
        },
        'that returns pcis when .getAll() is called': function ( error, data, response ) {
            assert.isNull( error, JSON.stringify( error ) );
            assert.ok( data );
        //    console.log( JSON.stringify( data ) );
        }
    }} )
    .addBatch( { 'has a NotificationCategory property': {
        topic                                       : function () {
            pps.NotificationCategory.getAll( null, this.callback )
        },
        'that returns NotificationCategories when .getAll() is called': function ( error, data, response ) {
            assert.isNull( error, JSON.stringify( error ) );
            assert.ok( data );
         //   console.log( JSON.stringify( data ) );
        }
    }} )
    .addBatch( { 'has a Account property': {
        topic                                       : function () {
            pps.Account.getAll( null, this.callback )
        },
        'that returns Accounts when .getAll() is called': function ( error, data, response ) {
            assert.isNull( error, JSON.stringify( error ) );
            assert.ok( data );
         //   console.log( JSON.stringify( data ) );
        }
    }} )
    .run();
