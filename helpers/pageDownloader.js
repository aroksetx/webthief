const UnixShell = require("shelljs");
const mainDir = "thief-box";
const Email = require("./emailSender");
const Zip = require("./../helpers/compressor");
const config = require('./../config');

exports.saveWebApplication = function (targetInfo) {
    UnixShell.exec('wget -P'+ mainDir +' -r -k -l 7 -p -E -nc ' + targetInfo.url, function(data){
        compressFile(targetInfo);
    });
};

function compressFile(info, callback) {
    let boxPuck = Zip.compress(info.zipName);
    boxPuck.success(function () {
        Email.sendEmail("info@thief.com", info.email, config.emailTemplates.downloadMsg.subject, generateTemplate(info.url, info.zipName));
    });
    boxPuck.addFolder(info.folderName);
}

function generateTemplate(targetUrl, resultUrl) {
    let template = config.emailTemplates.downloadMsg.message;
    template = template.replace('|-target_url-|',targetUrl);
    template= template.replace('|-result_url-|', config.path.applicationUrl + config.path.downloadPath + resultUrl);
    return template;
}