http = require('http')
app = require('./app/app')

http.createServer(app).listen app.get('port'), ->
  console.log "MyFirm in Express server listening on port #{app.get('port')}"


