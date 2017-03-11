// require modules
const fs = require('fs');
const archiver = require('archiver');
const pathToZipArchiv = "./compressed/"

exports.fileCompressor = function (name, path) {
    // create a file to stream archive data to.
    var output = fs.createWriteStream(pathToZipArchiv + name + '.zip');
    var archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
    });

// listen for all archive data to be written
    output.on('close', function() {
        console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');
    });

// good practice to catch this error explicitly
    archive.on('error', function(err) {
        throw err;
    });

// pipe archive data to the file
    archive.pipe(output);

// // // append files from a directory
    archive.directory(path +"/");

// finalize the archive (ie we are done appending files but streams have to finish yet)
    archive.finalize();
};