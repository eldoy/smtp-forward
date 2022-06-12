const { simpleParser } = require('mailparser')
const mailutil = require('mailutil')

// Get addresses
function getAddresses(field) {
  return field.value.map(v => v.name ? `${v.name} <${v.address}>` : v.address).join(',')
}

// Get headers
function getHeaders(lines) {
  const headers = {}
  for (const value of lines) {
    headers[value.key] = value.line
  }
  return headers
}

// Construct message
function construct(mail) {
  return {
    messageId: mail.messageId || mailutil.id(mail.from),
    to: getAddresses(mail.to),
    from: getAddresses(mail.from),
    subject: mail.subject,
    text: mail.text,
    html: mail.html || mail.textAsHtml,
    headers: getHeaders(mail.headerLines),
    messageId: mail.messageId,
    references: mail.references,
    inReplyTo: mail.inReplyTo,
    attachments: mail.attachments
  }
}

// Receive mail
async function receive(stream) {
  const chunks = []
  for await (let chunk of stream) {
    chunks.push(chunk)
  }
  const buffer = Buffer.concat(chunks)
  const mail = await simpleParser(buffer)
  if (Array.isArray(mail.references)) {
    mail.references = mail.references.join(' ')
  }
  return mail
}

module.exports = { receive, construct }