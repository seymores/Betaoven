const db = require('../db')
    , crypto = require('crypto')
    , plugins = require('./plugins')
    , Schema = require('mongoose').Schema
    , ObjectId = Schema.ObjectId
    , User = require('./user')
    ;


var Token = new Schema({
    token: { type: String }
  , email: { type: String }
});


Token
  .pre('save', function(next) {
    var token;

    if (this.isNew && this.email) {
      token = this.email + (+new Date())
      token = crypto.createHash('sha1')
        .update(token)
        .digest('hex')

      this.token = token;
    }

    next()
  })


Token
  .statics
  .findByToken = function(token, next) {
    var q = Model.findOne({ token: token });

    next && q.exec(next)

    return q
  }


/**
 * Plugins
 */

Token.plugin(plugins.timestamp)


var Model
  = module.exports
  = db.model('Token', Token);