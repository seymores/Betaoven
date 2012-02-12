const db = require('../db')
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



var Model
  = module.exports
  = db.model('User', User);