module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL || {
    host: 'localhost',
    user: 'schooltables',
    password: 'dev',
    database: 'schooltables',
  },
}
