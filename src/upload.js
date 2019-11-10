const path = require('path');
const fg = require('fast-glob');
const checkBucketExists = require('./check-bucket-exists');
const uploadEnries = require('./upload-entries');

/**
 * Upload <cwd>/_build to <bucket>
 */
module.exports = async argv => {
  const { cwd, bucket, themes, static, html, dryrun } = argv;

  const bucketExists = await checkBucketExists(bucket);
  if (!bucketExists) {
    console.log(`"${bucket}" does not exist!`);
    process.exit(1);
  }

  const baseFolder = path.join(cwd, '_build');

  if (!dryrun) console.log(`Uploading to ${bucket}.`);
  let entries = [];

  if (themes) {
    const pattern = path.join(baseFolder, 'themes/**');
    entries.push(...(await fg(pattern)));
  }

  if (static) {
    const pattern = path.join(baseFolder, 'static/**');
    entries.push(...(await fg(pattern)));
  }

  if (html) {
    const pattern = path.join(baseFolder, '/**/*.html');
    entries.push(...(await fg(pattern)));
  }

  // Upload files to S3
  uploadEnries(bucket, baseFolder, entries, { dryrun });

  process.on('exit', () => {
    if (!dryrun) process.stdout.write('\r\nDone!\r\n');
  });
};
