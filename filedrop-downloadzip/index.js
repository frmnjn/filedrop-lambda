const AWS = require("aws-sdk");
const s3Zip = require("s3-zip");

exports.handler = function(event, context) {
  console.log("event", event);

  const region = "ap-southeast-1";
  const bucket = "frmnjn-filedrop";
  const folder = event.body.ownerUsername + "/" + event.body.droplink + "/";
  const files = event.body.arrayfiles;
  const zipFileName = event.body.droplink + ".zip";

  // Create body stream
  try {
    const body = s3Zip.archive(
      { region: region, bucket: bucket },
      folder,
      files
    );
    const zipParams = { params: { Bucket: bucket, Key: folder + zipFileName } };
    const zipFile = new AWS.S3(zipParams);
    zipFile
      .upload({ Body: body })
      .on("httpUploadProgress", function(evt) {
        console.log(evt);
      })
      .send(function(e, r) {
        if (e) {
          const err = "zipFile.upload error " + e;
          console.log(err);
          context.fail(err);
        }
        console.log(r);
        context.succeed(r);
        callback(null, { body: { statusCode: 200, success: true } });
      });
  } catch (e) {
    const err = "catched error: " + e;
    console.log(err);
    context.fail(err);
  }
};
