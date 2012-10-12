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
        //        ,
        //        sync : function ( method, model, options ) {
        //            var type = methodMap[method];
        //
        //            // Default options, unless specified.
        //            options || (options = {});
        //
        //            // Default JSON-request options.
        //            var params = {type: type, dataType: 'json'};
        //
        //            // Ensure that we have a URL.
        //            if ( !options.url ) {
        //                params.url = getValue( model, 'url' ) || urlError();
        //            }
        //
        //            // Ensure that we have the appropriate request data.
        //            if ( !options.data && model && (method == 'create' || method == 'update') ) {
        //                params.contentType = 'application/json';
        //                params.data = JSON.stringify( model.toJSON() );
        //            }
        //
        //            // For older servers, emulate JSON by encoding the request into an HTML-form.
        //            if ( Backbone.emulateJSON ) {
        //                params.contentType = 'application/x-www-form-urlencoded';
        //                params.data = params.data ? {model: params.data} : {};
        //            }
        //
        //            // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
        //            // And an `X-HTTP-Method-Override` header.
        //            if ( Backbone.emulateHTTP ) {
        //                if ( type === 'PUT' || type === 'DELETE' ) {
        //                    if ( Backbone.emulateJSON ) params.data._method = type;
        //                    params.type = 'POST';
        //                    params.beforeSend = function ( xhr ) {
        //                        xhr.setRequestHeader( 'X-HTTP-Method-Override', type );
        //                    };
        //                }
        //            }
        //            if ( params.type !== 'GET' && !Backbone.emulateJSON ) {
        //                params.processData = false;
        //            }
        //            return $.ajax( _.extend( params, options ) );
        //
    }
);

exports.Contact = Contact;
exports.Contacts = Contacts;
