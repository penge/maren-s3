# Maren S3

[![Maren](https://img.shields.io/badge/MAREN.IO-blue?style=for-the-badge)](https://maren.io)

Maren plugin that uploads `_build` to S3.

Can be used independently to upload any project.

## Installation

```
$ npm init (inside Maren project, if not done before)
$ npm i maren-s3
```

Then update `maren.json`:

```json
{
  "theme": "my-theme",
  "plugins": [
    "maren-s3"
  ]
}
```

Make sure to have installed
[AWS Command Line Interface](https://aws.amazon.com/cli/).

## Use

```
$ maren upload <bucket>
  [--themes]
  [--images]
  [--html]
  [--dryrun]
```
