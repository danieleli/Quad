var vows = require( 'vows' ),
    assert = require( 'chai' ).assert,
    Pps = require( '../lib/pps_adapter' ),
    apiConfig = require( './helpers/api_config' );

var  pps = new Pps( apiConfig );

vows.describe( 'Payment' )
    .addBatch( { 'getAll': {
        topic                                       : function () {
            pps.payment.getAll( null, this.callback )
        },
        'returns payments': function ( error, data, response ) {
            assert.isNull( error, JSON.stringify( error ) );
            assert.ok( response );
            assert.ok( data );
               console.log( JSON.stringify( JSON.parse(data) ) );
        }
    }} )
    .addBatch( { 'getById': {
        topic                                       : function () {
            pps.payment.getById( "b356a84f-314c-454a-a675-63ef86fecab3", this.callback )
        },
        'returns a payment': function ( error, data, response ) {
            assert.isNull( error, JSON.stringify( error ) );
            assert.ok( response );
            assert.ok( data );
            console.log( JSON.stringify( data ) );
        }
    }} )

    .export(module);
