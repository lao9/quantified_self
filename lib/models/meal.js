const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

function createMeal(name) {
  return database.raw('INSERT INTO meals (name, created_at) VALUES (?, ?)', [name, new Date])
}

function emptyMealsTable() {
  return database.raw('TRUNCATE meals RESTART IDENTITY')
}

function findAllMeals() {
  return database.raw('SELECT * FROM meals')
}

function find(id) {
  return database.raw('SELECT * FROM meals WHERE id = ?', [id])
}

function findAllFoods(id) {
  return database.raw(`SELECT * FROM foods f
                       INNER JOIN food_meals fm
                       ON f.id = fm.food_id
                       WHERE meal_id = ?`, [id])
}

module.exports = {
  createMeal: createMeal,
  emptyMealsTable: emptyMealsTable,
  findAllMeals: findAllMeals,
  find: find,
  findAllFoods: findAllFoods,
}
