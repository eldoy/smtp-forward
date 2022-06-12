const assert = require('assert')
const mxmail = require('mxmail')
const fport = require('fport')
const forwarder = require('../../index.js')

const host = '127.0.0.1'

async function setup(port, onMail) {
  await fport.kill(port)
  forwarder({ port, onMail })
  return mxmail({ host, port })
}

const email = {
  from: '"Fred Foo 👻" <foo@example.com>',
  to: 'bar@example.com',
  subject: 'Hello ✔',
  text: 'Are you ready?',
  html: '<b>Are you ready?</b>'
}

const it = {}

it['should deliver an email'] = async function() {
  const message = await new Promise(async function(resolve) {
    const mailer = await setup(33330, async function(mail) {
      resolve(mail)
    })
    const result = await mailer(email)
    assert.equal(result.delivered.length, 1)
  })
  assert.ok(message.messageId)
}

module.exports = it
