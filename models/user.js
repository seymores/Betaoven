const db = require('../db')
    , plugins = require('./plugins')
    , Schema = require('mongoose').Schema
    , ObjectId = Schema.ObjectId
    ;


var User = new Schema({
    email: {
      type: String
    , required: true
    , trim: true
    }
  , display_name: {
      type: String
    , required: true
    , trim: true
  }
});


/**
 * Plugins
 */

User.plugin(plugins.timestamp)


var Model
  = module.exports
  = db.model('User', User);