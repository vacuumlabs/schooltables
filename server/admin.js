const express = require('express')
const passport = require('passport')
const Strategy = require('passport-local').Strategy
const router = express.Router()
const db = require('./db')

passport.use(
  new Strategy((username, password, cb) => {
    cb(null, username === process.env.ADMIN_NAME && password === process.env.ADMIN_PASS)
  })
)

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
// passport.serializeUser(function(user, cb) {
//   cb(null, '');
// });

// passport.deserializeUser(function(id, cb) {
//   cb
//   db.users.findById(id, function (err, user) {
//     if (err) { return cb(err); }
//     cb(null, user);
//   });
// });

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

router.use(passport.initialize())
router.use(passport.session())

router.post('/login', passport.authenticate('local', {failureRedirect: '/login'}), (req, res) => {
  res.redirect('/surveys')
})

router.get('/surveys', require('connect-ensure-login').ensureLoggedIn(), async (req, res, next) => {
  await db.raw('SELECT 1')
  res.json({id: req.params.id})
})

// TODO results and create
router.get(
  '/results/:id',
  require('connect-ensure-login').ensureLoggedIn(),
  async (req, res, next) => {
    await db.raw('SELECT 1')
    res.json({id: req.params.id})
  }
)

module.exports = router
