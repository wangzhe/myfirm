Db = require('mongodb').Db
Connection = require('mongodb').Connection
Server = require('mongodb').Server
BSON = require('mongodb').BSON
ObjectID = require('mongodb').ObjectID

ServiceProvider = (host, port, callback) ->
  this.db = new Db 'myfirm', new Server(host, port, {auto_reconnect: true}, {}), {safe: true}
  this.db.open (err, db) ->
    unless err
      console.log('connect')
      callback()
    else
      console.log(err)

ServiceProvider::getCollection = (callback) ->
  this.db.collection 'service_provider', (error, collection) ->
    if (error)
      callback(error)
    else
      callback(null, collection)

ServiceProvider::save = (item, callback) ->
  this.getCollection (error, collection) ->
    if error
      callback(error)
    else
      collection.insert item, (err, result) ->
        callback(item)

ServiceProvider::find = (condition, callback) ->
  this.getCollection (error, collection) ->
    if error
      callback(error)
    else
      collection.find().sort({ _id: 1 }).toArray (err, services) ->
        callback services

ServiceProvider::close = ->
  this.db.close()

exports.ServiceProvider = ServiceProvider