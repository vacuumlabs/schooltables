import {createReactAppExpress, handleUniversalRender} from '@cra-express/core'
const path = require('path')

const React = require('react')

const {default: App} = require('../../src/App')
const clientBuildPath = path.resolve(__dirname, 'client')
const app = createReactAppExpress({
  clientBuildPath,
  universalRender: handleUniversalRender(<App />),
})

module.exports = app
