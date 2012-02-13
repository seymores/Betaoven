const db = require('../db')
    , plugins = require('./plugins')
    , Schema = require('mongoose').Schema
    , ObjectId = Schema.ObjectId
    ;


var Vote = new Schema({
    by: {
        type: ObjectId
      , ref: 'User'
      , required: true
    }
  , build: {
        type: ObjectId
      , ref: 'Build'
      , required: true
    }
  , point: {
        type: Number
      , required: true
      , default: 0
      , min: -1
      , max: 1
    }
});


/**
 * Plugins
 */

Vote.plugin(plugins.timestamp)


var Model
  = module.exports
  = db.model('Vote', Vote);