Create HTTP errors for Express, Koa, Connect, etc. with ease.

## Install

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/). Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```console
$ npm install http-errors
```

## Example

```js
var createError = require('http-errors')
var express = require('express')
var app = express()

app.use(function (req, res, next) {
  if (!req.user) return next(createError(401, 'Please login to view this page.'))
  next()
})
```

## API

This is the current API, currently extracted from Koa and subject to change.

### Error Properties

- `expose` - can be used to signal if `message` should be sent to the client,
  defaulting to `false` when `status` >= 500
- `headers` - can be an object of header names to values to be sent to the
  client, defaulting to `undefined`. When defined, the key names should all
  be lower-cased
- `message` - the traditional error message, which should be kept short and all
  single line
- `status` - the status code of the error, mirroring `statusCode` for general
  compatibility
- `statusCode` - the status code of the error, defaulting to `500`

### createError([status], [message], [properties])

Create a new error object with the given message `msg`.
The error object inherits from `createError.HttpError`.

```js
var err = createError(404, 'This video does not exist!')
```

- `status: 500` - the status code as a number
- `message` - the message of the error, defaulting to node's text for that status code.
- `properties` - custom properties to attach to the object

### createError([status], [error], [properties])

Extend the given `error` object with `createError.HttpError`
properties. This will not alter the inheritance of the given
`error` object, and the modified `error` object is the
return value.

<!-- eslint-disable no-redeclare -->

```js
fs.readFile('foo.txt', function (err, buf) {
  if (err) {
    if (err.code === 'ENOENT') {
      var httpError = createError(404, err, { expose: false })
    } else {
      var httpError = createError(500, err)
    }
  }
})
```

- `status` - the status code as a number
- `error` - the error object to extend
- `properties` - custom properties to attach to the object

### createError.isHttpError(val)

Determine if the provided `val` is an `HttpError`. This will return `true`
if the error inherits from the `HttpError` constructor of this module or
matches the "duck type" for an error this module creates. All outputs from
the `createError` factory will return `true` for this function, including
if an non-`HttpError` was passed into the factory.

### new createError\[code || name\](\[msg]\))

Create a new error object with the given message `msg`.
The error object inherits from `createError.HttpError`.

```js
var err = new createError.NotFound()
```

- `code` - the status code as a number
- `name` - the name of the error as a "bumpy case", i.e. `NotFound` or `InternalServerError`.



