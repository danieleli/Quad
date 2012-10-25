var Pci = function ( pps_client ) {
    "use strict";
    var self = this;
    self.getAll = function ( params, callback ) {
        pps_client.getResource( "pci", function ( error, data, response ) {
            callback( error, data, response );
        } );
    };
};


module.exports = Pci;
