'use strict'

// npm
const ghGot = require('gh-got')
const pickBy = require('lodash.pickby')

const headersPicker = (value, key) =>
  !key.indexOf('x-ratelimit-') ||
  ['link', 'server', 'date', 'status'].indexOf(key) !== -1

const chosenHeaders = function (headers) {
  const picks = pickBy(headers, headersPicker)
  picks.timestamp = new Date(picks.date).getTime()
  picks.timestampDiff = Math.round((picks.timestamp - Date.now()) / 10) / 100
  picks.timestamp /= 1000
  picks['x-ratelimit-limit'] = parseInt(picks['x-ratelimit-limit'], 10)
  picks['x-ratelimit-remaining'] = parseInt(picks['x-ratelimit-remaining'], 10)
  picks['x-ratelimit-reset'] = parseInt(picks['x-ratelimit-reset'], 10)
  picks.statusCode = parseInt(picks.status, 10)
  return picks
}

exports.got = (searchUrl, obj) => ghGot(searchUrl, obj)
  .then((result) => {
    result.body.headers = chosenHeaders(result.headers)
    return result.body
  })

exports.rateLimit = () => exports.got('rate_limit')
  .then((result) => {
    delete result.resources
    return result
  })
