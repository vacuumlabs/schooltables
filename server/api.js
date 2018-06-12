const express = require('express')
const router = express.Router()
const db = require('./db')

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

router.get('/resources/:id', async (req, res, next) => {
  await db.raw('SELECT 1')
  res.json({id: req.params.id})
})

module.exports = router
