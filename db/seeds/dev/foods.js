exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE foods RESTART IDENTITY')
  .then(function() {
    return Promise.all([
      knex.raw(
        'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
        ['Orange', 90, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
        ['Banana', 105, new Date]
      ),
      knex.raw(
        'INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)',
        ['Garden Salsa Sunchips', 300, new Date]
      )
    ]);
  });
};
