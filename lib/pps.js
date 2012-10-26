var PpsClient = require( '../lib/pps_client' ),
    resources = require( '../lib/resources' );

(function () {
    'use strict';

    var Pps = function ( config ) {
        var self = this;
        var client = new PpsClient( config );

        self.pci = new resources.Pci( client );
        self.notificationCategory = new resources.NotificationCategory( client );

    };

    module.exports = Pps;
})();

