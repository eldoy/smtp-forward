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
  // Do something with mail
  console.log(mail)
}})
```

MIT Licensed. Enjoy!
