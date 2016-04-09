/*eslint arrow-parens: [2, "as-needed"]*/
'use strict'
import test from 'ava'
import fn from './'

test('rate limit', async t => {
  const result = await fn.rateLimit()
  t.is(result.headers.statusCode, 200)
  t.is(result.rate.limit, 5000)
})

test('links', t => {
  const result = fn.links({ headers: { link: '<https://api.github.com/search/users?q=bob&page=2>; rel="next", <https://api.github.com/search/users?q=bob&page=34>; rel="last"' } })
  t.is(result.next, 'https://api.github.com/search/users?q=bob&page=2')
  t.is(result.last, 'https://api.github.com/search/users?q=bob&page=34')
})

test('links, no next', t => {
  const result = fn.links()
  t.false(result && result.next)
})

test('wait', t => {
  const result = fn.wait({
    headers: {
      'x-ratelimit-reset': Date.now() / 1000 + 60,
      'x-ratelimit-remaining': 1
    }
  })
  t.is(Math.round(result / 1000), 60)
})

test('wait, default', t => {
  const result = fn.wait()
  t.is(result, 2000)
})

// FIXME: need a github token (secret...) to actually test this part
test.skip('rate limit with token', async t => {
  const result = await fn.rateLimit('fefifo')
  t.is(result.headers.statusCode, 200)
  t.is(result.rate.limit, 5000)
})

test('rate limit, bad token', async t => await t.throws(fn.rateLimit('fefifo'), 'Response code 401 (Unauthorized)'))
