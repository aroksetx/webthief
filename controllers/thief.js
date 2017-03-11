const express = require('express');
const router = express.Router();
const Downloader = require('./../helpers/pageDownloader');
const responseTemplates = {
    startProcess: {
        title: "Воришка начал свое грязное дело!",
        description: "Как только Воришка добуде содержимое он свяжеться с вами..."
    },
    checkPage: {
        title: "Воришка не знает что делать..",
        description: "Что бы Воришка начал действовать вы должны дать наводку!"
    }
};


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('thief', responseTemplates.checkPage);
});


router.post('/', function (req, res) {
    let reqParam = req.body;
    if (reqParam.url == undefined || !protocolUrlValidator(reqParam.url)) {
        res.send("URL param is not found or URL is not valid");
        return;
    }
    Downloader.saveWebApplication(nameGenerator(reqParam.url));
    res.render('thief', responseTemplates.startProcess);
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
