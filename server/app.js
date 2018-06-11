require('ignore-styles')
const bodyParser = require('body-parser')
const compression = require('compression')
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const fs = require('fs')

require('babel-register')({
  ignore: /\/(build|node_modules)\//,
  presets: ['env', 'react-app'],
})

// routes
const api = require('./api')

const app = express()

// Support Gzip
app.use(compression())

// Support post requests with body data (doesn't support multipart, use multer)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// Setup logger
app.use(morgan('combined'))

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')))

app.use('/api', api)

app.use('*', (req, res) => {
  const filePath = path.resolve(__dirname, '..', 'build', 'index.html')

  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('read err', err)
      return res.status(404).end()
    }
    res.send(htmlData)
  })
})

module.exports = app
