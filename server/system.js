const config = require('../package.json')

const getStatus = (req) => ({
  hostname: req.headers['X-Forwarded-Host'] || req.hostname,
  protocol: req.headers['X-Forwarded-Proto'] || req.protocol,
  userAgent: req.headers['user-agent'],
  serverName: process.env.COMPUTERNAME || process.env.HOST || process.env.HOSTNAME,
  serverTime: new Date(),
  name: config.name,
  version: config.version,
  environment: process.env.NODE_ENV,
  remoteIpAddress: req.headers['True-Client-IP'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress,
})

const getDiagnostics = (req) => ({
  headers: req.headers,
})

module.exports = {
  getStatus,
  getDiagnostics,
}
