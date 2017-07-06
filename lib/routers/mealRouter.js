var MealRouter = require('express').Router()
var MealController = require('../controllers/mealController')

MealRouter.get('/:id', function(request, response){
  MealController.show(request, response)
})

module.exports = MealRouter
