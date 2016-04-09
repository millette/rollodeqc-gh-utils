#!/usr/bin/env node
/*
RoLLodeQc GitHub utilities

Copyright 2016 Robin Millette <http://robin.millette.info/>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the
[GNU Affero General Public License](LICENSE.md)
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

'use strict'
const utils = require('./')
const meow = require('meow')

const cli = meow([
  'Usage',
  '  $ ok <cmd>',
  '',
  'Options',
  '  --token  Token GitHub. [Default: false]',
  '',
  'Examples',
  '  $ ok',
  '  unicorns & rainbows',
  '  $ ok ponies',
  '  ponies & rainbows'
])

if (cli.input.length) {
  switch (cli.input[0].toLowerCase()) {
    case 'rl':
    case 'ratelimit':
    case 'rate-limit':
    case 'rate_limit':
      utils.rateLimit(cli.flags.token)
        .then((rl) => {
          delete rl.headers
          console.log(JSON.stringify(rl, null, ' '))
        })
      break

    default:
      console.log(cli.input[0], 'command is unsupported.')
  }
} else {
  console.log('I need a command, sir.')
}
