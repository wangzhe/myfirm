express = require 'express'
mongodb = require 'mongodb'
ServiceEntity = require '../modules/entity/ServiceEntity'
ServiceProvider = require('../modules/ServiceProvider').ServiceProvider
app = express()

status = (req, res)  ->
  res.send('health check...ok')

app.get '/', status

app.get '/status', status

app.get '/v1/services', service = (req, res) ->
  serviceProvider = new ServiceProvider 'localhost', 27017, ->
    serviceProvider.find {}, (services) ->
      console.log service for service in services
      items = [];
      for service in services
        delete service._id
        items.push service
      serviceEntity = new ServiceEntity(items)
      res.send(serviceEntity.to_json())

#config
app.set 'port', 3000

exports = module.exports = app


#req.body = { a: 1 }
#itemProvider = new ItemProvider('localhost', 27017)
#console.log('done')
#itemProvider.save(req.body, (item) ->
#  console.log('save to mongodb:'+item._id))