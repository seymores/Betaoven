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
  , username: {
      type: String
    , trim: true
    // TODO: Make username as required
    , default: ''
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

    if (this.isNew || this.isModified('password'))
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

User
  .statics
  .auth = function(data, next) {
    var password = Model.hashPassword(data.password)
      , q = Model.findOne();

    q.where('email', data.email)
    q.where('password', password)

    next && q.exec(next)

    return q;
  }

User
  .statics
  .findByEmail = function(email, next) {
    var q = Model.findOne({ email: email });

    next && q.exec(next)

    return q;
  }

/**
 * Plugins
 */

User.plugin(plugins.timestamp)


var Model
  = module.exports
  = db.model('User', User);