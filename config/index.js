
const yaml = require('./dev.yml')

module.exports = JSON.stringify(yaml, undefined, 4)
