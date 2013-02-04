express = require('express')
app = express()

app.get '/status', status = (req, res)  ->
  res.send('hello world')

#config
app.set 'port', 3000

exports = module.exports = app