const AWS = require("aws-sdk");
var dynamodb = new AWS.DynamoDB.DocumentClient({ region: "ap-southeast-1" });

exports.handler = (event, context, callback) => {
  let ownerUsername = event.body.ownerUsername;
  let droplinkName = event.body.droplinkName;
  var params = {
    TableName: "filedrop.droplinks",
    ProjectionExpression: "#ou, droplinkId, droplinkName",
    FilterExpression: "#ou = :ownerUsername AND #dn = :droplinkName",
    ExpressionAttributeNames: {
      "#ou": "ownerUsername",
      "#dn": "droplinkName"
    },
    ExpressionAttributeValues: {
      ":ownerUsername": ownerUsername,
      ":droplinkName": droplinkName
    }
  };

  dynamodb.scan(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
      callback(null, {
        statusCode: 200,
        body: { success: false, message: err }
      });
      // res.json({ success: false, message: err });
    } else {
      if (data.Count == 0) {
        callback(null, {
          statusCode: 200,
          body: { success: false }
        });
        //   res.json({ success: false });
      } else {
        callback(null, {
          statusCode: 200,
          body: { success: true }
        });
        //   res.json({ success: true });
      }
    }
  });
};
