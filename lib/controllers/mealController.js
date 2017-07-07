var Meal = require('../models/meal')
var FoodMeal = require('../models/foodMeal')
var pry = require('pryjs')

function show (request, response) {
  var id = request.params.id

  Meal.findAllFoods(id).then(function(data){
    response.json(data.rows)
  })
}

module.exports = {
  show: show
}
