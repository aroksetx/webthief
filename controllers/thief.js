const express = require('express');
const router = express.Router();
const Downloader = require('./../helpers/pageDownloader');
const urlFilterCondition = ['https://', 'http://'];

const responseTemplates = {
    startProcess: {
        title: "Воришка начал свое грязное дело!",
        description: "Как только Воришка добуде содержимое он свяжеться с вами...",
        isPost: true

    },
    checkPage: {
        title: "Воришка не знает что делать..",
        description: "Что бы Воришка начал действовать вы должны дать наводку!",
        isPost: false
    }
};

/* GET users listing. */
router.get('/', function(req, res, next) {
    if(req.query.process){
        res.render('thief', responseTemplates.startProcess);
        return;
    }
    res.render('thief', responseTemplates.checkPage);
});


router.post('/', function (req, res) {
    let reqParam = req.body;
    if (isUndefined(reqParam.url) || !isUrlValid(reqParam.url)) {
        res.send("URL param is not found or URL is not valid");
        return;
    }
    if(isUndefined(reqParam.email) || !isEmailValid(reqParam.email)){
        res.send("Email Invalid");
        return;
    }

   Downloader.saveWebApplication(generateZipInfo(reqParam));
   res.redirect('/thief?process=true');
});

function getFolderName(url, filters) {
    for(let i = 0; i < filters.length; i++){
        if(url.match(filters[i])){
            let res = url.replace(filters[i], '');
            res = res.split('/');
            return res[0];
        }
    }
    return url;
}

function generateZipInfo(params) {
    return {
        url: params.url,
        folderName: getFolderName(params.url, urlFilterCondition),
        zipName: new Buffer(params.url + new Date()).toString('base64'),
        email: params.email
    }
}

function isUndefined(param) {
    return param == undefined;
}

function isEmailValid(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
function isUrlValid(url){
    return /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)+$/.test(url);
}

module.exports = router;
