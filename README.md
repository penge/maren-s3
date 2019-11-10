# Maren S3

Maren plugin to upload `_build` to AWS S3.

Can be used independently to upload any project.

## Install

```
$ npm install maren-s3
```

Update `maren.json`:

```json
{
  "theme": "my-theme",
  "plugins": [
    "maren-s3"
  ]
}
```

## Use

```
$ maren upload <bucket>
  [--themes]
  [--static]
  [--html]
  [--dryrun]
```
