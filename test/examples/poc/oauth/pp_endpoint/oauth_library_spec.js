var OAuth = require( 'oauth' ).OAuth,
    $ = require( 'jquery' ),
    Backbone = require( 'backbone' ),
    BackboneModels = require( './backbone_models' ),
    assert = require( 'assert' ),
    vows = require( 'vows' );


Backbone.setDomLibrary( $ );


var config = {
    requestTokenUrl   : "https://api.pps.io/v1/OAuth/1A/RequestToken",
    // authorizeTokenUrl        : "https://api.pps.io/v1/OAuth/1A/AuthorizeToken", // not implemented.  returns nil
    accessTokenUrl    : "https://api.pps.io/v1/OAuth/1A/AccessToken",
    consumerKey       : "CBF65B02-18CE-4D3C-94EE-DBA0CD478CC0",
    consumerSecret    : "FlOQnGUghKzhcyc7GrsO2gYbLYA=",
    version           : "1.0",
    authorize_callback: "",
    signatureMethod   : "HMAC-SHA1"
    //    oauth_access_token       : "A187924137251E65",
    //    oauth_access_token_secret: "e4339ed6-2c67-4c7d-855e-f8e2ffbca8dd"
};

var merchId = "10001322";
//var oa = new OAuth(
//    "", //config.requestUrl,
//    config.accessTokenUrl,
//    config.consumerKey,
//    config.consumerSecret,
//    config.version,
//    "", //config.authorize_callback,
//    config.signatureMethod
//);
var helper = {
    getOAuth: function () {
        var rtn = new OAuth(
            "", //config.requestUrl,
            config.accessTokenUrl,
            config.consumerKey,
            config.consumerSecret,
            config.version,
            "", //config.authorize_callback,
            config.signatureMethod
        );

        return rtn;
    }
};

vows.describe( 'OAuth library' )
    //        .addBatch( {
    //            'getOAuthAccessToken()': {
    //                topic                : function () {
    //                    var oa = helper.OAuth();
    //                    oa.getOAuthAccessToken(
    //                        "", // oauth_token
    //                        "", // oauth_token_secret
    //                        this.callback
    //                    );
    //                },
    //                'returns status 200 ': function ( error, oauth_access_token, oauth_access_token_secret, results ) {
    //                    console.log( "results: " + JSON.stringify( results ) );
    //                    console.log( "error: " + JSON.stringify( error ) );
    //                    console.log( "oauth_access_token: " + JSON.stringify( oauth_access_token ) );
    //                    console.log( "oauth_access_token_secret: " + JSON.stringify( oauth_access_token_secret ) );
    //                    assert.equal( error, null, "error" );
    //                    assert.ok( oauth_access_token, "access token" );
    //                    assert.ok( oauth_access_token_secret, "access token secret" );
    //                }
    //            }
    //        } )

    .addBatch( {
        'get secure resouce after fetching access token': {
            topic                : function () {
                var target = "https://api.pps.io/v1/pci";
                var cb = this.callback;
                var oAuth = helper.getOAuth();
                var result = oAuth.getOAuthAccessToken(
                    "", // oauth_token
                    "", // oauth_token_secret
                    function ( error, oauth_access_token, oauth_access_token_secret, results ) {
                        assert.ok( oauth_access_token, "access token undefined" );
                        console.log( "access token:" + oauth_access_token );
                        assert.ok( oauth_access_token_secret, "access token --secret-- undefined" );
                        console.log( "access token secret:" + oauth_access_token_secret );


                        // Get Payments
                        var request = oAuth.get( target,
                            oauth_access_token, oauth_access_token_secret, cb );
                    } );
            },
            'returns status 200 ': function ( error, data, response ) {
                if ( error ) {
                    assert.equal( error.statusCode, 200,
                        "Unexpected status code: " + error.statusCode );
                }
                assert.equal( response.statusCode, 200 );
                var obj = JSON.parse( data );
                console.log( obj );
            }
        }} )
    //
    //    .addBatch( {
    //        'get secure resouce without prefetching  access token': {
    //            topic                : function () {
    //                var target = "https://api.pps.io/v1/Payment?limit=10";
    //                var request = oa.get( target,
    //                    null, null, this.callback );
    //            },
    //            'returns status 200 ': function ( error, data, response ) {
    //                if ( error ) {
    //                    var msg = "Unexpected status code: " + error.statusCode + "\n\ndata: " + data + "\n";
    //                    assert.equal( error.statusCode, 200, msg );
    //                }
    //                assert.equal( response.status, 200 );
    //                var obj = JSON.parse( data );
    //                console.log( obj );
    //            }
    //        }
    //    } )


    .run();


//    .addBatch( {
//        'backbone payments collection with fetch override': {
//            topic                         : function () {
//                var options = {
//                    fetch: function ( options ) {
//                        assert.equal( true, false, "not implemented" );
//                    },
//                    url  : config.requestUrl
//                };
//
//
//                payments = new BackboneModels.Payments( options );
//
//                payments.fetch(
//                    {
//                        success: this.callback,
//                        error  : this.callback
//                    }
//                );
//            },
//            'fetch returns status 200 ok ': function ( collection, response, arg3, arg4, arg5 ) {
//                assert.equal( response.status, 200 );
//                var obj = JSON.parse( collection );
//                console.log( obj );
//            },
//
//            'fetch populates original collection ': function ( collection, response, arg3, arg4, arg5 ) {
//                assert.equal( true, false, "check for populated collection" );
//            }
//        }
//    }
//)
//    .run();

//  ordered params
//    oauth_consumer_key=CBF65B02-18CE-4D3C-94EE-DBA0CD478CC0&
//    oauth_nonce=rWSJJHxmtxMrIRGcoHJQGRmPTDybHF2p&
//    oauth_signature_method=HMAC-SHA1&
//    oauth_timestamp=1350425123&
//    oauth_version=1.0

//signatureBase = "POST&https%3A%2F%2Fapi.pps.io%2Fv1%2Foauth%2F1a%2Faccesstoken&oauth_consumer_key%3DCBF65B02-18CE-4D3C-94EE-DBA0CD478CC0%26oauth_nonce%3DCQcMUOFDnfXkUscGcJVpVeDgwgFMXhde%26oauth_signature_method%3DHMAC-SHA1%26oauth_timestamp%3D1350426085%26oauth_version%3D1.0";
//
//tokenSecret = "";
//key = "FlOQnGUghKzhcyc7GrsO2gYbLYA&";
//
//exports.OAuth.prototype._createSignature= function(signatureBase, tokenSecret) {
//    if( tokenSecret === undefined ) var tokenSecret= "";
//    else tokenSecret= this._encodeData( tokenSecret );
//    // consumerSecret is already encoded
//    var key= this._consumerSecret + "&" + tokenSecret;
//
//    var hash= ""
//    if( this._signatureMethod == "PLAINTEXT" ) {
//        hash= key;
//    }
//    else {
//        if( crypto.Hmac ) {
//            hash = crypto.createHmac("sha1", key).update(signatureBase).digest("base64");
//        }
//        else {
//            hash= sha1.HMACSHA1(key, signatureBase);
//        }
//    }
//    return hash;
//}
