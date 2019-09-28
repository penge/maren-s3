const { spawn } = require('child_process');
const options = require('./options');

const upload = (localPath, s3Uri, options, dryrun) => {
  const args = ['s3', 'cp', localPath, s3Uri,
    '--recursive',
    '--acl', 'public-read',
    ...options,
    ...(dryrun ? ['--dryrun'] : [])
  ];
  spawn('aws', args, { stdio: 'inherit' });
};

/**
 * Upload <cwd>/_build to <bucket>
 */
module.exports = argv => {
  const { cwd, bucket, themes, images, html, dryrun } = argv;
  const localPath = `${cwd}/_build`;
  const s3Uri = `s3://${bucket}`;

  if (themes) {
    upload(localPath, s3Uri, options.themes, dryrun);
  }

  if (images) {
    upload(localPath, s3Uri, options.images, dryrun);
  }

  if (html) {
    upload(localPath, s3Uri, options.html, dryrun);
  }
};
