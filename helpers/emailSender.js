const helper = require('sendgrid').mail;
const crypto_key = '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';

exports.sendEmail = function (from, to, subject, content) {
    let from_email = new helper.Email(from);
    let to_email = new helper.Email(to);
    let content_code = new helper.Content('text/plain', content);
    let mail = new helper.Mail(from_email, subject, to_email, content_code);

    let sg = require('sendgrid')(crypto_key);
    let request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON(),
    });

    sg.API(request, function(error, response) {
        console.log(response.statusCode);
        console.log(response.body);
        console.log(response.headers);
    });
}