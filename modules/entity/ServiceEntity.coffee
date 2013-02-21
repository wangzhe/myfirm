class ServiceEntity

  constructor: (@items) ->

  to_json: ->
    ":type": "application/vnd.myfirm.services+json"
    ":uid": "service-fdsaifewnivewwveq-001"
    "items": @items

exports = module.exports = ServiceEntity