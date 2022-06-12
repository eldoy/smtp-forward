const path = require('path')
const os = require('os')
const { cuid, mkdir, write } = require('extras')

// Store attachments
function store(mail) {
  const attachments = mail.attachments || []
  return attachments.map(attachment => {
    const { filename, content, contentType, size } = attachment
    const dir = path.join(os.tmpdir(), cuid())
    mkdir(dir)
    const filepath = path.join(dir, filename)
    write(filepath, content)
    return {
      name: filename,
      path: filepath,
      type: contentType,
      size
    }
  })
}

module.exports = { store }