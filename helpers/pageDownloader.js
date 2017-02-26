const UnixShell = require("shelljs");
const mainDir = "thief-box";

/**
 * FUNCTION START WGET AND SAVE WAB PAGE LOCALLY
 * @param url
 */
exports.saveWebApplication = function (dataInfo) {
    UnixShell.exec('wget -P'+ mainDir +' -r -k -l 7 -p -E -nc ' + dataInfo.url, function(data){
        compressFile(dataInfo)
        // Email.sendEmail(Email.defaultEmailTemplate, "aroksetxua@gmail.com", "web page: " + url +" stoled", url + " webpage stolled");
    });
};

function compressFile(dataInfo) {
    UnixShell.exec('zip -r ' + dataInfo.name + '.zip thief-box/' + dataInfo.url , function (data) {
        console.log("Ziped")
    });
}



