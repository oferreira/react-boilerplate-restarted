const { argv } = require('yargs')

const site = {
  // This refers to the react-boilerplate version this project is based on.
  SITE_NAME: argv.site || argv._[0] || 'default',

}

module.exports = site
