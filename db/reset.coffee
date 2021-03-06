mongodb = require('mongodb')
ServiceProvider = require('../modules/ServiceProvider').ServiceProvider
fs = require('fs')

files = fs.readdirSync('tasks/fixture')
count = 0

serviceProvider = new ServiceProvider 'localhost', 27017, ->
  for filename in files
    do (filename) ->
      fs.readFile "tasks/fixture/#{filename}", 'utf8', (err,data) ->
        if (err)
          console.log(err)

        serviceProvider.save JSON.parse(data), (item) ->
          console.log('save to mongodb:'+item._id)
          count++
          serviceProvider.close() if count == files.length

