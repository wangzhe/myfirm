express = require('express')
mongodb = require('mongodb')
ItemProvider = require('../modules/ItemProvider').ItemProvider
app = express()

app.get '/status', status = (req, res)  ->
  res.send('hello world')

app.get '/service', service = (req, res) ->
  req.body = { a: 1 }
  itemProvider = new ItemProvider('localhost', 27017)
  console.log('done')
  itemProvider.save(req.body, (item) ->
    console.log('save to mongodb:'+item._id))
  res.send('hello world')

#config
app.set 'port', 3000

exports = module.exports = app