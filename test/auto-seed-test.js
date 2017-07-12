var assert = require('chai').assert
var app = require('../server')
var request = require('request')

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

  describe('GET api/meals/reset', function() {
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

    it('should reset food index', function(done) {
      var tester = this
      tester.request.get('/api/meals/reset', function(error, response) {
        tester.request.get('/api/foods', function(error, response){
          if (error) { done(error) }
          var parsedFoods = JSON.parse(response.body)
          assert.equal(parsedFoods.length, 3)
          done()
        })
      })
    })

    it('should reset meals foods', function(done){
      var tester = this
      tester.request.get('/api/meals/reset', function(error, response) {
        tester.request.get('/api/meals/1', function(error, response){
          if (error) { done(error) }
          var parsedFoods = JSON.parse(response.body)
          assert.equal(parsedFoods.length, 3)
          done()
        })
      })
    })

  })


})
