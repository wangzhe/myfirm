#request = require 'request'

describe 'Calculator2', ->

  it 'can add two positive numbers', ->
    request "http://localhost:3000/status", (error, response, body) ->
      expect(body).toEqual("hello world")
