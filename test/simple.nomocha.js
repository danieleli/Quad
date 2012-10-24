var assert = require( 'chai' ).assert, //  http://chaijs.com/api/bdd/
    oAuthHelper = require( '../lib/oauth_helper' ).instance,
    apiConfig = require( '../lib/api_config' );

var async = require( "async" );

var rootUrl = 'https://api.pps.io/v1/';

var httpClient = {
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


var logMe = function ( rtnData, resourceName ) {
    if ( rtnData.records ) {
        console.log( resourceName + ".rtnData.records.length: " + rtnData.records.length );
        if ( rtnData.records.length > 0 ) {
            console.log( resourceName + " sample data: " + JSON.stringify( rtnData.records[0] ) );
        }
    } else if ( rtnData.length === 0 || rtnData.length ) {
        console.log( resourceName + ".rtnData.length: " + rtnData.length );
        if ( rtnData.length > 0 ) {
            console.log( resourceName + " sample data: " + JSON.stringify( rtnData[0] ) );
        }
    } else {
        console.log( resourceName + ".rtnData: " + JSON.stringify( rtnData ) );
    }
};


var hitMe = function ( resourceName, done ) {
    httpClient.getUrl( rootUrl + resourceName, function ( error, data, response ) {
            try {

                var errInfo = "";
                if ( error ) {
                    errInfo = "Status Code: " + error.statusCode + "\n";
                    errInfo += "Error Msg: " + error.data.substring( error.data, 200 ) + "\n";
                    console.log( '\n\nerror: ' + resourceName + '\n' + errInfo );
                    return;
                }

                assert.equal( response.statusCode, 200, "response.statusCode" );

                try {
                    response.req.destroy();
                    response.destroy();
                } catch ( e ) {}

                var rtnData;
                try {
                    rtnData = JSON.parse( data );
                } catch ( e ) {
                    rtnData = "NOTJSON" + data;
                }

                if ( rtnData ) {
                    logMe( rtnData, resourceName );
                }
            } catch ( e ) {

            } finally {
                done();
            }
        }

    );


};


var resources = 'Account,AutoClose,Campaign,CardType,Coupon,Customer,Device,Discount,Geocode,InvoiceImport,' +
    'Loyalty,Merchant,MerchantCategory,MerchantClassification,Notification,NotificationCategory,NotificationOptionAction' +
    'Order,OrderHistory,OrderProduct,Payment,PCI,Plan,PlanSubscription,Product,' +
    'ProductAction,ProductLocation,ProductPhoto,ProductTag,ProductTax,ProductVariant,RegistrationAction' +
    'Report,SAQ,SAQAction,Tag,Tax,TaxCategory,TaxCategoryTax,TimeProfile,VariantTag';

var resourceArr = resources.split( ',' );
var calls = [];

for ( var i = 0; i < resourceArr.length; i++ ) {
    calls.push( function ( resource ) {
        return function ( done ) {
            hitMe( resource, done );
        }
    }( resourceArr[i] ) );
}
async.series( calls );

