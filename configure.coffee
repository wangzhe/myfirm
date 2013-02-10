path = require('path')

rootPath = (file) ->
  root = path.normalize __dirname
  root = root + '/' + file


global.rootPath = rootPath
