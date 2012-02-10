const goose = require('mongoose')
    , config = require('./config/db')

var db
  = module.exports
  = goose.connect(config.host, config.db, config.port);