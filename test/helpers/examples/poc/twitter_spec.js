//var requirejs = require( 'requirejs' );
//requirejs.config( {
//    nodeRequire: require
//} );

var $ = require( 'jquery' ),

    Backbone = require( 'backbone' ),
    vows = require( 'vows' ),
    assert = require( 'assert' );
var twitter = require( '.././twitter' );


Backbone.setDomLibrary( $ );
$.ajaxPrefilter( function ( options, originalOptions, jqXHR ) {
    console.log( 'prefilter' );
} );


var tweets = new twitter.Tweets();

var jqXHR;
var suite = vows.describe( 'twitter models' )

    .addBatch( {
        'Tweet model': {
            topic                      : function () {
                return new twitter.Tweet( {name: "some bs"} );
            },
            'is defined'               : function ( topic ) {
                assert.isDefined( twitter );
                assert.notEqual( twitter, undefined );
                assert.notEqual( twitter.Tweet, undefined );
                assert.notEqual( topic, null );
            },
            'is a function'            : function ( topic ) {
                assert.isFunction( twitter.Tweet );
            },
            'is returns default values': function ( topic ) {
                assert.equal( topic.get( 'content' ), "default" );
            },

            'is returns default newly initialized values': function ( topic ) {
                assert.equal( topic.get( 'name' ), "some bs" );
            }
        }} )

    .addBatch( {
        'Tweets collection': {
            topic: function () {
                jqXHR = tweets.fetch( {success: this.callback} );
                //console.log('jqXHR:' + jqXHR);
            },

            'can fetch tweets': function ( collection, response, x ) {
                console.log( 'response: ' + response );
                console.log( 'collection: ' + collection );
                console.log( 'tweets: ' + tweets.length );

                tweets.each( function ( item, index, array ) {
                    console.log( "tweet: " + JSON.stringify( item ) );
                } );
            }
        }} ).run();

