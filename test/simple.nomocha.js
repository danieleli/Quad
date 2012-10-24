var assert = require( 'chai' ).assert, //  http://chaijs.com/api/bdd/
    oAuthHelper = require( '../lib/oauth_helper' ),
    apiConfig = require( '../lib/api_config' );

var async = require("async");

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


var hitMe = function ( resourceName, done ) {
    var action = 'get ' + resourceName +  ' should return 200'

    httpClient.getUrl( rootUrl + resourceName, function ( error, data, response ) {
        var errInfo = "";
        if ( error ) {
            errInfo = "Status Code: " + error.statusCode + "\n";
            errInfo += "Error Msg: " + error.data + "\n";
            console.log('\n\nerror: ' + resourceName + '\n' + errInfo);
            done();
            return;
        }
        //console.log( "error", error, errInfo );
        console.log( response.statusCode, 200, "response.statusCode" );

        var rtnData;
        try{
            rtnData = JSON.parse( data );
        }catch(e){
            rtnData = "NOTJSON" + data
        }

        if ( rtnData !== false ) {
            console.log( rtnData, "return data" );
        }
        if (rtnData) {
            logMe( rtnData, resourceName );
        }
        //response;
        done();
    } );

};

//  'Account,AutoClose,Campaign,CardType,Coupon,Customer,Device,Discount,Geocode,InvoiceImport,' +
// 'Loyalty,MerchantClassification,Notification,NotificationCategory,NotificationOptionAction,' +
//   'Order,OrderHistory,OrderProduct,OrderReceipt,Payment,PaymentMethodToken,PCI,PlanSubscription,' +
// 'Product,ProductAction,ProductLocation,ProductPhoto,ProductTax,ProductVariant,' + 
// 'RegistrationAction,Report,SAQ,SAQAction,Tag,Tax,TaxCategory,TaxCategoryTax,TimeProfile,VariantTag';

// "Merchant,MerchantCategory,Plan,ProductTag"

var resources = "Merchant,MerchantCategory,Plan,ProductTag"
var resourceArr = resources.split(',');

var calls = [];

for(var i= 0; i<resourceArr.length; i++){
    calls.push(function(resource) {
        return function(done) {
            hitMe(resource , done );
        }
    }(resourceArr[i]));
}
async.series(calls);
//
//hitMe( "payment" );
//hitMe( "campaign" );
//hitMe( "account" );
//hitMe( "autoclose" );
//hitMe( "captcha?key=test&value=testing" );
//hitMe( "cardtype" );
//hitMe( "coupon" );
//hitMe( "customer" );




// these don't support naked 'get'

//hitMe( "couponTag" );
//hitMe( "merchant" );
//CustomerAction,CustomerAddress,CustomerOrder,CustomerPaymentMethod,CustomerSubscription,CustomerTag,Captcha,CampaignAction,AccountAction,CouponTag,DiscountTag,Echo,FraudSetting,IPAddress,Location,LocationProduct,OrderAction
//OrderDiscount,OrderPayment,
