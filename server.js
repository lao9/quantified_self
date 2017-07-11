var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var FoodRouter = require('./lib/routers/foodRouter')
var MealRouter = require('./lib/routers/mealRouter')
var FoodMealRouter = require('./lib/routers/foodMealRouter')
const cors = require('cors');

app.use(cors({origin: '*'}))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Quantified Self'

app.use('/api/foods', FoodRouter)
app.use('/api/meals', MealRouter)
app.use('/api/food_meals', FoodMealRouter)

app.listen(app.get('port'), function() {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})

module.exports = app
