exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE meals RESTART IDENTITY')
  .then(function() {
    return Promise.all([
      knex.raw(
        `INSERT INTO meals (name, created_at)
         VALUES (?, ?),
                (?, ?),
                (?, ?),
                (?, ?)`,
        ['Breakfast', new Date,
         'Lunch', new Date,
         'Dinner', new Date,
         'Snacks', new Date
        ]
      )
    ]);
  });
};
