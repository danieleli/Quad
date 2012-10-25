var config = {
    consumerKey       : "CBF65B02-18CE-4D3C-94EE-DBA0CD478CC0",
    consumerSecret    : "FlOQnGUghKzhcyc7GrsO2gYbLYA=",
    requestTokenUrl   : "https://api.pps.io/v1/OAuth/1A/RequestToken",
    accessTokenUrl    : "https://api.pps.io/v1/OAuth/1A/AccessToken",
    authorizeTokenUrl : "https://api.pps.io/v1/OAuth/1A/AuthorizeToken", // not implemented.  returns nil
    authorize_callback: "",
    version           : "1.0",
    signatureMethod   : "HMAC-SHA1",
    rootUrl           : "https://api.pps.io/v1/"
};

module.exports = config;


var merchId = "10001322";
