var assert = require('chai').assert
var app = require('../server')
var request = require('request')
var pry = require('pryjs')
var bodyParser = require('body-parser')
var Food = require('../lib/models/food')
var Meal = require('../lib/models/meal')
var FoodMeal = require('../lib/models/foodMeal')

describe('Meal Endpoints', function(){
  before(function(done){
    this.port = 9876
    this.server = app.listen(this.port, function(err, result){
      if(err){return done(err)}
      done()
    })
    this.request = request.defaults({
      baseUrl: 'http://localhost:9876'
    })
  })

  after(function() {
    this.server.close()
  })

  describe('GET api/meals/:id', function() {
    this.timeout(1000000000)
    beforeEach(function(done) {
      Food.createFood('Banana', 105)
        .then(function() {
          Food.createFood('French Silk Pie', 340)
            .then(function() {
              Food.createFood('Taco', 200)
                .then(function() {
                  Food.createFood('Pizza', 890)
                    .then(function() {
                      Meal.createMeal('Breakfast')
                        .then(function() {
                          Meal.createMeal('Lunch')
                            .then(function() {
                              FoodMeal.createFm(1, 1)
                                .then(function() {
                                  FoodMeal.createFm(2, 1)
                                    .then(function() {
                                      FoodMeal.createFm(3, 2)
                                        .then(function() {
                                          FoodMeal.createFm(4, 2)
                                            .then(function() {
                                              done()
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })

    afterEach(function(done) {
      Food.emptyFoodsTable()
        .then(function() {
          Meal.emptyMealsTable()
            .then(function() {
              FoodMeal.emptyFoodMealsTable()
                .then(function() {
                  done()
                })
            })
        })
    })

    it('should return a list of a meals foods', function(done) {
      this.request.get('api/meals/1', function(error, response) {
        if (error) {
          done(error)
        }

        var parsedFoods = JSON.parse(response.body)

        assert.equal(parsedFoods.length, 2)

        var food1 = parsedFoods[0]
        var food2 = parsedFoods[1]

        assert.hasAllKeys(food1, ['id', 'name', 'calories', 'created_at', 'status', 'food_id', 'meal_id'])
        assert.hasAllKeys(food2, ['id', 'name', 'calories', 'created_at', 'status', 'food_id', 'meal_id'])

        assert.equal(food1.id, 1)
        assert.equal(food1.name, 'Banana')
        assert.equal(food1.calories, 105)
        assert.equal(food2.id, 2)
        assert.equal(food2.name, 'French Silk Pie')
        assert.equal(food2.calories, 340)

        done()
      })
    })

    it('should return 404 if resource is not found', function(done){
      this.request.get('api/meals/3', function(error, response){
        if(error){ done(error) }

        var food = JSON.parse(response.body)

        assert.equal(response.statusCode, 404)
        assert.hasAllKeys(food, ['error'])

        done()
      })
    })
  })

  describe('POST api/food_meals', function() {
    this.timeout(1000000000)
    beforeEach(function(done) {
      Food.createFood('Banana', 105)
        .then(function() {
          Food.createFood('French Silk Pie', 340)
            .then(function() {
              Meal.createMeal('Breakfast')
                .then(function() {
                  FoodMeal.createFm(1, 1)
                    .then(function() {
                      done()
                    })
                })
            })
        })
    })

    afterEach(function(done) {
      Food.emptyFoodsTable()
        .then(function() {
          Meal.emptyMealsTable()
            .then(function() {
              FoodMeal.emptyFoodMealsTable()
                .then(function() {
                  done()
                })
            })
        })
    })

    it('should add food to a meal', function(done) {

      foodMeal = {
        foodId: 2,
        mealId: 1
      }

      this.request.post('api/food_meals', {form: foodMeal}, function(error, response) {

        if (error) {
          done(error)
        }

        var parsedFoods = JSON.parse(response.body)

        assert.equal(parsedFoods.length, 2)

        var food1 = parsedFoods[0]
        var food2 = parsedFoods[1]

        assert.hasAllKeys(food1, ['id', 'name', 'calories', 'created_at', 'status', 'food_id', 'meal_id'])
        assert.hasAllKeys(food2, ['id', 'name', 'calories', 'created_at', 'status', 'food_id', 'meal_id'])

        assert.equal(food1.id, 1)
        assert.equal(food1.name, 'Banana')
        assert.equal(food1.calories, 105)
        assert.equal(food2.id, 2)
        assert.equal(food2.name, 'French Silk Pie')
        assert.equal(food2.calories, 340)

        done()
      })
    })

    it('should send 422 when foodId is invalid', function(done) {

      foodMeal = {
        foodId: 3,
        mealId: 1
      }

      this.request.post('api/food_meals', {form: foodMeal}, function(error, response) {
        if (error) { done(error) }

        var parsedFoods = JSON.parse(response.body)

        Meal.findAllFoods(1).then(function(data){
          assert.equal(data.rows.length, 1)
        })

        assert.equal(response.statusCode, 422)
        done()
      })
    })

    it('should send 422 when mealId is invalid', function(done) {

      foodMeal = {
        foodId: 2,
        mealId: 2
      }

      this.request.post('api/food_meals', {form: foodMeal}, function(error, response) {
        if (error) { done(error) }

        var parsedFoods = JSON.parse(response.body)

        Meal.findAllMeals().then(function(data){
            assert.equal(data.rows.length, 1)
            assert.equal(data.rows[0].id, 1)
            assert.equal(data.rows[0].name, "Breakfast")
        })

        Meal.findAllFoods(2).then(function(data){
          assert.equal(data.rows.length, 0)
        })

        assert.equal(response.statusCode, 422)
        done()
      })
    })
  })

  describe('DELETE api/food_meals/:id', function() {
      this.timeout(1000000000)
      beforeEach(function(done) {
        Food.createFood('Banana', 105)
        .then(function() {
          Food.createFood('French Silk Pie', 340)
          .then(function() {
            Food.createFood('Taco', 200)
            .then(function(){
              Food.createFood('Pizza', 890)
              .then(function(){
                Meal.createMeal('Breakfast')
                .then(function(){
                  Meal.createMeal('Lunch')
                  .then(function(){
                    FoodMeal.createFm(1, 1)
                    .then(function(){
                      FoodMeal.createFm(2, 1)
                      .then(function(){
                        FoodMeal.createFm(3, 2)
                        .then(function(){
                          FoodMeal.createFm(4, 2)
                          .then(function() { done() })
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        })
      })

      afterEach(function(done) {
        Food.emptyFoodsTable()
        .then(function() {
          Meal.emptyMealsTable()
          .then(function() {
            FoodMeal.emptyFoodMealsTable()
            .then(function() { done() })
          })
        })
      })

      it('should delete a food meal', function(done) {
        this.request.delete('api/food_meals/1', function(error, response) {
          if(error) { done(error) }
          var parsedFms = JSON.parse(response.body)
          var foodMeal = parsedFms[0]

          assert.equal(parsedFms.length, 1)
          assert.equal(foodMeal.name, 'French Silk Pie')
          assert.equal(foodMeal.calories, 340)
          done()
        })
      })

      it('should not delete an unknown food meal', function(done) {
        this.request.delete('api/food_meals/3', function(error, response) {
          if(error) { done(error) }

          var parsedFms = JSON.parse(response.body)
          var foodMeal1 = parsedFms[0]
          var foodMeal2 = parsedFms[1]

          assert.equal(parsedFms.length, 2)
          assert.equal(foodMeal1.name, "Banana")
          assert.equal(foodMeal1.calories, 105)
          assert.equal(foodMeal2.name, 'French Silk Pie')
          assert.equal(foodMeal2.calories, 340)
          done()
        })
      })
    })

})
