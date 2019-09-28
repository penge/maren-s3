const upload = require('./src/upload');

const command = [
  'upload <bucket> [--themes] [--images] [--html] [--dryrun]',
  'upload to S3',
  yargs => {
    yargs.positional('themes', {
      type: 'boolean',
      default: false,
      describe: 'upload themes'
    });

    yargs.positional('images', {
      type: 'boolean',
      default: false,
      describe: 'upload images'
    });

    yargs.positional('html', {
      type: 'boolean',
      default: false,
      describe: 'upload html'
    });

    yargs.positional('dryrun', {
      type: 'boolean',
      default: false,
      describe: 'display operations without running them'
    });
  },
  argv => {
    // By default, upload everything
    if (!argv.themes && !argv.images && !argv.html) {
      argv.themes = true;
      argv.images = true;
      argv.html = true;
    }

    upload(argv);
  }
];

module.exports = {
  type: 'command',
  command
};
