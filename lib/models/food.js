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
  return database.raw('SELECT * FROM foods WHERE status=? ORDER BY id', ['active'])
}

function inactivateById(id) {
  return database.raw('UPDATE foods SET status=? WHERE id=?', ['inactive', id])
}

function find(id) {
  return database.raw('SELECT * FROM foods WHERE id = ?', [id])
}

function updateFood(id, name, calories) {
  return database.raw('UPDATE foods SET name=?, calories=? WHERE id=?', [name, calories, id])
}

function seedFoodsTable() {
  return database.raw(
      `INSERT INTO foods (name, calories, created_at)
       VALUES (?, ?, ?),
              (?, ?, ?),
              (?, ?, ?)`,
      ['Orange', 90, new Date,
       'Banana', 105, new Date,
       'Garden Salsa Sunchips', 300, new Date
      ]
    )
}

module.exports = {
  createFood: createFood,
  emptyFoodsTable: emptyFoodsTable,
  findAllFoods: findAllFoods,
  inactivateById: inactivateById,
  find: find,
  updateFood: updateFood,
  seedFoodsTable: seedFoodsTable
}
