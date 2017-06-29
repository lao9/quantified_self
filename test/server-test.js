var assert = require('chai').assert
var app = require('../server')
var request = require('request')
var pry = require('pryjs')
var bodyParser = require('body-parser')

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

describe('Server', function(){
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

  it('should exist', function(){
    assert(app)
  })

  describe('GET /api/foods', function() {
    this.timeout(1000000)
    beforeEach(function(done) {
      database.raw('INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)', ["Banana", 105, new Date])
      .then(function() {
        database.raw('INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)', ["French Silk Pie", 340, new Date])
        .then(function(){
          done()
        })
      });
    })

    afterEach(function(done) {
      database.raw('TRUNCATE foods RESTART IDENTITY').then(function() {
        done()
      })
    })

    it('should have two food items from the resource', function(done) {
      var ourRequest = this.request
      database.raw('SELECT * FROM foods').then(function(data) {
        var food_1 = data.rows[0]
        var food_2 = data.rows[1]

        ourRequest.get('/api/foods', function(error, response) {
          if (error) { done(error) }

          var parsedFoods = JSON.parse(response.body)
          var food1 = parsedFoods[0]
          var food2 = parsedFoods[1]

          assert.equal(parsedFoods.length, 2)
          assert.equal(food1.id, food_1.id)
          assert.equal(food1.name, food_1.name)
          assert.equal(food1.calories, food_1.calories)
          assert.equal(food2.id, food_2.id)
          assert.equal(food2.name, food_2.name)
          assert.equal(food2.calories, food_2.calories)

          done()
        })
      })
    })
  })
})
