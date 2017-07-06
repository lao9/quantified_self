var express = require('express')
var app = express()
var Food = require('./lib/models/food')
var pry = require('pryjs')
var bodyParser = require('body-parser')
var Meal = require('./lib/models/meal')
var FoodMeal = require('./lib/models/foodMeal')
var FoodController = require('./lib/controllers/foodController')
var MealController = require('./lib/controllers/mealController')
var FoodMealController = require('./lib/controllers/foodMealController')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Quantified Self'

app.get('/api/foods', function(request, response) {
  FoodController.index(request, response)
})

app.get('/api/foods/:id', function(request, response) {
  FoodController.show(request, response)
})

app.post('/api/foods', function(request, response) {
  FoodController.create(request, response)
})

app.delete('/api/foods/:id', function(request, response) {
  FoodController.deleteFood(request, response)
})

app.put('/api/foods/:id', function(request, response) {
  FoodController.update(request, response)
})

app.get('/api/meals/:id', function(request, response){
  MealController.show(request, response)
})

app.post('/api/food_meals', function(request, response){
  FoodMealController.create(request, response)
})

app.delete('/api/food_meals/:id', function(request, response) {
  FoodMealController.deleteFoodMeal(request, response)
})

app.listen(app.get('port'), function() {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})

module.exports = app
