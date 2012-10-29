var PpsClient = require( '../lib/pps_client' ), // network & oauth client.
    resources = require( '../lib/resources' ); // resources contains all the data objects for api.

(function () {
    'use strict';

    var Pps = function ( config ) {
        var self = this;
        var client = new PpsClient( config );

        // loop over resources and append to Pps object (self) for following effect:
        //   Pps.Payments
        //   Pps.Accounts
        //   ...
        //
        for ( var r in resources ) {
            if ( r !== 'Base' ) {
                self[r] = new resources[r]( client );
            }
        }

    };

    module.exports = Pps;
})();

