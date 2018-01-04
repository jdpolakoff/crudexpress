console.log('hi')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://crudman:crud@ds237947.mlab.com:37947/crud9999', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, function() {
    console.log('listening on 3000')
  })
})

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))


app.get('/', function(req, res){
  db.collection('quotes').find().toArray(function(err, result){
    if (err) return console.log(err)
    res.render('./index.ejs', {quotes: result})
  })
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.get('/quotes', function(req, res){
  db.collection('quotes').find().toArray(function(err, result){
    if (err) return console.log(err)
    res.json(result)
  })
})
