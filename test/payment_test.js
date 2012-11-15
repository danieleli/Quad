var vows = require( 'vows' ),
    assert = require( 'chai' ).assert,
    Pps = require( '../lib/pps_adapter' ),
    apiConfig = require( './helpers/api_config' ),
    secrets = require( './secrets' );

apiConfig.consumerKey = secrets.consumerKey;
apiConfig.consumerSecret = secrets.consumerSecret;
apiConfig.oauthToken = secrets.oauthToken;
apiConfig.oauthTokenSecret = secrets.oauthTokenSecret;

var pps = new Pps( apiConfig );

var x = {
    "id"               : "b356a84f-314c-454a-a675-63ef86fecab3",
    "merchantId"       : 100001322,
    "totalAmount"      : "105",
    "currency"         : "USD",
    "taxAmount"        : "5",
    "authorizationCode": "67dccb",
    "hasSignature"     : false,
    "isSettled"        : false,
    "isReversed"       : false,
    "paymentCard"      : {
        "expirationMonth": "6",
        "expirationYear" : "2016",
        "last4"          : "5675"
    },
    "paymentCheck"     : {}
};


var samplePayment2 = {
    "merchantId" : "100001322",
    "totalAmount": 105.00,
    "taxAmount"  : 5.00,
    "paymentCard": {
        "accountNumber"  : "4275330012345675",
        "expirationMonth": "06",
        "expirationYear" : "2016",
        "cvv"            : "3423"
    }
};

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
            topic              : function () {
                pps.payment.getById( "b356a84f-314c-454a-a675-63ef86fecab3", this.callback )
            },
            'returns a payment': function ( error, data, response ) {
                assert.isNull( error, JSON.stringify( error ) );
                assert.ok( response );
                console.log( data );
                assert.ok( data );

            }
        }} )
        .addBatch( { 'post': {
            topic              : function () {
                pps.payment.post( samplePayment2, this.callback )
            },
            'returns a paymentId': function ( error, data, response ) {
                assert.isNull( error, JSON.stringify( error ) );
                assert.isTrue( response.statusCode===201, "response.status code" );

                var location = response.headers.location;
                console.log("location header: " + location);
                assert.ok(location);

            }
        }} )
//    .addBatch( { 'put': {
//        topic                : function () {
//            var self = this;
//
//            pps.payment.post( samplePayment2, function ( error, data, response ){
//                var loc = response.headers.location
//                var id = loc.substr(loc.lastIndexOf("/")+1);
//                console.log(id);
//                pps.payment.getById(id, function( error, data, response ){
//                    var p = JSON.parse(data);
//                    p.paymentCard.accountNumber = samplePayment2.paymentCard.accountNumber;
//                    p.paymentCard.cvv = samplePayment2.paymentCard.cvv;
//                    p.totalAmount = 155;
//                    delete p.paymentCheck;
//                    delete p.isSettled;
//                    delete p.isReversed;
//                    delete p.hasSignature;
//                    delete p.authorizationCode;
//                    console.log('payment to put: ' + JSON.stringify(p))
//                    pps.payment.put( p, self.callback )
//                });
//
//            } );
//
//        },
//        'returns a paymentId': function ( error, data, response ) {
//            console.log( "error: " + error );
//            assert.isNull( error, JSON.stringify( error ) );
//            assert.isTrue( response.statusCode === 201, "response.status code" );
//
//            var location = response.headers.location;
//            console.log( "location header: " + location );
//            assert.ok( location );
//
//        }
//    }} )
    .export( module );



