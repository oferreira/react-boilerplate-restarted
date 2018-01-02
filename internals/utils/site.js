const { argv } = require('yargs')

const site = {
  // This refers to the react-boilerplate version this project is based on.
  SITE_NAME: argv.site || 'default',

}

module.exports = site
