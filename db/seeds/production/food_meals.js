exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE food_meals RESTART IDENTITY')
  .then(function() {
    return Promise.all([
      knex.raw(
        `INSERT INTO food_meals (food_id, meal_id, created_at)
        VALUES (?, ?, ?),
               (?, ?, ?),
               (?, ?, ?),
               (?, ?, ?),
               (?, ?, ?),
               (?, ?, ?),
               (?, ?, ?),
               (?, ?, ?),
               (?, ?, ?),
               (?, ?, ?),
               (?, ?, ?),
               (?, ?, ?)`,
        [1, 1, new Date,
         2, 1, new Date,
         3, 1, new Date,
         1, 2, new Date,
         2, 2, new Date,
         3, 2, new Date,
         1, 3, new Date,
         2, 3, new Date,
         3, 3, new Date,
         1, 4, new Date,
         2, 4, new Date,
         3, 4, new Date
       ])
    ]);
  });
};
