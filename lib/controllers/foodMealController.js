var Food = require('../models/food')
var Meal = require('../models/meal')
var FoodMeal = require('../models/foodMeal')


function create(request, response) {
  var foodId = +request.body.foodId
  var mealId = +request.body.mealId


  Food.find(foodId).then(function(data){
    if (data.rowCount == 0) {
      return response.status(422).send({ error: 'Invalid ids, try again.'})
    }
    else {
      Meal.find(mealId).then(function(data){
        if (data.rowCount == 0) {
          return response.status(422).send({ error: 'Invalid ids, try again.'})
        }
        else {
          FoodMeal.createFm(foodId, mealId).then(function(){
            Meal.findAllFoods(mealId).then(function(data){
              response.json(data.rows)
            })
          })
        }
      })
    }
  })
}

function deleteFoodMeal(request, response) {
  var id = request.params.id

  FoodMeal.findMeal(id).then(function(result){
    if (result.rowCount == 0) {
      return response.status(422).send({ error: 'Invalid id, try again.'})
    }
    else {
      var mealId = result.rows[0].meal_id
      FoodMeal.deleteById(id).then(function(){
        Meal.findAllFoods(mealId).then(function(data){
          response.json(data.rows)
        })
      })
    }
  })
}

module.exports = {
  create: create,
  deleteFoodMeal: deleteFoodMeal
}
