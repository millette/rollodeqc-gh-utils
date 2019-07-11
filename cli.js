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

const cli = meow(`
Usage
  $ ok <cmd>

Options
  --token  Token GitHub. [Default: false]

Examples
  $ ok
  unicorns & rainbows
  $ ok ponies
  ponies & rainbows
`)

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

    case 'test':
      const obj1 = {
        login: 'ferd',
        id: 111141,
        type: 'User',
        site_admin: false,
        name: 'Fred Hebert',
        company: 'Heroku',
        blog: 'http://learnyousomeerlang.com',
        location: 'Saguenay, Qc, Canada',
        email: 'mononcqc@ferd.ca',
        hireable: null,
        bio: null,
        public_repos: 69,
        public_gists: 57,
        followers: 443,
        following: 14,
        created_at: '2009-08-02T17:50:24Z',
        updated_at: '2016-04-02T01:46:21Z',
        headers: {
          server: 'GitHub.com',
          date: 'Sat, 09 Apr 2016 09:00:06 GMT',
          status: '200 OK',
          'x-ratelimit-limit': 5000,
          'x-ratelimit-remaining': 4229,
          'x-ratelimit-reset': 1460192786,
          etag: 'W/"8c61e90bbe751b47234c45de67980e98"',
          timestamp: 1460192406,
          timestampDiff: 3.52,
          statusCode: 200
        }
      }
      const obj2 = utils.chosenFields(obj1)
      console.log('obj', obj2)
      break

    default:
      console.log(cli.input[0], 'command is unsupported.')
  }
} else {
  console.log('I need a command, sir.')
}
