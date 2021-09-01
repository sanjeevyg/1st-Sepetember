
exports.up = async knex => {
    await knex.schema.createTable('student', student => {
        student.increments()
        student.string('name')
        student.integer('age')
    })
  
};

exports.down = async knex => { 
    await knex.schema.dropTableIfExists('student')
};
