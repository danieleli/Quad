var Pci = function ( dal ) {
    "use strict";
    var self = this;
    self.getAll = function ( params, callback ) {
        dal.getResource( "pci", function ( error, data, response ) {
            callback( error, data, response );
        } );

    };
};


module.exports = Pci;
