var Client = require( '../lib/pps_client' ), // network & oauth client.
    resources = require( '../lib/resources' ); // resources contains all the data objects for api.

(function () {
    'use strict';

    // This is root api object that after instantiated will have
    // properties for each resource available through api.
    //
    // Effectively making this object take the following form:
    //
    //   Pps.accounts
    //   Pps.payments
    //   ...
    //   Pps.zanzabar
    //
    var Pps = function ( config ) {
        var self = this;
        var client = new Client( config );

        // loop over resources and append each to self as property
        for ( var res in resources ) {
            if ( res !== 'Base' ) {
                var camelName = res.substring(0,1).toLowerCase() + res.substring(1);
                self[camelName] = new resources[res]( client );
            }
        }

    };

    module.exports = Pps;


})();

