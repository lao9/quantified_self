var assert = require('chai').assert
var app = require('../server')
var request = require('request')
var pry = require('pryjs')
var bodyParser = require('body-parser')
var Food = require('../lib/models/food')

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
      Food.createFood("Banana", 105)
      .then(function() {
        Food.createFood("French Silk Pie", 340).then(function() { done() })
      });
    })

    afterEach(function(done) {
      Food.emptyFoodsTable().then(function() {
        done()
      })
    })

    it('should have two food items from the resource', function(done) {
      this.request.get('/api/foods', function(error, response) {
        if (error) { done(error) }

        var parsedFoods = JSON.parse(response.body)
        var food1 = parsedFoods[0]
        var food2 = parsedFoods[1]

        assert.equal(parsedFoods.length, 2)
        assert.equal(food1.id, 1)
        assert.equal(food1.name, "Banana")
        assert.equal(food1.calories, 105)
        assert.equal(food2.id, 2)
        assert.equal(food2.name, "French Silk Pie")
        assert.equal(food2.calories, 340)

        done()
      })
    })
  })
})
