var PpsClient = require( '../lib/pps_client' )
    , directoryHelper = require( 'directory' )
    , Pci = require( './resources/pci.js' )
    ;

// Convert camalized names to underscore. (from prototype.js)
var underscore = function ( name ) {
    return name.replace( /::/g, '/' )
        .replace( /([A-Z]+)([A-Z][a-z])/g, '$1_$2' )
        .replace( /([a-z\d])([A-Z])/g, '$1_$2' )
        .replace( /-/g, '_' )
        .toLowerCase();
}

var Pps = function ( config ) {
    var self = this;
    var client = new PpsClient( config );

    self['pci'] = new Pci( client );
    //    directoryHelper( __dirname + '/resources/', function ( module, name ) {
    //        var resource = new module( client );
    //        name = underscore( name );
    //
    //        self[name] = resource;
    //    } );
}

module.exports = Pps;



