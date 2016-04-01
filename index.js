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

// npm
const ghGot = require('gh-got')
const pickBy = require('lodash.pickby')
const flow = require('lodash.flow')
const partial = require('lodash.partial')

const headersPicker = (value, key) =>
  !key.indexOf('x-ratelimit-') ||
  ['link', 'server', 'date', 'status'].indexOf(key) !== -1

const asInt = (field, picks) => {
  picks[field === 'status' ? 'statusCode' : field] = parseInt(picks[field], 10)
  return picks
}

const ints = flow(
  partial(asInt, 'x-ratelimit-limit'),
  partial(asInt, 'x-ratelimit-remaining'),
  partial(asInt, 'x-ratelimit-reset'),
  partial(asInt, 'status')
)

const chosenHeaders = (headers) => {
  const picks = pickBy(headers, headersPicker)
  picks.timestamp = new Date(picks.date).getTime()
  picks.timestampDiff = Math.round((picks.timestamp - Date.now()) / 10) / 100
  picks.timestamp /= 1000
  return ints(picks)
}

exports.got = (url, obj) => ghGot(url, obj)
  .then((result) => {
    result.body.headers = chosenHeaders(result.headers)
    return result.body
  })

exports.rateLimit = () => exports.got('rate_limit')
  .then((result) => {
    delete result.resources
    return result
  })

exports.links = (result) => {
  if (!result || !result.headers || !result.headers.link || result.headers.link.indexOf(', ') === -1) { return false }
  const links = {}
  result.headers.link.split(', ')
    .map((i) => i.split('; rel=').map((j) => j.slice(1, -1)))
    .forEach((i) => { links[i[1]] = i[0] })
  return links
}

exports.wait = (result) => (result && result.headers && result.headers['x-ratelimit-reset'])
  ? (1000 * result.headers['x-ratelimit-reset'] - Date.now()) /
    result.headers['x-ratelimit-remaining']
  : 2000
