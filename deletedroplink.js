var AWS = require("aws-sdk");
var s3 = new AWS.S3();
var dynamodb = new AWS.DynamoDB.DocumentClient({ region: "ap-southeast-1" });

exports.handler = (event, context, callback) => {
  let droplinkId = event.body.droplinkId;

  var params = {
    Bucket: "frmnjn-filedrop",
    Prefix: event.body.ownerUsername + "/" + event.body.droplinkName + "/"
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
          body: {
            success: false,
            message: "delete droplink failed, data exists"
          }
        });
      } else {
        // delete droplink from dynamodb
        var params = {
          TableName: "filedrop.droplinks",
          Key: {
            droplinkId: droplinkId
          }
        };
        dynamodb.delete(params, function(err, data) {
          if (err) {
            console.error(
              "Unable to delete item. Error JSON:",
              JSON.stringify(err, null, 2)
            );
          } else {
            console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
            // console.log("DeleteItem succeeded:", JSON.stringify(data));
            callback(null, {
              statusCode: 200,
              body: { success: true, message: "Delete Droplink Success!" }
            });
          }
        });
      }
    }
  });
};
