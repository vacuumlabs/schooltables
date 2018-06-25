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
  const resultData = _.omit(dbData, 'data')
  console.log(dbData.data.tables)
  res.json({...resultData, ...dbData.data})
})

router.post('/submit/:id', async (req, res, next) => {
  console.log('write result')
  console.log(req.body)
  const test = await db('results')
    .insert({
      created_at: new Date().toISOString(),
      survey_id: req.params.id,
      data: JSON.stringify(req.body),
    })
    .returning('id')
  console.log('all good ?')
  res.json({id: test[0]})
})

module.exports = router
