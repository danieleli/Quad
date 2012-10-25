var assert = require( 'chai' ).assert
    , ResourceCommand = require( './helpers/resource_command' )
    , vows = require( 'vows' )
    ;

var command = new ResourceCommand();

var hitMe = function ( resourceName ) {
    return vows.describe( 'get ' + resourceName )
        .addBatch( {
            'should return 200': {
                topic : function () {
                    command.getResourceAsync( resourceName, this.callback )
                },
                'blah': function ( a, b, c ) {
                    console.log( b );
                }
            }
        } );
};


var resources = 'Account,AutoClose,Campaign,CardType,Coupon,Customer,Device,Discount,Geocode,InvoiceImport,' +
    'Loyalty,Merchant,MerchantCategory,MerchantClassification,Notification,NotificationCategory,NotificationOptionAction,' +
    'Order,OrderHistory,OrderProduct,OrderReceipt,Payment,PaymentMethodToken,PCI,Plan,PlanSubscription,Product,' +
    'ProductAction,ProductLocation,ProductPhoto,ProductTag,ProductTax,ProductVariant,RegistrationAction,Report,SAQ,SAQAction,Tag,Tax,TaxCategory,TaxCategoryTax,TimeProfile,VariantTag';
var resourceArr = resources.split( ',' );

for ( var i = 0; i < resourceArr.length; i++ ) {
    var vow = hitMe( resourceArr[i] );
    vow.run();
}

