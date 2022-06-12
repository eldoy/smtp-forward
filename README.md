# SMTP Forward

Receive and forward emails to web service.

### Install

```
npm i smtp-forward
```

### Usage

```js
const forward = require('smtp-forward')

forward({ port: 2525, onMail: async function(mail) {
  // Forward to web service or something else
  console.log(mail)
}})

// With automatic upload to S3
const upload = {
  key: AMAZON_KEY,
  secret: AMAZON_SECRET,
  bucket: AMAZON_BUCKET
}

forward({ port: 2525, upload, onMail: async function(mail) {
  console.log(mail)
}})
```

### Schema

The mail object looks like this:
```js
{
  messageId: '<6ce8663b-0c3d-0e72-8135-d4cd1af96747@example.com>',
  to: 'bar@example.com',
  from: 'Fred Foo 👻 <foo@example.com>',
  subject: 'Hello ✔',
  text: 'Are you ready?',
  html: '<b>Are you ready?</b>',
  headers: {
    'content-type': 'Content-Type: multipart/alternative;\r\n' +
      ' boundary="--_NmP-1d24f3de9d13035d-Part_1"',
    from: 'From: =?UTF-8?Q?Fred_Foo_=F0=9F=91=BB?= <foo@example.com>',
    to: 'To: bar@example.com',
    subject: 'Subject: =?UTF-8?Q?Hello_=E2=9C=94?=',
    'message-id': 'Message-ID: <6ce8663b-0c3d-0e72-8135-d4cd1af96747@example.com>',
    date: 'Date: Sun, 12 Jun 2022 13:46:16 +0000',
    'mime-version': 'MIME-Version: 1.0'
  },
  // undefined or string of space separated messageIds
  references: undefined,
  // undefined or string as messageId
  inReplyTo: undefined,
  // Array of attachments, see below for spec
  attachments: []
}
```

The attachment object looks like this:
```js
{
  name: 'url-to-file.jpg',
  // If you use uploads
  url: 'https://example.com/url-to-file.jpg',
  // Path on your computer
  path: '/tmp/url-to-file.jpg',
  type: 'image/jpg',
  size: 12345
}
```

MIT Licensed. Enjoy!
