exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE food_meals RESTART IDENTITY')
  .then(function() {
    return Promise.all([
      knex.raw(
        'INSERT INTO food_meals (food_id, meal_id, created_at) VALUES (?, ?, ?)',
        [1, 1, new Date]
      ),
      knex.raw(
        'INSERT INTO food_meals (food_id, meal_id, created_at) VALUES (?, ?, ?)',
        [2, 1, new Date]
      ),
      knex.raw(
        'INSERT INTO food_meals (food_id, meal_id, created_at) VALUES (?, ?, ?)',
        [3, 1, new Date]
      ),
      knex.raw(
        'INSERT INTO food_meals (food_id, meal_id, created_at) VALUES (?, ?, ?)',
        [1, 2, new Date]
      ),
      knex.raw(
        'INSERT INTO food_meals (food_id, meal_id, created_at) VALUES (?, ?, ?)',
        [2, 2, new Date]
      ),
      knex.raw(
        'INSERT INTO food_meals (food_id, meal_id, created_at) VALUES (?, ?, ?)',
        [3, 2, new Date]
      ),
      knex.raw(
        'INSERT INTO food_meals (food_id, meal_id, created_at) VALUES (?, ?, ?)',
        [1, 3, new Date]
      ),
      knex.raw(
        'INSERT INTO food_meals (food_id, meal_id, created_at) VALUES (?, ?, ?)',
        [2, 3, new Date]
      ),
      knex.raw(
        'INSERT INTO food_meals (food_id, meal_id, created_at) VALUES (?, ?, ?)',
        [3, 3, new Date]
      ),
      knex.raw(
        'INSERT INTO food_meals (food_id, meal_id, created_at) VALUES (?, ?, ?)',
        [1, 4, new Date]
      ),
      knex.raw(
        'INSERT INTO food_meals (food_id, meal_id, created_at) VALUES (?, ?, ?)',
        [2, 4, new Date]
      ),
      knex.raw(
        'INSERT INTO food_meals (food_id, meal_id, created_at) VALUES (?, ?, ?)',
        [3, 4, new Date]
      )
    ]);
  });
};
