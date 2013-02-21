express = require 'express'
mongodb = require 'mongodb'
ServiceEntity = require '../modules/entity/ServiceEntity'
ItemProvider = require('../modules/ItemProvider').ItemProvider
app = express()

app.get '/status', status = (req, res)  ->
  res.send('health check...ok')

app.get '/v1/services', service = (req, res) ->
  serviceEntity = new ServiceEntity(req)
  res.send(serviceEntity.to_json())

#config
app.set 'port', 3000

exports = module.exports = app


#req.body = { a: 1 }
#itemProvider = new ItemProvider('localhost', 27017)
#console.log('done')
#itemProvider.save(req.body, (item) ->
#  console.log('save to mongodb:'+item._id))