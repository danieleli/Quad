var assert = require( 'chai' ).assert, //  http://chaijs.com/api/bdd/
    ResourceCommand = require( './resource_command' ),
    async = require( "async" );


(function () {
    "use strict";


    var resources = 'Account,AutoClose,Campaign,CardType,Coupon,Customer,Device,Discount,Geocode,InvoiceImport,' +
        'Loyalty,Merchant,MerchantCategory,MerchantClassification,Notification,NotificationCategory,NotificationOptionAction' +
        'Order,OrderHistory,OrderProduct,Payment,PCI,Plan,PlanSubscription,Product,' +
        'ProductAction,ProductLocation,ProductPhoto,ProductTag,ProductTax,ProductVariant,RegistrationAction' +
        'Report,SAQ,SAQAction,Tag,Tax,TaxCategory,TaxCategoryTax,TimeProfile,VariantTag';

    var resourceArr = resources.split( ',' );
    var calls = [];
    var command = new ResourceCommand();

    for ( var i = 0; i < resourceArr.length; i++ ) {
        calls.push(
            function ( resource ) {
                return function ( done ) {
                    command.getResourceAsync( resource, done );
                };
            }( resourceArr[i] )
        );
    }
    async.series( calls );

})();
