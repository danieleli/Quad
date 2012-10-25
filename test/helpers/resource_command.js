var assert = require( 'assert' ),
    PpsClient = require( '../../lib/pps_client' ),
    apiConfig = require( './api_config' );

var pps = new PpsClient( apiConfig );

(function () {
    "use strict";

    var Command = function () {
        var self = this;

        self.logger = {
            logResults: function ( data, resourceName ) {
                try {
                    var rtnData = JSON.parse( data );

                    if ( rtnData.records ) {
                        console.log( resourceName + ".rtnData.records.length: " + rtnData.records.length );
                        if ( rtnData.records.length > 0 ) {
                            console.log( resourceName + " sample data: " + JSON.stringify( rtnData.records[0] ) );
                        }
                    } else if ( rtnData.length === 0 || rtnData.length ) {
                        console.log( resourceName + ".rtnData.length: " + rtnData.length );
                        if ( rtnData.length > 0 ) {
                            console.log( resourceName + " sample data: " + JSON.stringify( rtnData[0] ) );
                        }
                    } else {
                        console.log( resourceName + ".rtnData: " + JSON.stringify( rtnData ) );
                    }
                } catch ( e ) {
                    console.log( resourceName + ".rtnData: " + JSON.stringify( data ) );
                }
            },

            logError: function ( error, resourceName ) {
                var errInfo = "Status Code: " + error.statusCode + "\n";
                if ( error.data ) {
                    errInfo += "Error Msg: " + error.data.substring( error.data, 200 ) + "\n";
                }
                console.log( '\n\nerror: ' + resourceName + '\n' + errInfo );
            }
        };


        self.getResourceAsync = function ( resourceName, done ) {
            pps.getUrl( apiConfig.rootUrl + resourceName, function ( error, data, response ) {
                try {
                    if ( error ) {
                        self.logger.logError( error, resourceName );
                    } else {
                        self.logger.logResults( data, resourceName );
                        assert.equal( response.statusCode, 200, "response.statusCode" );
                    }
                } finally {
                    done( error, data, response );

                    try {
                        // clean up.
                        if ( response ) {
                            if ( response.req ) {
                                response.req.destroy();
                            }
                            response.destroy();
                        }
                    } catch ( e ) {}
                }
            } );
        };
    };

    module.exports = Command;
})();


