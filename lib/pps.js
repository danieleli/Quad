var PpsClient = require( '../lib/pps_client' ),
    resources = require( '../lib/resources' );

(function () {
    'use strict';

    var Pps = function ( config ) {
        var self = this;
        var client = new PpsClient( config );

        for ( var r in resources ) {
            if ( r !== 'Base' ) {
                self[r] = new resources[r]( client );
            }
        }

    };

    module.exports = Pps;
})();

