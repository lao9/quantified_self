var express = require('express')
var app = express()
var Food = require('./lib/models/food')

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Quantified Self'

app.get('/api/foods', function(request, response) {
  Food.findAllFoods().then(function(data){
    response.json(data.rows)
  })

})

app.listen(app.get('port'), function() {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})

module.exports = app
