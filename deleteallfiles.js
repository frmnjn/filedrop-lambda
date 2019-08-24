var AWS = require("aws-sdk");
var s3 = new AWS.S3();
exports.handler = (event, context, callback) => {
  var params = {
    Bucket: "frmnjn-filedrop" /* required */,
    Delete: {
      /* required */
      Objects: event.body.Key,
      Quiet: true || false
    }
  };

  s3.deleteObjects(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
      callback(null, {
        statusCode: 200,
        body: { success: false, message: err }
      });
    } else {
      console.log(params.Delete.Objects.length, " deleted"); // successful response
      callback(null, {
        statusCode: 200,
        body: {
          success: true,
          message: params.Delete.Objects.length + " deleted"
        }
      });
    }
  });
};
