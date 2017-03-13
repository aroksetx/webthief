// require modules
const fs = require('fs');
const archiver = require('archiver');
const config = require('./../config');

exports.compress = (zipName) => {
    let zipOutput = fs.createWriteStream(config.path.applicationPath + config.path.zipStorage + zipName + ".zip");
    let zip = archiver('zip', {
        zlib: {
            level: 2 //compress level [we don't care about size]
        }
    });

    // pipe archive data to the file
    zip.pipe(zipOutput);

    // good practice to catch this error explicitly
    zip.on('error', function (err) {
        throw err;
    });

    return {
        success: function (callback) {
            // listen for all archive data to be written
            zipOutput.on('close', function () {
                callback();
                console.log(zip.pointer() + ' total bytes');
                console.log('archiver has been finalized and the output file descriptor has closed.');
            });
        },

        addFolder: function (folderName) {
            //append files from a directory
            zip.directory(config.path.applicationPath + config.path.webStorage + folderName, folderName);
            zip.finalize();
        }
    }
}