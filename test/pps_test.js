var vows = require( 'vows' ),
    assert = require( 'chai' ).assert,
    Pps = require( '../lib/pps_adapter' ),
    apiConfig = require( './helpers/api_config' ),
    secrets = require( './secrets' );

apiConfig.consumerKey = secrets.consumerKey;
apiConfig.consumerSecret = secrets.consumerSecret;
apiConfig.oauthToken = secrets.oauthToken;
apiConfig.oauthTokenSecret = secrets.oauthTokenSecret;

var  pps = new Pps( apiConfig );

vows.describe( 'PPS data accessor' )
    .addBatch( { 'has a PCI property': {
        topic                                       : function () {
            pps.pci.getAll( null, this.callback )
        },
        'that returns pcis when .getAll() is called': function ( error, data, response ) {
            assert.isNull( error, JSON.stringify( error ) );
            assert.ok( response );
            assert.ok( data );
               console.log( JSON.stringify( data ) );
        }
    }} )
    .addBatch( { 'has a NotificationCategory property': {
        topic                                                         : function () {
            pps.notificationCategory.getAll( null, this.callback )
        },
        'that returns NotificationCategories when .getAll() is called': function ( error, data, response ) {
            assert.isNull( error, JSON.stringify( error ) );
            assert.ok( response );
            assert.ok( data );
            //   console.log( JSON.stringify( data ) );
        }
    }} )
    .addBatch( { 'has a Account property': {
        topic                                           : function () {
            pps.account.getAll( null, this.callback )
        },
        'that returns Accounts when .getAll() is called': function ( error, data, response ) {
            assert.isNull( error, JSON.stringify( error ) );
            assert.ok( response );
            assert.ok( data );
              console.log( JSON.stringify( data ) );
        }
    }} ).export(module);
