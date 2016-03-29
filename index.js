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
