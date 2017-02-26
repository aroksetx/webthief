const express = require('express');
const router = express.Router();
const Email = require('./../helpers/emailSender');
const Downloader = require('./../helpers/pageDownloader');
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('thief', {
        title: 'Thief start his dirty job!',
        desciption: 'We will send link with web page'});
});


router.post('/', function (req, res) {
    let reqParam = req.body;
    if(reqParam.url == undefined || !protocolUrlValidator(reqParam.url)){
        res.send("URL param is not found or URL is not valid");
        return;
    }
    Downloader.saveWebApplication(nameGenerator(reqParam.url))
    res.send("Your request is successful: " + reqParam.url);
});

function nameGenerator(url) {
    return {
        url: url,
        name: new Buffer(url + new Date()).toString('base64')
    }
}

function protocolUrlValidator(url){
    return /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)+$/.test(url);
}

module.exports = router;
