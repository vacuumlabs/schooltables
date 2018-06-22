const express = require('express')
const crypto = require('crypto')

const router = express.Router()
const db = require('./db')

const tokens = []

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Token, X-Requested-With, Content-Type, Accept'
  )
  next()
})

router.use((req, res, next) => {
  if (
    process.env.NODE_ENV !== 'development' &&
    req.path !== '/login' &&
    tokens.indexOf(req.header('X-Token')) === -1
  ) {
    return res.redirect('/login')
  }
  return next()
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
  console.log('got here?')
  const test = await db('surveys')
    .insert({
      created_at: new Date().toISOString(),
      data: JSON.stringify(req.body),
    })
    .returning('id')
  console.log('and here?')
  console.log(test[0])
  console.log(
    await db('surveys')
      .select('*')
      .where('id', test[0])
  )
  res.json({id: test[0]})
})

router.get('/surveys', async (req, res, next) => {
  res.json(await db('surveys'))
})

router.get('/results/:id', async (req, res, next) => {
  await db.raw('SELECT 1')
  res.json(
    await db('results')
      .select('*')
      .where('id', req.params.id)
  )
})

module.exports = router
