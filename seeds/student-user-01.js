
exports.seed = async knex =>{
  // await knex('student').del()
  await knex('user').del()
    
      // Inserts seed entries
  await knex('student').insert([
        {id: 1, name:'Sanjeev', age: 33},
        {id: 2, name:'Anju', age: 30},
        {id: 3, name:'Anil', age: 27},
      ]);
    ;
  await knex('user').insert([
        {id: 1, username:'Sanjeev Yogi', password_hash: 'colorado'}
      ]);
};
