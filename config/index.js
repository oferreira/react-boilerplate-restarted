// Config files
const envConfig = Object.assign({},
  require(`./${process.env.NODE_ENV || 'dev'}.json`),
  require('./default.json')
)

module.exports = envConfig
