var assert = require( 'chai' ).assert,
    oAuthHelper = require( '../lib/oauth_helper' ),
    apiConfig = require( '../lib/api_config' );

var rootUrl = 'https://api.pps.io/v1/';

var tester = {
    getUrl: function ( url, callback ) {

        oAuthHelper.getOAuthAccessToken(
            "", // oauth_token
            "", // oauth_token_secret
            function ( error, oauth_access_token, oauth_access_token_secret, results ) {
                if ( error ) {
                    callback( error, results );
                }
                var request = oAuthHelper.get( url,
                    oauth_access_token, oauth_access_token_secret, callback );
            }
        );
    }
};
//  http://chaijs.com/api/bdd/


var logMe = function ( rtnData, resourceName ) {
    if ( rtnData.records ) {
        console.log( resourceName + ".rtnData.records.length: " + rtnData.records.length );
        if ( rtnData.records.length > 0 ) {
            console.log( "sample data: " + JSON.stringify( rtnData.records[0] ) );
        }
    } else if ( rtnData.length === 0 || rtnData.length ) {
        console.log( resourceName + ".rtnData.length: " + rtnData.length );
        if ( rtnData.length > 0 ) {
            console.log( "sample data: " + JSON.stringify( rtnData[0] ) );
        }
    } else {
        console.log( resourceName + ".rtnData: " + JSON.stringify( rtnData ) );
    }
};


var hitMe = function ( resourceName ) {
    describe( 'get ' + resourceName, function () {

        it( 'should return 200', function ( done ) {
            tester.getUrl( rootUrl + resourceName, function ( error, data, response ) {
                var errInfo = "";
                if ( error ) {
                    errInfo = "Status Code: " + error.statusCode + "\n";
                    errInfo += "Error Msg: " + error.data + "\n";
                }
                assert.isNull( error, errInfo );
                assert.equal( response.statusCode, 200, "response.statusCode" );

                var rtnData = JSON.parse( data );

                if ( rtnData !== false ) {
                    assert.ok( rtnData, "return data" );
                }

                logMe( rtnData, resourceName );

                done();
            } );

        } );

    } );
};

hitMe( "payment" );
hitMe( "campaign" );
hitMe( "account" );
hitMe( "autoclose" );
hitMe( "captcha?key=test&value=testing" );
hitMe( "cardtype" );
hitMe( "coupon" );
hitMe( "customer" );

//hitMe( "couponTag" );
//hitMe("merchant");
//hitMe( "customerAction" );
//hitMe( "customerAddress" );
