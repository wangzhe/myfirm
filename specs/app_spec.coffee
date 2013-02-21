request = require('supertest')
fs = require('fs')
app = require(rootPath('app/app'))

describe 'server status', ->
  it 'should be supported via health check page', (done) ->
    request(app)
      .get('/status')
      .expect("health check...ok", done)


describe 'service information', ->
  it 'should be retrieved by service version 1 request', (done) ->
    fs.readFile "specs/fixture/service_sample.json", 'utf8', (err,data) ->
      console.log(err) if err

      request(app)
        .get('/v1/services')
        .expect(JSON.parse(data), done)
