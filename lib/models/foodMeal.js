const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);
const Food = require('./food')

function createFm(foodId, mealId) {
  return database.raw('INSERT INTO food_meals (food_id, meal_id, created_at) VALUES (?, ?, ?)', [foodId, mealId, new Date])
}

function emptyFoodMealsTable() {
  return database.raw('TRUNCATE food_meals RESTART IDENTITY')
}

function findAllFoodMeals() {
  return database.raw('SELECT * FROM food_meals')
}

function findMeal(id) {
  return database.raw('SELECT meal_id FROM food_meals WHERE id = ?', [id])
}

function deleteById(id) {
  return database.raw('DELETE FROM food_meals WHERE id = ?', [id])
}

function seedFoodMealsTable(){
  return database.raw(
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
}

module.exports = {
  createFm: createFm,
  emptyFoodMealsTable: emptyFoodMealsTable,
  findAllFoodMeals: findAllFoodMeals,
  findMeal: findMeal,
  deleteById: deleteById,
  seedFoodMealsTable: seedFoodMealsTable
}
