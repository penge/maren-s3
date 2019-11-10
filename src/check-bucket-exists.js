const AWS = require('aws-sdk');
const s3 = new AWS.S3();

module.exports = async bucket => {
  const options = {
    Bucket: bucket,
  };

  try {
    await s3.headBucket(options).promise();
    return true;
  }
  catch (error) {
    return false;
  }
};
