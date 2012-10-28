#tbd.js

[github pages](http://danieleli.github.com/Quad/)

tbd.js is a node.js module providing a wrapper to the [tbd]
(http://www.tbd.com) API.

All API method are fairly well documented at [tbd Developers]
(http://developers.tbd.com) but if you find a discrepancy between the
docs and this wrapper feel free to file an "Issue".

## Installation

    $ npm install tbd

Note: This module utilises [libxmljs](https://github.com/polotek/libxmljs). You
will need have the **libxml2** library installed and also the **libxml2-devel**
(**libxml2-dev** on debian systems) package. This comes with the `xml2-config`
utility that is needed for compiling.  **This command must be in your path.**

## Example

    var tbd = require("tbd");

    var tbd = new tbd(api_token, api_token_secret)
      , payment = new tbd.Payments();

    payment.get(payment_id, function(err, payment) {
      if(err) { //returns if an error has occured, ie payment_id doesn't exist.
        console.log(err);
      } else {
        console.log("Payment Number:" + payment.number);
      }
    });

## Changelog

0.01 - Copied directly from [freshbooks.js](https://github.com/Metacrash/freshbooks.js/blob/cfae4516bc555edc354b4615a631f105500cc228/README.md)

## License

(The MIT License)

Copyright (c) 2012 Marc Loney &lt;marc@metacrash.com.au&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the 'Software'), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
