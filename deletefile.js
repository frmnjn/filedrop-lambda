var AWS = require("aws-sdk");
var s3 = new AWS.S3();

exports.handler = (event, context, callback) => {
  var params = {
    Bucket: "frmnjn-filedrop",
    Key: event.body.Key
  };

  s3.deleteObject(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else {
      console.log(data);
      callback(null, {
        statusCode: 200,
        body: { success: true, data: data }
      });
    }
  });
};
