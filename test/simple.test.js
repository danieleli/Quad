var assert = require( 'chai' ).assert,
    ResourceCommand = require( './resource_command' );

var command = new ResourceCommand();

var hitMe = function ( resourceName ) {
    describe( 'get ' + resourceName, function () {
        it( 'should return 200', function ( done ) {
            command.getResourceAsync( resourceName, done );
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

