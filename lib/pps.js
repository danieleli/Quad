var PpsClient = require( '../lib/pps_client' ), // network & oauth client.
    resources = require( '../lib/resources' ); // resources contains all the data objects for api.

(function () {
    'use strict';

    var Pps = function ( config ) {
        var self = this;
        var client = new PpsClient( config );

        // loop over resources and append to Pps object (self) for following effect:
        //   Pps.payments
        //   Pps.accounts
        //   ...
        //
        for ( var res in resources ) {
            if ( res !== 'Base' ) {
                var camelName = res.substring(0,1).toLowerCase() + res.substring(1);
                self[camelName] = new resources[res]( client );
            }
        }

    };

    module.exports = Pps;
})();

