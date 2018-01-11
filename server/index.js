/* eslint consistent-return:0 */

const express = require('express')
const logger = require('./logger')

const argv = require('./argv')
const port = require('./port')
const setup = require('./middlewares/frontendMiddleware')
const isDev = process.env.NODE_ENV !== 'production'
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false
const { resolve } = require('path')
const fs = require('fs')
const app = express()

const config = require('../config/')

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi)

app.use('/config.js', (req, res) => res.status(200).send(`window.config = eval(${JSON.stringify(config)})`))
app.use('*/api/node/*', (req, res) => res.status(200).send(JSON.parse(fs.readFileSync(resolve(__dirname, './mock/683f604e365b7de2a6816f234d969227.json'), 'utf8'))))
app.use('*/api/menu/*', (req, res) => res.status(200).send(JSON.parse(fs.readFileSync(resolve(__dirname, './mock/298d53551662b9ec1e79a334fd46d1a7.json'), 'utf8'))))
app.use('*/api/languages', (req, res) => res.status(200).send(JSON.parse(fs.readFileSync(resolve(__dirname, './mock/1cc80e5b193e6f303846e8cf21b824ff.json'), 'utf8'))))
app.use('*/api/v2/languages', (req, res) => res.status(200).send(JSON.parse(fs.readFileSync(resolve(__dirname, './mock/6ec81ad1093b4fda2105b0f0dbe2f3e3.json'), 'utf8'))))
app.use('*/api/translations', (req, res) => res.status(200).send(JSON.parse(fs.readFileSync(resolve(__dirname, './mock/a5fa09e80d8a445ab7a6a7d966a6ce9d.json'), 'utf8'))))

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
})

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST
const host = customHost || null // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost'

// Start your app.
app.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message)
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr)
      }

      logger.appStarted(port, prettyHost, url)
    })
  } else {
    logger.appStarted(port, prettyHost)
  }
})
