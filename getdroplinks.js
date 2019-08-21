var AWS = require("aws-sdk");
var dynamodb = new AWS.DynamoDB.DocumentClient({ region: "ap-southeast-1" });

exports.handler = (event, context, callback) => {
  let ownerUsername = event.body.ownerUsername;
  var params = {
    TableName: "filedrop.droplinks",
    ProjectionExpression: "#ou, droplinkId, droplinkName",
    FilterExpression: "#ou = :ownerUsername",
    ExpressionAttributeNames: {
      "#ou": "ownerUsername"
    },
    ExpressionAttributeValues: {
      ":ownerUsername": ownerUsername
    }
  };

  dynamodb.scan(params, function(err, data) {
    if (err) {
      callback(null, {
        statusCode: 200,
        body: { data: err, success: false }
      });
    } else {
      callback(null, {
        statusCode: 200,
        body: { data: data, success: true }
      });
    }
  });
};
