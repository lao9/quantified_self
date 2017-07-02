const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

function createFood(name, calories) {
  return database.raw('INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)', [name, calories, new Date])
}

function emptyFoodsTable() {
  return database.raw('TRUNCATE foods RESTART IDENTITY')
}

function findAllFoods() {
  return database.raw('SELECT * FROM foods')
}

function findById(id) {
  return database.raw('SELECT * FROM foods WHERE id=?', [id])
}

function updateFood(id, name, calories) {
  return database.raw('UPDATE foods SET name=?, calories=? WHERE id=?', [name, calories, id])
}

module.exports = {
  createFood: createFood,
  emptyFoodsTable: emptyFoodsTable,
  findAllFoods: findAllFoods,
  findById: findById,
  updateFood: updateFood
}
