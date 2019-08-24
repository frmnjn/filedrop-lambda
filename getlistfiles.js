var AWS = require("aws-sdk");
var s3 = new AWS.S3();

exports.handler = (event, context, callback) => {
  var params = {
    Bucket: "frmnjn-filedrop",
    Prefix: event.body.username + "/" + event.body.droplinkName + "/"
  };

  s3.listObjects(params, function(err, data) {
    if (err) {
      callback(null, {
        statusCode: 200,
        body: { data: err.message, success: false }
      });
    } else {
      if (data.Contents.length != 0) {
        callback(null, {
          statusCode: 200,
          body: { data: data.Contents, success: true }
        });
      } else {
        callback(null, {
          statusCode: 200,
          body: { data: "there is no data", success: false }
        });
      }
    }
  });
};
