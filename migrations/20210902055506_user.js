
exports.up = async knex => {
  await knex.schema.createTable('user', user => {
      user.increments()
      user.string('username')
      user.string('password_hash')
  })
};

exports.down = function(knex) {
  await knex.schema.dropTableIfExists('user')
};
