var sesAccessKey = 'notification.filedrop@gmail.com'
var sesSecretKey = 'Password_123'

 exports.handler = function(event, context, callback) {

  	var nodemailer = require('nodemailer');
  	var smtpTransport = require('nodemailer-smtp-transport');

  	var transporter = nodemailer.createTransport(smtpTransport({
	    service: 'gmail',
	    auth: {
	        user: sesAccessKey,
	        pass: sesSecretKey
	    }
  	}));

  	var text = 'Email body goes here';

  	var mailOptions = {
	    from: sesAccessKey,
	    to: 'firmanbudis@gmail.com',
	    bcc: '<bcc email addres>',
	    subject: 'Test subject',
	    text: text
  	};

  	transporter.sendMail(mailOptions, function(error, info){
      if(error){
        const response = {
          statusCode: 500,
          body: JSON.stringify({
            error: error.message,
          }),
        };
        callback(null, response);
      }
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: `Email processed succesfully!`
        }),
      };
      callback(null, response);
    });
}