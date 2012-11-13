var vows = require( 'vows' ),
    assert = require( 'chai' ).assert,
    Pps = require( '../lib/pps_adapter' ),
    apiConfig = require( './helpers/api_config' ),
    secrets = require( './secrets' );

apiConfig.consumerKey = secrets.consumerKey;
apiConfig.consumerSecret = secrets.consumerSecret;

var httpClient = new Pps( apiConfig );


vows.describe( 'PPS client' )
    .addBatch( { 'getOAuthAccessToken': {
        topic                                       : function () {
            httpClient._client.oauth.getOAuthAccessToken(
                "", // oauth_token
                "", // oauth_token_secret
                this.callback
            );
        },
        'returns_access_token and access_token_secret': function ( error, oauth_access_token, oauth_access_token_secret, results ) {
            assert.isNull( error, JSON.stringify( error ) );
            console.log( JSON.stringify( 'oauth_access_token: ' + oauth_access_token) );
            assert.ok( oauth_access_token, 'access token' );
            console.log( JSON.stringify('oauth_access_token_secret: ' + oauth_access_token_secret ) );
            assert.ok( oauth_access_token_secret, 'access token secret' )
            console.log( JSON.stringify('results: ' + JSON.stringify(results) ) );;
            assert.ok( results, 'results' );

        }
    }} )
    .export(module);
