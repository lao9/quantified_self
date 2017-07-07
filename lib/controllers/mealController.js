var Meal = require('../models/meal')
var FoodMeal = require('../models/foodMeal')


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

module.exports = {
  show: show
}
