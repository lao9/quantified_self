var express = require('express')
var app = express()
var Food = require('./lib/models/food')
var pry = require('pryjs')
var bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Quantified Self'

app.get('/api/foods', function(request, response) {
  Food.findAllFoods().then(function(data){
    response.json(data.rows)
  })
})

app.post('/api/foods', function(request, response) {
  var name = request.body.name
  var calories = +request.body.calories

  if(!name || !calories) {
    return response.status(422).send({ error: 'Missing properties, try again.'})
  }
  Food.createFood(name, calories).then(function() {
    Food.findAllFoods().then(function(data){
      response.json(data.rows)
    })
  })
})

app.listen(app.get('port'), function() {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})

module.exports = app
