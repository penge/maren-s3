const themes = [
  '--exclude', '*',
  '--include', 'themes/*',
  '--cache-control', 'max-age=604800' // 1 week
];

const static = [
  '--exclude', '*',
  '--include', 'static/*',
  '--cache-control', 'max-age=31536000' // 1 year
];

const html = [
  '--exclude', '*',
  '--include', '*.html',
  '--cache-control', 'no-cache, no-store, must-revalidate'
];

module.exports = {
  themes,
  static,
  html
};
