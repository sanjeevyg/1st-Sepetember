
exports.seed = async knex => {
  // Deletes ALL existing entries
  await knex('student').del()
    
      // Inserts seed entries
  await knex('student').insert([
        {id: 1, name:'Sanjeev', age: '33'},
        {id: 2, name:'Anju', age: '30'},
        {id: 3, name:'Anil', age: '27'},
      ]);
    ;
};
