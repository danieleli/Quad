var Backbone = require( 'backbone' );

var Contact = Backbone.Model.extend( {
        defaults: {
            content: 'default'
        }
    }
);

var Contacts = Backbone.Collection.extend( {
        model: Contact,
        url  : function () {
            return 'https://www.google.com/m8/feeds/contacts/default/full?alt=json';
        },
        parse: function ( resp, xhr ) {
            return resp.results;
        }
    }
);
