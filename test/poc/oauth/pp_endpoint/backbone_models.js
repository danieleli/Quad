var Backbone = require( 'backbone' );

var Payment = Backbone.Model.extend( {
        defaults: {
            content: 'default'
        }
    }
);

var Payments = Backbone.Collection.extend( {
        model: Payments,
        url  : function () {
            return null; // Set manually after instantiation
        },
        parse: function ( resp, xhr ) {
            return resp.results;
        }
    }
);

exports.Payment = Payment;
exports.Payments = Payments;
