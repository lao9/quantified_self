var MealRouter = require('express').Router()
var MealController = require('../controllers/mealController')

MealRouter.get('/reset', function(request, response){
  MealController.reset(request, response)
})

MealRouter.get('/:id', function(request, response){
  MealController.show(request, response)
})


module.exports = MealRouter
