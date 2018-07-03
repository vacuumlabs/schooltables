const express = require('express')
const crypto = require('crypto')
const _ = require('lodash')

const router = express.Router()
const db = require('./db')

const tokens = []

router.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Token, X-Requested-With, Content-Type, Accept'
    )
    res.send(200)
  } else {
    next()
  }
})

router.use((req, res, next) => {
  if (req.path !== '/login' && tokens.indexOf(req.header('X-Token')) === -1) {
    return res.sendStatus(401)
  }
  return next()
})

router.get('/check', (req, res) => {
  res.sendStatus(200)
})

router.post('/login', (req, res) => {
  if (
    req.body.name === process.env.ADMIN_NAME &&
    req.body.password === process.env.ADMIN_PASSWORD
  ) {
    const token = crypto.randomBytes(20).toString('hex')
    tokens.push(token)
    res.json({token})
  } else {
    res.sendStatus(401)
  }
})

router.post('/create', async (req, res) => {
  const test = await db('surveys')
    .insert({
      created_at: new Date().toISOString(),
      data: JSON.stringify(req.body),
    })
    .returning('id')
  res.json({id: test[0]})
})

router.get('/surveys', async (req, res, next) => {
  res.json(await db('surveys'))
})

const getResults = (results, definition) => {
  const data = []
  const {tables} = definition.data

  // when only header is present return single table as standard and be done
  if (tables.length === 1) {
    return [
      {
        type: 'standard',
        header: tables[0].side,
        data: results.map((r) => r.data[0].data),
      },
    ]
  }

  // assert only non-header left
  for (let i = 1; i < tables.length; i++) {
    data.push({
      type: 'standard',
      header: tables[0].side.concat(tables[i].header),
      data: _.flatten(
        results.map((r) =>
          r.data[i].data.map((row, j) =>
            r.data[0].data.concat(
              tables[i].type === 'rectangular' ? [r.data[i].side[j], ...row] : row
            )
          )
        )
      ),
    })
  }
  return data
}

router.get('/results/:id', async (req, res, next) => {
  const results = await db('results')
    .select('*')
    .where('survey_id', req.params.id)
  const definition = await db('surveys')
    .select('*')
    .where('id', req.params.id)
    .first()
  if (!definition) res.sendStatus(404)
  console.log(results, definition)
  res.json({
    id: req.params.id,
    title: definition.data.title,
    note: definition.data.note,
    tables: getResults(results, definition),
  })
})

router.get('/csv/:id', async (req, res, next) => {
  const results = await db('results')
    .select('*')
    .where('survey_id', req.params.id)
  const definition = await db('surveys')
    .select('*')
    .where('id', req.params.id)
    .first()
  if (!definition) res.sendStatus(404)
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/csv')

  const {header, data, rectHeaders, rects} = getResults(results, definition)
  const joinedData = data.map((row) => row.join(',')).join('\n')
  const result = [header.join(','), joinedData].join('\n')
  // TODO RECTS
  res.write(result)
  res.end()
})

module.exports = router
