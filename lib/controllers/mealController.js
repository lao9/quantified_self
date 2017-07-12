var Meal = require('../models/meal')
var FoodMeal = require('../models/foodMeal')
var Food = require('../models/food')

function show (request, response) {
  var id = request.params.id

  Meal.find(id).then(function(data){
    if(data.rowCount == 0) {
      return response.status(404).send({ error: 'Invalid id, try again.'})
    }
    else {
      Meal.findAllFoods(id).then(function(data){
        response.json(data.rows)
      })
    }
  })

}

function reset (request, response) {
  Food.emptyFoodsTable()
    .then(function() {
      Meal.emptyMealsTable()
        .then(function() {
          FoodMeal.emptyFoodMealsTable()
            .then(function() {
              Food.seedFoodsTable()
              .then(function() {
                Meal.seedMealsTable()
                .then(function(){
                  FoodMeal.seedFoodMealsTable()
                  .then(function(){
                    return response.status(200).send({message: 'Database reset.'})
                  })
                })
              })
            })
        })
    })
}

module.exports = {
  show: show,
  reset: reset
}
