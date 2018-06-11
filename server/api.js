const express = require('express')
const router = express.Router()
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

router.get('/resources/:id', (req, res, next) => {
  res.json({id: req.params.id})
})

module.exports = router
