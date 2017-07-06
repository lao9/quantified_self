var Meal = require('../models/meal')
var FoodMeal = require('../models/foodMeal')
var pry = require('pryjs')

function create(request, response) {
  var foodId = +request.body.foodId
  var mealId = +request.body.mealId

  FoodMeal.createFm(foodId, mealId).then(function(){
    Meal.findAllFoods(mealId).then(function(data){
      response.json(data.rows)
    })
  })
}

function deleteFoodMeal(request, response) {
  var id = request.params.id
  FoodMeal.findMeal(id).then(function(result){
    var mealId = result.rows[0].meal_id
    FoodMeal.deleteById(id).then(function(){
      Meal.findAllFoods(mealId).then(function(data){
        response.json(data.rows)
      })
    })
  })
}

module.exports = {
  create: create,
  deleteFoodMeal: deleteFoodMeal
}
