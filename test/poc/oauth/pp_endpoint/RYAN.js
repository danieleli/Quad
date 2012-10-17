var OAuth = require( 'oauth' ).OAuth,
    assert = require( 'assert' ),
    vows = require( 'vows' );

var config = {
    requestVerb              : "GET",
    requestUrl               : "https://api.pps.io/v1/customer?limit=10&offset=1",
    accessUrl                : "https://api.pps.io/v1/oauth/1a/accesstoken",
    consumerKey              : "CBF65B02-18CE-4D3C-94EE-DBA0CD478CC0",
    consumerSecret           : "FlOQnGUghKzhcyc7GrsO2gYbLYA",
    version                  : "1.0",
    authorize_callback       : "",
    signatureMethod          : "HMAC-SHA1",
    oauth_access_token       : "",
    oauth_access_token_secret: ""
};


var oa = new OAuth(
    "", //config.requestUrl,
    config.accessUrl,
    config.consumerKey,
    config.consumerSecret,
    config.version,
    "", //config.authorize_callback,
    config.signatureMethod
);


var ryanSigBase = "POST&https%3A%2F%2Fapi.pps.io%2Fv1%2Foauth%2F1a%2Faccesstoken&oauth_consumer_key%3DCBF65B02-18CE-4D3C-94EE-DBA0CD478CC0%26oauth_nonce%3D0ahmrxSXERSpSoUc%26oauth_signature_method%3DHMAC-SHA1%26oauth_timestamp%3D1350405792%26oauth_version%3D1.0"
//    RYAN's sigBase (line breaks added)
//
//    oauth_consumer_key=CBF65B02-18CE-4D3C-94EE-DBA0CD478CC0&
//    oauth_nonce=0ahmrxSXERSpSoUc&
//    oauth_signature_method=HMAC-SHA1&
//    oauth_timestamp=1350405792&
//    oauth_version=1.0

var ryanSigHashResult = "DuoK4tpx25VR0VeB/6fn/Xu5hgU=";

vows.describe( 'OAuth library' ).addBatch( {
    'getSignature()': {
        topic                 : function () {
            return oa._createSignature( ryanSigBase, "" );
            // SEE FUNCTION BELOW createSignature= function(signatureBase, tokenSecret)
        },
        'creates correct hash': function ( topic ) {
            console.log( "expected: DuoK4tpx25VR0VeB/6fn/Xu5hgU=" );
            console.log( "actual  : " + topic );
            // FAIL :(
            assert.equal( topic.toString(), ryanSigHashResult );
        }
    }} ).run();


// This is underlying code from oauth library.  NOT FOR USE.

var COPIED_createSignature = function ( signatureBase, tokenSecret ) {
    if ( tokenSecret === undefined ) {
        var tokenSecret = "";
    }
    else {
        tokenSecret = this._encodeData( tokenSecret );
    }

    var key = this._consumerSecret + "&" + tokenSecret;

    // DEBUGGER INSPECTIONS
    // tokenSecret = "";
    // key = "FlOQnGUghKzhcyc7GrsO2gYbLYA&";


    var hash = ""
    if ( this._signatureMethod == "PLAINTEXT" ) {
        hash = key;
    }
    else {
        if ( crypto.Hmac ) {
            // ------------------ !!!!  THIS IS FUNCTION THAT GETS RUN !!!!! ----------------
            hash = crypto.createHmac( "sha1", key ).update( signatureBase ).digest( "base64" );
        }
        else {
            hash = sha1.HMACSHA1( key, signatureBase );
        }
    }
    return hash;
};


// var customerCollection;

//vows.describe( 'OAuth library' ).addBatch( {
//    'getOAuthAccessToken()': {
//        topic                : function () {
//            oa.getOAuthAccessToken(
//                "",  // oauth_token
//                "",  // oauth_token_secret
//                this.callback
//            );
//            console.log("before echo");
//            //oa.OAuthEcho();
//            console.log("after echo");
//        },
//        'returns status 200 ': function ( error, data, response ) {
//            console.log("error: " + JSON.stringify(error));
//            assert.equal( error.statusCode, 200 );
//            var obj = JSON.parse( data );
//            console.log( obj );
//        }
//    }
//
//    'getProtectedResource()': {
//        topic                : function () {
//            oa.getProtectedResource(
//                config.requestUrl,
//                config.requestVerb,
//                config.oauth_access_token,//this
//                config.oauth_access_token_secret,//this
//                this.callback
//            );
//        },
//        'returns status 200 ': function ( error, data, response ) {
//            assert.equal( response.status, 200 );
//            var obj = JSON.parse( data );
//            console.log( obj );
//        }
//    }
//} )
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
