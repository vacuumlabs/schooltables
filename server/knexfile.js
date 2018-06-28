module.exports = {
  client: 'pg',
  connection: `${process.env.DATABASE_URL}?ssl=true` || {
    host: 'localhost',
    user: 'schooltables',
    password: 'dev',
    database: 'schooltables',
  },
}
