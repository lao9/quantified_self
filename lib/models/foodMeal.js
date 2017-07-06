const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);
const Food = require('./food')
const pry = require('pryjs')

function createFm(foodId, mealId) {
  return database.raw('INSERT INTO food_meals (food_id, meal_id, created_at) VALUES (?, ?, ?)', [foodId, mealId, new Date])
}

function emptyFoodMealsTable() {
  return database.raw('TRUNCATE food_meals RESTART IDENTITY')
}

function findAllFoodMeals() {
  return database.raw('SELECT * FROM food_meals')
}

module.exports = {
  createFm: createFm,
  emptyFoodMealsTable: emptyFoodMealsTable,
  findAllFoodMeals: findAllFoodMeals
}
