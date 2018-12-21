const express = require('express')
const router = express.Router()
const db = require('./db')
const _ = require('lodash')

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

router.get('/survey/:id', async (req, res, next) => {
  const dbData = await db('surveys')
    .select('*')
    .where('id', req.params.id)
    .first()
  res.json({id: dbData.id, created_at: dbData.created_at, locked: dbData.locked, ...dbData.data})
})

router.post('/submit/:id', async (req, res, next) => {
  const {locked} = await db('surveys')
    .select('locked')
    .where('id', req.params.id)
    .first()
  if (locked) {
    res.sendStatus(403)
    return
  }
  const test = await db('results')
    .insert({
      created_at: new Date().toISOString(),
      survey_id: req.params.id,
      data: JSON.stringify(req.body),
    })
    .returning('id')
  res.sendStatus(200)
})

module.exports = router
