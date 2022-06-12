const { SMTPServer } = require('smtp-server')

const account = require('./lib/account.js')
const attachment = require('./lib/attachment.js')
const message = require('./lib/message.js')
const upload = require('./lib/upload.js')

module.exports = function(opt = {}) {
  const port = opt.port || 2525
  const aws = upload.configure(opt.upload)

  async function onData(stream, session, callback) {
    const mail = await message.receive(stream)
    const accounts = account.extract(mail)
    if (!accounts.length) {
      return callback(new Error('no accounts found'))
    }

    const attachments = attachment.store(mail)

    // Upload attachments
    if (aws && attachments.length) {
      await aws.upload(attachments, { timestamp: true })
    }

    // Construct message and send to server
    if (typeof opt.onMail == 'function') {
      opt.onMail(message.construct(mail))
    }
    return callback()
  }

  const disabledCommands = ['AUTH', 'STARTTLS']
  const server = new SMTPServer({ disabledCommands, onData })
  server.on('error', err => {
    console.log('Error %s', err.message)
  })

  console.log('Server listening on port %d', port)
  server.listen(port)
}
