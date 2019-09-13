const AWS = require("aws-sdk");
const s3 = new AWS.S3();

exports.handler = async (event, Context, Callback) => {
  // TODO implement
  var params = {
    Bucket: "frmnjn-filedrop",
    Fields: {
      key: event.body.Key
    },
    ResponseContentDisposition: "attachment",
    ResponseContentType: event.body.type,
    CannedACL: "public-read"
  };

  await s3.createPresignedPost(params, function(err, data) {
    if (err) {
      console.error("Presigning post data encountered an error", err);
    } else {
      //data.Fields.key = 'path/to/uploads/${filename}';
      console.log("The post data is", data);
      const response = {
        data
      };
      Callback(null, response.data);
    }
  });
};
