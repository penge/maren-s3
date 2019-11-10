const path = require('path');
const fs = require('fs');
const mime = require('mime-types');

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const getCacheControl = (ContentType) => {
  switch (ContentType) {
  case 'text/html':
  case 'text/markdown':
    return 'no-cache, no-store, must-revalidate';
  default:
    return 'max-age=604800'; // 1 week
  }
};

let count = 0;
module.exports = async(bucket, baseFolder, entries, { dryrun, totalCount }) => {
  for (const entry of entries) {
    if (dryrun) {
      console.log(path.relative(baseFolder, entry));
    }
    else {

      fs.readFile(entry, (err, data) => {
        if (err) throw err;

        const Bucket = bucket;
        const ACL = 'public-read';
        const Key = path.relative(baseFolder, entry);
        const ContentType = mime.lookup(entry);
        const Body = data;
        const CacheControl = getCacheControl(ContentType);

        const params = {
          Bucket,
          ACL,
          Key,
          ContentType,
          Body,
          CacheControl
        };

        s3.putObject(params, function (err, data) {
          if (err) {
            console.log(err, err.stack);
          } else {
            count += 1;
            process.stdout.write(`Progress: ${count}/${entries.length}\r`);
          }
        });
      });
    }
  }
};
