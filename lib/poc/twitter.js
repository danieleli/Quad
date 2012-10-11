var Backbone = require( 'backbone' ),
    server = false,
    exportz = {};

if ( typeof exports !== 'undefined' ) {
    exportz = exports;
    server = true;
}

exportz.Tweet = Backbone.Model.extend( {
    defaults: {
        content: 'default'
    }
} );

exportz.Tweets = Backbone.Collection.extend( {
    model: exportz.Tweet,
    url  : function () {
        return 'http://search.twitter.com/search.json?q=backbone.js';
    },
    parse: function ( resp, xhr ) {
        return resp.results;
    }
} );

return exportz;

