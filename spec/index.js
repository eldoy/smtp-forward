const test = require('spekky')

const { sleep } = require('extras')

async function run() {
  // ... start a server or do some setup
  await sleep(1)

  // Start timer
  console.time('Test run')

  await test('smtp')

  // End timer
  console.timeEnd('Test run')
}
run()