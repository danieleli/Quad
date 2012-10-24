var assert = require( 'chai' ).assert,
    OAuthHelper = require( '../lib/oauth_helper' ),
    apiConfig = require( '../lib/api_config' );

var oAuthHelper = OAuthHelper.instance;

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


var hitMe = function ( resourceName ) {
    describe( 'get ' + resourceName, function () {
        it( 'should return 200', function ( done ) {

            httpClient.getUrl( rootUrl + resourceName, function ( error, data, response ) {
                try {
                    if ( response ) {
                        try {
                            response.req.destroy();
                            response.destroy();

                        } catch ( e ) { }
                    }
                    var errInfo = "";
                    if ( error ) {
                        errInfo = "Status Code: " + error.statusCode + "\n";
                        errInfo += "Error Msg: " + error.data.subStr( 0, 200 ) + "\n";
                        console.log( '\n\nerror: ' + resourceName + '\n' + errInfo );
                        return;
                    }
                    assert.equal( response.statusCode, 200, "response.statusCode" );

                    var rtnData = JSON.parse( data );

                    if ( rtnData !== false ) {
                        assert.ok( rtnData, "return data" );
                    }

                    logMe( rtnData, resourceName );
                }
                finally {
                    done();
                }

            } );

        } );

    } );
};


var resources = 'Account,AutoClose,Campaign,CardType,Coupon,Customer,Device,Discount,Geocode,InvoiceImport,' +
    'Loyalty,Merchant,MerchantCategory,MerchantClassification,Notification,NotificationCategory,NotificationOptionAction,' +
    'Order,OrderHistory,OrderProduct,OrderReceipt,Payment,PaymentMethodToken,PCI,Plan,PlanSubscription,Product,' +
    'ProductAction,ProductLocation,ProductPhoto,ProductTag,ProductTax,ProductVariant,RegistrationAction,Report,SAQ,SAQAction,Tag,Tax,TaxCategory,TaxCategoryTax,TimeProfile,VariantTag';
var resourceArr = resources.split( ',' );

for ( var i = 0; i < resourceArr.length; i++ ) {

    hitMe( resourceArr[i] );


}

//hitMe( "payment" );
//hitMe( "campaign" );
//hitMe( "account" );
//hitMe( "autoclose" );
//hitMe( "captcha?key=test&value=testing" );
//hitMe( "cardtype" );
//hitMe( "coupon" );
//hitMe( "customer" );

//hitMe( "loyalty" );


// these don't support naked 'get'

//hitMe( "couponTag" );
//hitMe( "merchant" );
//CustomerAction,CustomerAddress,CustomerOrder,CustomerPaymentMethod,CustomerSubscription,CustomerTag,Captcha,CampaignAction,AccountAction,CouponTag,DiscountTag,Echo,FraudSetting,IPAddress,Location,LocationProduct,OrderAction
//OrderDiscount,OrderPayment,
