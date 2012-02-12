const db = require('../db')
    , Schema = require('mongoose').Schema
    , ObjectId = Schema.ObjectId
    ;


var Feedback = new Schema({
    by: {
        type: ObjectId
      , ref: 'User'
      , required: true
    }
  , details: {
        type: String
      , required: true
      , trim: true
    }
});


var Model
  = module.exports
  = db.model('Feedback', Feedback);