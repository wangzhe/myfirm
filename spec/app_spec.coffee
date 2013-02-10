request = require('supertest')
app = require(rootPath('app/app'))

describe 'server status', ->
  it 'should be supported via health check page', (done) ->
    request(app)
      .get('/status')
      .expect("hello world", done)


describe 'provider information', ->
  it 'should be retrieved by provider request', (done) ->
    request(app)
      .get('/me/provider')
      .expect("hello world", done)