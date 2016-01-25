# stream-uploads
[![Build Status](https://travis-ci.org/agconti/stream-uploads.svg?branch=master)](https://travis-ci.org/agconti/stream-uploads)
[![npm version](https://badge.fury.io/js/stream-uploads.svg)](http://badge.fury.io/js/stream-uploads)

A node.js package that allows you to easily stream uploads to s3

## Install

```bash
npm install stream-uploads
```

## Usage

Simply attach the provided router and start accpeting streaming uploads at `'/uploads'`
```js
const app = require('express')()
const streamingUploadsRouter = require('./routes')

app.use(streamingUploadsRouter)

app.listen(3000)
```


Or make your own custom implementation using the `uploadHandeler` middleware:
```js
const express = require('express')
const app = express()
const uploadHandler = require('stream-uploads').uploadHandler
const async = require('async')


app.post('/upload', uploadHandler, (req, res) => {

	// Do stuff here ...

}
```


### uploadHandeler
#### An Express.js route middleware that reports errors of attempted uploads to s3
* to the client.
* @param {object} err -- uploading file error
* @param {object} req
* @param {object} res
* @param {function} next
