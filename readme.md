# rollodeqc-gh-utils [![Build Status](https://travis-ci.org/millette/rollodeqc-gh-utils.svg?branch=master)](https://travis-ci.org/millette/rollodeqc-gh-utils)

> My well-made module


## Install

```
$ npm install --save rollodeqc-gh-utils
```


## Usage

```js
const rollodeqcGhUtils = require('rollodeqc-gh-utils');

rollodeqcGhUtils('unicorns');
//=> 'unicorns & rainbows'
```


## API

### rollodeqcGhUtils(input, [options])
### exports.got = (url, obj) => ghGot(url, obj)

#### input

Type: `string`

Lorem ipsum.

#### options

##### foo

Type: `boolean`<br>
Default: `false`

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
* const ghGot = require('gh-got')
* const pickBy = require('lodash.pickby')
* const flow = require('lodash.flow')
* const partial = require('lodash.partial')


## License

MIT © [Robin Millette](http://robin.millette.info)
