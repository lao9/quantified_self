var Food = require('../models/food')
var pry = require('pryjs')

function index(request, response){
  Food.findAllFoods().then(function(data){
    response.json(data.rows)
  })
}

function show(request, response){
  var id = request.params.id

  Food.find(id).then(function(data){
    if(data.rowCount == 0) {
      return response.status(404).send({ error: 'Invalid id, try again.'})
    }
    response.json(data.rows[0])
  })
}

function create(request, response){
  var name = request.body.name
  var calories = +request.body.calories

  if(!name || !calories) {
    return response.status(422).send({ error: 'Missing properties, try again.'})
  }
  Food.createFood(name, calories).then(function() {
    Food.findAllFoods().then(function(data){
      response.json(data.rows)
    })
  })
}

function deleteFood(request, response) {
  var id = request.params.id

  Food.inactivateById(id).then(function(){
    Food.findAllFoods().then(function(data){
      response.json(data.rows)
    })
  })
}

function update(request, response) {
  var id = request.params.id
  var name = request.body.name
  var calories = request.body.calories

  if(!name || !calories) {
    return response.status(422).send({error: 'Missing properties for update, try again.'})
  }
  Food.updateFood(id, name, calories).then(function() {
    Food.findAllFoods().then(function(data){
      response.json(data.rows)
    })
  })
}

module.exports = {
  index: index,
  show: show,
  create: create,
  deleteFood: deleteFood,
  update: update
}
