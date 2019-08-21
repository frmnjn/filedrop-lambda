const AWS = require("aws-sdk");
var dynamodb = new AWS.DynamoDB.DocumentClient({ region: "ap-southeast-1" });

exports.handler = (event, context, callback) => {
  var ownerUsername = event.body.ownerUsername;
  var droplinkName = event.body.droplinkName;
  var droplinkId = Date.now() + "_" + ownerUsername;

  var params = {
    TableName: "filedrop.droplinks",
    Item: {
      droplinkId: droplinkId,
      ownerUsername: ownerUsername,
      droplinkName: droplinkName
    },
    ReturnConsumedCapacity: "TOTAL"
  };

  console.log("Adding a new item...");
  dynamodb.put(params, function(err, data) {
    if (err) {
      console.error(
        "Unable to add item. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log("Put Item success!");
      callback(null, {
        statusCode: 200,
        body: { data: data }
      });
    }
  });
};
