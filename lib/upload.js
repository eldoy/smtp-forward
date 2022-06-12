const dugg = require('dugg')

function configure(config) {
  if (!config) return
  return dugg(config)
}

module.exports = { configure }