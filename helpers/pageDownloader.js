const UnixShell = require("shelljs");
const mainDir = "thief-box";
const Email = require("./emailSender");
exports.saveWebApplication = function (dataInfo) {
    UnixShell.exec('wget -P'+ mainDir +' -r -k -l 7 -p -E -nc ' + dataInfo.url, function(data){
        compressFile(dataInfo);
    });
};

function compressFile(dataInfo, callback) {
    UnixShell.exec('zip -r ' + dataInfo.name + '.zip thief-box/' + dataInfo.url , function (data) {
        Email.sendEmail("info@thief.com", "aroksetxua@gmail.com", "web page: " + dataInfo.url +" stoled", dataInfo.url + dataInfo.name + " webpage stolled");
    });
}

function generateTemplate() {
    let template = "Сервис Воришка завершил поставленную задачу. Копированные материалы вы можете загрузить по следующей ссылке http://url.com";
}