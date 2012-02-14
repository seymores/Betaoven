const db = require('../db')
    , crypto = require('crypto')
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
  , password: {
      type: String
    , required: true
    , trim: true
  }
});


User
  .pre('save', function(next) {
    var password = this.password;

    this.set('password', Model.hashPassword(password))

    next()
  })


/**
 * Static methods
 */

User
  .statics
  .hashPassword = function(password) {
    var shasum;

    shasum = crypto.createHash('sha1')
    shasum.update(password)

    return shasum.digest('hex')
  }


/**
 * Plugins
 */

User.plugin(plugins.timestamp)


var Model
  = module.exports
  = db.model('User', User);