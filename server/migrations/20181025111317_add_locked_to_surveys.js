exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('surveys', (table) => {
      table.boolean('locked').defaultTo(false)
    }),
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('surveys', (table) => {
      table.dropColumn('locked')
    }),
  ])
}
