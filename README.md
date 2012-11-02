#pps.js

[github pages](http://danieleli.github.com/Quad/)

pps.js is a node.js module providing a wrapper to the [pps]
(http://api.pps.com/v1/) API.

All API method are fairly well documented at [pps Developers]
(http://developers.pps.com) but if you find a discrepancy between the
docs and this wrapper feel free to file an "Issue".

## Installation

    $ npm install pps  

    or  

    git clone git@github.com:danieleli/Quad.git  
    cd Quad  
    npm install  




## Example

    var Pps = require("pps");
    var pps = new Pps(api_token, api_token_secret);

    var payments = pps.Payments.getAll(function(err, data, response){
        if(err) { //returns if an error has occured, ie payment_id doesn't exist.
            console.log(err);
        } else {
            console.log(data);
        }
    };


## Changelog

0.02 - Documentation by [groc](https://github.com/nevir/groc)
0.01 - Copied directly from [freshbooks.js](https://github.com/Metacrash/freshbooks.js/blob/cfae4516bc555edc354b4615a631f105500cc228/README.md)

## License

(The MIT License)

Copyright (c) 2012 Dan Schlossberg &lt;dan@softwaresingularity.com&gt;

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
