# rollodeqc-gh-utils

> RoLLodeQc GitHub utilities


## Install

```
$ npm install --save rollodeqc-gh-utils
```


## Usage

```js
const rollodeqcGhUtils = require('rollodeqc-gh-utils');

rollodeqcGhUtils.rateLimit().then((result) => {
  console.log(JSON.stringify(result, null, ' '))
})
//=>
{
 "rate": {
  "limit": 5000,
  "remaining": 5000,
  "reset": 1459470151
 },
 "headers": {
  "server": "GitHub.com",
  "date": "Thu, 31 Mar 2016 23:22:31 GMT",
  "status": "200 OK",
  "x-ratelimit-limit": 5000,
  "x-ratelimit-remaining": 5000,
  "x-ratelimit-reset": 1459470151,
  "timestamp": 1459466551,
  "timestampDiff": 2.87,
  "statusCode": 200
 }
}
```

## API

### rollodeqcGhUtils.got(url[, obj])

#### url

Type: `string`

Lorem ipsum.

#### obj

##### foo

Type: `object`<br>
Default: `{}`

Lorem ipsum.

### rollodeqcGhUtils(input, [options])
### exports.rateLimit = () => exports.got('rate_limit')

#### input

Type: `string`

Lorem ipsum.

#### options

##### foo

Type: `boolean`<br>
Default: `false`

Lorem ipsum.

### rollodeqcGhUtils(input, [options])
### exports.links = (r) => {

#### input

Type: `string`

Lorem ipsum.

#### options

##### foo

Type: `boolean`<br>
Default: `false`

Lorem ipsum.

### rollodeqcGhUtils(input, [options])
### exports.wait = (r) => (r.headers && r.headers['x-ratelimit-reset'])

#### input

Type: `string`

Lorem ipsum.

#### options

##### foo

Type: `boolean`<br>
Default: `false`

Lorem ipsum.

## Dependencies
* gh-got
* lodash.pickby
* lodash.flow
* lodash.partial

## License

AGPL-v3 © [Robin Millette](http://robin.millette.info)
