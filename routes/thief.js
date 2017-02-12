var express = require('express');
var router = express.Router();
var shell = require("shelljs");
var dirPath = "thief-box";
var helper = require('sendgrid').mail;
var from_email = new helper.Email('test@example.com');
var to_email = new helper.Email('aroksetxua@gmail.com');
var subject = 'Hello World from the SendGrid Node.js Library!';
var content = new helper.Content('text/plain', 'Hello, Email!');
var mail = new helper.Mail(from_email, subject, to_email, content);




/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('thief', {
        title: 'Thief start his dirty job!',
        desciption: 'We will send link with web page'});
});


router.post('/', function (req, res) {

    var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON(),
    });

    sg.API(request, function(error, response) {
        console.log(response.statusCode);
        console.log(response.body);
        console.log(response.headers);
    });

    // var reqParam = req.body;
    // if(reqParam.url === undefined || !validateUrl(reqParam.url)){
    //     res.send("URL param is not found or URL is not valid");
    //     return;
    // }
    // savePage(reqParam.url);
    // res.send("Your request is successful: " + reqParam.url);
});

function validateUrl(url){
    return /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)+$/.test(url);
}

/**
 * FUNCTION START WGET AND SAVE WAB PAGE LOCALLY
 * @param url
 */
function savePage(url){
    var res = shell.exec('wget -P'+ dirPath +' -r -k -l 7 -p -E -nc ' + url, function(data){
        console.log("Done")
    });
}



module.exports = router;
