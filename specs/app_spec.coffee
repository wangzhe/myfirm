request = require('supertest')
app = require(rootPath('app/app'))

describe 'server status', ->
  it 'should be supported via health check page', (done) ->
    request(app)
      .get('/status')
      .expect("health check...ok", done)


describe 'service information', ->
  it 'should be retrieved by service version 1 request', (done) ->
    request(app)
      .get('/v1/services')
      .expect("2", done)