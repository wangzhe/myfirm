Calculator = require('../app/helper')

describe 'Calculator', ->

  it 'can add two positive numbers', ->
    cal = new Calculator "haha"

    result = cal.min_function(3, 2)
    expect(result).toBe 1