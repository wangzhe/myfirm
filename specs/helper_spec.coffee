Calculator = require('../app/helper')
should = require('should')

describe 'Calculator', ->

  it 'can add two positive numbers', ->
    cal = new Calculator "haha"

    result = cal.min_function(3, 2)
    result.should.be.eql(1)