// Get email addresses
function getEmails(field) {
  return field.value.map(v => v.address)
}

// Extract accounts
function extract(mail) {
  let accounts = getEmails(mail.to)
  if (mail.cc) {
    accounts = accounts.concat(getEmails(mail.cc))
  }
  if (mail.bcc) {
    accounts = accounts.concat(getEmails(mail.bcc))
  }
  return accounts
}

module.exports = { extract }