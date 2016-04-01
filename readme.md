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

Fetch json documents from GitHub.
Like [ghGot](https://github.com/sindresorhus/gh-got)
with a little sugar added. Only some headers are kept and parsed.

Returns a promise.

#### obj
Type: `object`<br>
Default: `{}`

See ghGot. Good for token, etc.

### rollodeqcGhUtils.rateLimit()

Fetch current rate limit and return a promise.

### rollodeqcGhUtils.links(result)
#### result
Type: `object`

Parses result.headers.link and returns an object with next, previous and last links.

### rollodeqcGhUtils.wait(result)
#### result
Type: `object`

Return time to wait (in ms) between calls to got() to respect the rate limit.

## Dependencies
* gh-got
* lodash.pickby
* lodash.flow
* lodash.partial

## License
AGPL-v3 © [Robin Millette](http://robin.millette.info)
