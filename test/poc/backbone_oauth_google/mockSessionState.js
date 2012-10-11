exports.OAuth = {
    "oauth_token"              : "4/RdDYbb7yGB6uvinTheV8hrlurpfl",
    "oauth_token_secret"       : "HZD3XnU7GFe-s1oUUiIDdFcr",
    "oauth_access_token"       : "1/St9uNzaoD3WOITQPLpCQaz31L7y9hCP9iZfIe1gWfXI",
    "oauth_access_token_secret": "MFrWLZ1H2R2IyuAy2hHbj-E0"
};

exports.OA = {
    "_isEcho"                 : false,
    "_requestUrl"             : "https://www.google.com/accounts/OAuthGetRequestToken?scope=https%3A%2F%2Fwww.google.com%2Fm8%2Ffeeds%2F+https%3A%2F%2Fwww.google.com%2Fcalendar%2Ffeeds%2F",
    "_accessUrl"              : "https://www.google.com/accounts/OAuthGetAccessToken",
    "_consumerKey"            : "anonymous",
    "_consumerSecret"         : "anonymous",
    "_version"                : "1.0",
    "_authorize_callback"     : "http://localhost:3000/google_cb?action=%2Fgoogle_contacts",
    "_signatureMethod"        : "HMAC-SHA1",
    "_nonceSize"              : 32,
    "_headers"                : {
        "Accept"    : "*/*",
        "Connection": "close",
        "User-Agent": "Node authentication"
    },
    "_defaultClientOptions"   : {
        "requestTokenHttpMethod": "POST",
        "accessTokenHttpMethod" : "POST"
    },
    "_clientOptions"          : {
        "requestTokenHttpMethod": "POST",
        "accessTokenHttpMethod" : "POST"
    },
    "_oauthParameterSeperator": ","
};


var sampleGoogleResponse = { version: '1.0',
    encoding                        : 'UTF-8',
    feed                            : { xmlns: 'http://www.w3.org/2005/Atom',
        'xmlns$openSearch'                   : 'http://a9.com/-/spec/opensearch/1.1/',
        'xmlns$gContact'                     : 'http://schemas.google.com/contact/2008',
        'xmlns$batch'                        : 'http://schemas.google.com/gdata/batch',
        'xmlns$gd'                           : 'http://schemas.google.com/g/2005',
        'gd$etag'                            : 'W/"CEMARngzcCt7I2A9WhJaGUQ."',
        id                                   : { '$t': 'danschlossberg@gmail.com' },
        updated                              : { '$t': '2012-10-11T21:54:07.688Z' },
        category                             : [
            [Object]
        ],
        title                                : { '$t': 'Dan\'s Contacts' },
        link                                 : [
            [Object],
            [Object],
            [Object],
            [Object],
            [Object],
            [Object]
        ],
        author                               : [
            [Object]
        ],
        generator                            : { version: '1.0',
            uri                                         : 'http://www.google.com/m8/feeds',
            '$t'                                        : 'Contacts' },
        'openSearch$totalResults'            : { '$t': '997' },
        'openSearch$startIndex'              : { '$t': '1' },
        'openSearch$itemsPerPage'            : { '$t': '25' },
        entry                                : [
            [Object],
            [Object],
            [Object],
            [Object],
            [Object],
            [Object],
            [Object],
            [Object],
            [Object],
            [Object],
            [Object],
            [Object],
            [Object],
            [Object],
            [Object],
            [Object],
            [Object],
            [Object],
            [Object],
            [Object],
            [Object],
            [Object],
            [Object],
            [Object],
            [Object]
        ] } };
