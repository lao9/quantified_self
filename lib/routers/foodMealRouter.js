var FoodMealRouter = require('express').Router()
var FoodMealController = require('../controllers/foodMealController')

FoodMealRouter.post('/', function(request, response){
  FoodMealController.create(request, response)
})

FoodMealRouter.delete('/:id', function(request, response) {
  FoodMealController.deleteFoodMeal(request, response)
})

module.exports = FoodMealRouter
