var Mocha = require( 'mocha' ),
    fs = require( 'fs' ),
    path = require( 'path' );

// First, you need to instantiate a Mocha instance.
var mocha = new Mocha();

mocha.addFile( 'test/pps_test' );

mocha.run();


//// Here is an example for loading a directory
//fs.readdirSync('some/dir').filter(function(file){
//    // Only keep the .js files
//    return file.substr(-3) === '.js';
//
//}).forEach(function(file){
//        // Use the method "addFile" to add the file to mocha
//        mocha.addFile(
//            path.join('some/dir', file)
//        );
//    });
