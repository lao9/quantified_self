var express = require('express')
var app = express()
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Quantified Self'

app.get('/api/foods', function(request, response) {
  database.raw('SELECT * FROM foods').then(function(data){
    response.json(data.rows)
  })

})

app.listen(app.get('port'), function() {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})

module.exports = app
