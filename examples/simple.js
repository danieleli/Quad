var Pps = require( '../lib/pps_adapter' );

var config = {
    consumerKey       : "consumerKey",
    consumerSecret    : "consumerSecret",
    requestTokenUrl   : "https://api.pps.io/v1/OAuth/1A/RequestToken",
    accessTokenUrl    : "https://api.pps.io/v1/OAuth/1A/AccessToken",
    authorizeTokenUrl : "https://api.pps.io/v1/OAuth/1A/AuthorizeToken",
    authorize_callback: "",
    version           : "1.0",
    signatureMethod   : "HMAC-SHA1",
    rootUrl           : "https://api.pps.io/v1/"
};

var pps = new Pps( apiConfig );

pps.Pci.getAll(null, function(err,data,response){
    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
});
