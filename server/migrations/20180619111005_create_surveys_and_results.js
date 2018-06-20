exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('surveys', (table) => {
      table
        .increments('id')
        .primary()
        .unsigned()
      table.datetime('created_at')
      table.json('data')
    }),
    knex.schema.createTable('results', (table) => {
      table
        .increments('id')
        .primary()
        .unsigned()
      table.integer('survey_id').unsigned()
      table.datetime('created_at')
      table.json('data')
    }),
  ])
}

exports.down = function(knex, Promise) {
  return Promise.resolve()
}
